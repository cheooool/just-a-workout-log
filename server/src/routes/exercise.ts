import express, { Router } from 'express';
import {
  getExercises,
  getExerciseById,
  deleteExercise,
  updateExercise,
  createExercise,
} from '../controllers/exercies';

const router: Router = express.Router();

router.get('/exercises', getExercises);
router.post('/exercises', createExercise);
router.get('/exercises/:id', getExerciseById);
router.put('/exercises/:id', updateExercise);
router.delete('/exercises/:id', deleteExercise);

export default router;
