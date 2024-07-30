import express from 'express';
import taskController from '../controllers/task-controller.js';

const router = express.Router();

router.use(express.json());

router.post('/', taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskByID);
router.get('/pet/:petID', taskController.getTasksByPetID);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export default router;
