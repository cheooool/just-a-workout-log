import express, { Router } from 'express';
import {
  getWorkout,
  getWorkoutByDate,
  getWorkoutSetsByWorkoutDate,
} from '../controllers/workout';
import { isLoggedIn } from '../middlewares/isLoggedIn';

const router: Router = express.Router();

router.get('/', isLoggedIn, getWorkout);
router.get('/:workoutDate', isLoggedIn, getWorkoutByDate);
router.get('/:workoutDate/sets', isLoggedIn, getWorkoutSetsByWorkoutDate);

export default router;
