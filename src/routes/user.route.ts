import { Router } from 'express';
import { ValidateSchema, Schemas } from '../middleware/ValidateSchema';
import UserController from '../controller/api/user.controller';
import extractJWT from '../middleware/extractJWT';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

let userController:UserController = new UserController();
const router = Router();

/** Set up your api routes here */
// User routes
router.get('/', userController.all);
router.post('/', ValidateSchema(Schemas.user.create), userController.create);
router.patch('/:id', ValidateSchema(Schemas.user.update), userController.update);
router.get('/:id', userController.one);
router.delete('/:id', userController.delete);
router.post('/me', extractJWT, userController.me);

export default router;
