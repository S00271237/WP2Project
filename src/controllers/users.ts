import { Request, Response } from 'express';

import { Types } from 'mongoose';
import { UserService } from '../services/users';
import { createUserZSchema } from '../models/users';

const userService = new UserService();

export class UserController {
getUsers = async (req: Request, res: Response): Promise<void> => {
  /**
   * @openapi
   * /users:
   *   get:
   *     summary: Retrieve all users
   *     tags:
   *       - Users
   *     responses:
   *       200:
   *         description: Successfully retrieved users
   *       500:
   *         description: Internal server error
   */
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving users' });
  }
}

createUser = async (req: Request, res: Response): Promise<void> => {
  /**
   * @openapi
   * /users:
   *   post:
   *     summary: Create a new user
   *     tags:
   *       - Users
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/RegisterUserInput'
   *     responses:
   *       201:
   *         description: Successfully created the user
   *       400:
   *         description: Validation failed
   *       409:
   *         description: A user with this email already exists
   *       500:
   *         description: Internal server error
   */
    const validation = createUserZSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({ message: 'Validation failed', errors: validation.error.issues });
      return;
    }
}
};