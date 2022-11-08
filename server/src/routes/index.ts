import express, { Router } from 'express';
import authRoute from './auth';

const router: Router = express.Router();

router.use(authRoute);

export default router;
