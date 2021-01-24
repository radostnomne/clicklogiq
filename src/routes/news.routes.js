import { Router } from 'express';

import * as newsController from '../controllers/news.controller.js';
import { validateQuery } from '../middlewares/validation.middleware.js';
import { SearchParamsSchema } from '../schemas/search-params.schema.js';

const router = Router();

router.get('/', validateQuery(SearchParamsSchema), newsController.getNews);

export const newsRoutes = router;