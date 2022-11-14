import express, { Router } from 'express';
import {
  getExercises,
  getExerciseById,
  deleteExercise,
  updateExercise,
  createExercise,
  deleteExercises,
} from '../controllers/exercies';
import { isLoggedIn } from '../middlewares/isLoggedIn';

const router: Router = express.Router();

router.get('/', isLoggedIn, getExercises);
router.post('/', isLoggedIn, createExercise);
router.get('/:id', isLoggedIn, getExerciseById);
router.put('/:id', isLoggedIn, updateExercise);
router.delete('/:id', isLoggedIn, deleteExercise);
router.delete('/', isLoggedIn, deleteExercises);

export default router;
