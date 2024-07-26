const express = require("express");
const Joi = require("joi");

const router = express.Router();

router.use(express.json());

const pets = [
  { id: 1, name: "Miles" },
  { id: 2, name: "Meena" },
]; // This won't be needed once we use database, unless we should grab the info from database and store here? Probably not optimal solution though

router.get("/", (req, res) => {
  res.send(pets); // instead of sending array, pets = SELECT * from pets
});

router.get("/:id", (req, res) => {
  let pet = pets.find((c) => c.id === parseInt(req.params.id)); // instead of getting from array, SELECT from database

  if (!pet) return res.status(404).send("Pet with specified ID not found");

  res.send(pet);
});

router.post("/", (req, res) => {
  const { error } = validatePet(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const pet = {
    id: pets.length + 1,
    name: req.body.name,
  };

  pets.push(pet); // instead of add pet to array, add it to SQL database
  res.send(pet);
});

router.put("/:id", (req, res) => {
  const pet = pets.find((c) => c.id === parseInt(req.params.id));

  if (!pet)
    return res.status(404).send("The pet with the specified ID was not found");

  const { error } = validatePet(req.body);

  if (error) 
    return res.status(400).send(error.details[0].message);

  pet.name = req.body.name;
  res.send(pet);
});


function validatePet(pet) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(pet);
}

router.delete("/:id", (req,res) => {
  const pet = pets.find((c) => c.id === parseInt(req.params.id));

  if(!pet)
    return res.status(404).send("The pet with the specified ID was not found")

  index = pets.indexOf(pet);
  pets.splice(index,1);
  res.send(pet);
})

module.exports = router;
