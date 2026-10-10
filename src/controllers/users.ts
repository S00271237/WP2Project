import { Request, Response } from 'express';

import { Types } from 'mongoose';
import { UserService } from '../services/users';

const userService = new UserService();

export class UserController {
getUsers = async (req: Request,res: Response): Promise<void> => {
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
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    if ((error as { code?: number }).code === 11000) {
      res.status(409).json({ message: 'A user with this email already exists' });
      return;
    }
    console.error(error);
    res.status(500).json({ message: 'Error creating user' });
  }
}

deleteUser = async (req: Request, res: Response): Promise<void> => {
  /**
   * @openapi
   * /users/{id}:
   *   delete:
   *     summary: Delete a user by ID
   *     tags:
   *       - Users
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the user to delete
   *       - in: header
   *         name: x-api-key
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: User deleted
   *       400:
   *         description: Invalid user ID
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal server error
   */
  try {
    const id = String(req.params.id);
    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Invalid user ID' });
      return;
    }

    const deletedUser = await userService.deleteUser(id);
    if (!deletedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting user' });
  }
}

getUserById = async (req: Request, res: Response): Promise<void> => {
  /**
   * @openapi
   * /users/{id}:
   *   get:
   *     summary: Retrieve a user by ID
   *     tags:
   *       - Users
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the user to retrieve
   *     responses:
   *       200:
   *         description: Successfully retrieved the user
   *       400:
   *         description: Invalid user ID
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal server error
   */
  try {
    const id = String(req.params.id);
    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Invalid user ID' });
      return;
    }

    const user = await userService.getUserById(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving user' });
  }
}

updateUser = async (req: Request, res: Response): Promise<void> => {
  /**
   * @openapi
   * /users/{id}:
   *   put:
   *     summary: Update a user by ID
   *     tags:
   *       - Users
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the user to update
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateUserInput'
   *     responses:
   *       200:
   *         description: Successfully updated the user
   *       400:
   *         description: Invalid ID or validation failed
   *       404:
   *         description: User not found
   *       409:
   *         description: A user with this email already exists
   *       500:
   *         description: Internal server error
   */
  try {
    const id = String(req.params.id);
    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Invalid user ID' });
      return;
    }

    const updatedUser = await userService.updateUser(id, req.body);
    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    if ((error as { code?: number }).code === 11000) {
      res.status(409).json({ message: 'A user with this email already exists' });
      return;
    }
    console.error(error);
    res.status(500).json({ message: 'Error updating user' });
  }
}

updateUserRole = async (req: Request, res: Response): Promise<void> => {
  /**
   * @openapi
   * /users/{id}/role:
   *   put:
   *     summary: Update a user's role by ID
   *     tags:
   *       - Users
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the user whose role to update
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateUserRoleInput'
   *     responses:
   *       200:
   *         description: Successfully updated the user's role
   *       400:
   *         description: Invalid user ID
   *       404:
   *         description: User not found
   *       500:
   *         description: Internal server error
   */
  try {
    const id = String(req.params.id);
    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Invalid user ID' });
      return;
    }

    const updatedUser = await userService.updateUserRole(id, req.body);
    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user role' });
  }
}
}
