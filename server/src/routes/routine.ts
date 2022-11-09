import express, { Router } from 'express';
import {
  getRoutines,
  createRoutine,
  getRoutineById,
  updateRoutineById,
  deleteRoutineById,
} from '../controllers/routine';
import { isLoggedIn } from '../middlewares/isLoggedIn';
const router: Router = express.Router();

router.get('/', isLoggedIn, getRoutines);
router.post('/', isLoggedIn, createRoutine);
router.get('/:id', isLoggedIn, getRoutineById);
router.put('/:id', isLoggedIn, updateRoutineById);
router.delete('/:id', isLoggedIn, deleteRoutineById);

export default router;
