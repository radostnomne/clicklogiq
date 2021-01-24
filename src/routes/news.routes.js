import { Router } from 'express';

import * as newsController from '../controllers/news.controller.js';

const router = Router();

router.get('/', newsController.getNews);

export const newsRoutes = router;