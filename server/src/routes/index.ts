import express, { Router } from 'express';
import authRoute from './auth';
import exerciseRoute from './exercise';
import routineRoute from './routine';

const router: Router = express.Router();

router.use(authRoute);
router.use(exerciseRoute);
router.use(routineRoute);

export default router;
