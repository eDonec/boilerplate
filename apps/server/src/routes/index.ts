import { Router } from 'express';

import userRoutes from './userRoutes';

const router = Router();

router.use(userRoutes);

export default router;
