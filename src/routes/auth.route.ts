import { Router } from 'express';
import AuthController from '../controller/api/auth.controller';
import extractJWT from '../middleware/extractJWT';

const router = Router();
const authController:AuthController = new AuthController();

/** Set up your api routes here */

// Auth routes
router.post('/validate', extractJWT, authController.validateToken);
router.post('/login', authController.login);
router.post('/register', authController.register);

export default router;
