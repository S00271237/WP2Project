import { Router } from 'express';
import { UserController } from '../controllers/users';
import { createUserZSchema, updateUserZSchema, updateUserRoleZSchema } from '../models/users';
import { validate } from '../middleware/validate.middleware';
import { authenticateKey } from '../middleware/auth.middleware';

const router = Router();
const userController = new UserController();

router.get('/', userController.getUsers);
router.post('/', validate(createUserZSchema), userController.createUser);
router.get('/:id', userController.getUserById);
router.put('/:id', validate(updateUserZSchema), userController.updateUser);
router.delete('/:id', authenticateKey, userController.deleteUser);
router.patch('/:id/role', validate(updateUserRoleZSchema), userController.updateUserRole);

export default router;