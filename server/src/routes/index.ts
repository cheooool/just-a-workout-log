import express, { Router } from 'express';
import authRoute from './auth';
import exerciseRoute from './exercise';
import routineRoute from './routine';
import setsRoute from './sets';

const router: Router = express.Router();

router.use('/auth', authRoute);
router.use('/exercises', exerciseRoute);
router.use('/routines', routineRoute);
router.use('/sets', setsRoute);

export default router;
