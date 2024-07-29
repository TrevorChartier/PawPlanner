import Joi from "joi";
import taskModels from "../models/task.js";
import petModels from "../models/pet.js";

//Ensure that specified pet_id corresponds to a pet in the database
//whenever it's used (import petModels or whatever it is)

async function createTask(req, res) {
  const { error } = validateTask(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  if (!(await validatePetID(req.body.pet_id, res))) return;
  const task = await taskModels.createTask(req.body);
  res.status(201).send(task);
}

async function getAllTasks(req, res) {
  const tasks = await taskModels.getTasks();
  res.send(tasks);
}

async function getTaskByID(req, res) {
  const task = await taskModels.getTaskByID(req.params.id);
  if (!task) return res.status(404).send("Task with specified ID not found");
  res.send(task);
}

async function getTasksByPetID(req, res) {
  const tasks = await taskModels.getTasksByPet(req.params.petID);
  if (!tasks)
    return res.status(404).send("Tasks with specified petID not found");
  res.send(tasks);
}

async function updateTask(req, res) {
  const { error } = validateTask(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  if (!(await validatePetID(req.body.pet_id, res))) return;
  const task = await taskModels.updateTask(req.params.id, req.body);
  if (!task) return res.status(404).send("Task with specified ID not found");
  res.send(task);
}

async function deleteTask(req, res) {
  const task = await taskModels.deleteTask(req.params.id);
  if (!task) return res.status(404).send("Task with specified ID not found");
  res.send(task);
}

function validateTask(task) {
  const schema = Joi.object({
    title: Joi.string().required(),
    due_date: Joi.string()
      .pattern(/^\d{4}-\d{2}-\d{2}$/)
      .required()
      .messages({
        "string.pattern.base": "Due date must be in the format YYYY-MM-DD",
        "string.empty": "Due date is required",
      }),
    pet_id: Joi.number().integer().required(),
  });
  return schema.validate(task);
}

async function validatePetID(pet_id, res) {
  const pet = await petModels.getPet(pet_id);
  if (!pet) {
    res.status(400).send("Supplied Pet ID not valid");
    return false;
  }
  return true;
}

export default {
  createTask,
  getAllTasks,
  getTaskByID,
  getTasksByPetID,
  updateTask,
  deleteTask,
};
