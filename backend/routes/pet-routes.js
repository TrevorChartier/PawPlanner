import express from 'express';
import petController from '../controllers/pet-controller.js';

const router = express.Router();

router.use(express.json());

router.post('/', petController.createPet);
router.get('/', petController.getAllPets);
router.get('/:id', petController.getPetByID);
router.put('/:id', petController.updatePet);
router.delete('/:id', petController.deletePet);

export default router;
