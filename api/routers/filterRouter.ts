/** @format */

import { Router } from 'express';
import filterController from '../controllers/filterController';
import authMiddleware from '../middleware/authMiddleware';

const filterRouter = Router();

filterRouter.post(
	'/filter',
	authMiddleware(['ADMIN', 'MAIN_ADMIN']),
	filterController.addFilter
);
filterRouter.put(
	'/filter',
	authMiddleware(['ADMIN', 'MAIN_ADMIN']),
	filterController.updateFilter
);
filterRouter.get(
	'/filter',
	filterController.getFilters
);

export default filterRouter;
