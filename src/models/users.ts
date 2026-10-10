import { Schema, model } from 'mongoose';
import { z } from 'zod';

export type UserRole = 'user' | 'admin';

export interface IUser {
  email: string;
  password: string;
  role: UserRole;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  { timestamps: true }
);

export const registerUserZSchema = z.object({
  /**
 * @openapi
 * components:
 *   schemas:
 *     RegisterUserInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: david@example.com
 *         password:
 *           type: string
 *           minLength: 8
 *           example: test1234
 */

  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8),
});

export const loginUserZSchema = z.object({
  /**
 * @openapi
 * components:
 *   schemas:
 *     LoginUserInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: david@example.com
 *         password:
 *           type: string
 *           example: test1234
 */

  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1),
});

export const updateUserZSchema = z.object({
  email: z.string().trim().toLowerCase().email().optional(),
  password: z.string().min(8).optional(),
});




export const updateUserRoleZSchema = z.object({
  role: z.enum(['user', 'admin']),
});

export const UserModel = model<IUser>('User', userSchema);