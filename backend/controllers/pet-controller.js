import Joi from "joi";
import petModels from "../models/pet.js";

async function getAllPets(req, res) {
  const pets = await petModels.getPets();
  res.send(pets);
}

async function getPetByID(req, res) {
  let pet = await petModels.getPet(req.params.id);
  if (!pet) return res.status(404).send("Pet with specified ID not found");
  res.send(pet);
}

async function createPet(req, res) {
  const { error } = validatePet(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const result = await petModels.createPet(req.body.name);
  res.status(201).send(result);
}

async function updatePet(req, res) {
  const pet = await petModels.updatePet(req.params.id, req.body);
  if (!pet)
    return res.status(404).send("The pet with the specified ID was not found");

  const { error } = validatePet(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  res.send(pet);
}

async function deletePet(req, res) {
  const pet = await petModels.deletePet(req.params.id);
  if (!pet)
    return res.status(404).send("The pet with the specified ID was not found");
  res.send(pet);
}

function validatePet(pet) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(pet);
}

export default { getAllPets, getPetByID, createPet, updatePet, deletePet};
