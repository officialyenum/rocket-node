import { Router } from 'express';
import UserController from '../controller/api/user.controller';
import IndexController from '../controller/api/index.controller';

import authRoutes from './auth.route';
import userRoutes from './user.route';

const router = Router();

/** Set up your api routes here */

// Health check
router.get('/', IndexController.index);
router.get('/ping', IndexController.health);

// Auth routes
router.use('/auth', authRoutes);
// User routes
router.use('/users', userRoutes);

export default router;
