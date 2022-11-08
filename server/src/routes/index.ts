import express, { Router } from 'express';
import authRoute from './auth';
import exerciseRoute from './exercise';

const router: Router = express.Router();

router.use(authRoute);
router.use(exerciseRoute);

export default router;
