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

router.get('/routines', isLoggedIn, getRoutines);
router.post('/routines', isLoggedIn, createRoutine);
router.get('/routines/:id', isLoggedIn, getRoutineById);
router.put('/routines/:id', isLoggedIn, updateRoutineById);
router.delete('/routines/:id', isLoggedIn, deleteRoutineById);

export default router;
