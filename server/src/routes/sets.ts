import express, { Router } from 'express';
import {
  getSets,
  createSets,
  deleteSetsById,
  getSetsById,
  updateSetsById,
} from '../controllers/sets';
import { isLoggedIn } from '../middlewares/isLoggedIn';

const router: Router = express.Router();

router.get('/', isLoggedIn, getSets);
router.post('/', isLoggedIn, createSets);
router.get('/:id', isLoggedIn, getSetsById);
router.post('/:id', isLoggedIn, updateSetsById);
router.delete('/:id', isLoggedIn, deleteSetsById);

export default router;
