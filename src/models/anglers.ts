import { Schema, model, Types } from 'mongoose';
import { z } from 'zod';

export interface ICatch {
  species: string;
  quantity: number;
  sizeCm?: number;
  bait?: string;
}

export interface ILocation {
  area: string;
  waterBody: string;
}

export interface ISession {
  location: ILocation;
  startTime: Date;
  endTime?: Date;
  catches: Types.DocumentArray<ICatch>;
}

export interface IAngler {
  user: Types.ObjectId;
  name: string;
  sessions: Types.DocumentArray<ISession>;
}

// Schemas for Mongoose
const catchSchema = new Schema<ICatch>({
  species: { type: String, required: true, trim: true },
  quantity: { type: Number, required: true, min: 1, default: 1 },
  sizeCm: { type: Number, min: 0 },
  bait: { type: String, trim: true },
});

const locationSchema = new Schema<ILocation>(
  {
    area: { type: String, required: true, trim: true },
    waterBody: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const sessionSchema = new Schema<ISession>({
  location: { type: locationSchema, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  catches: { type: [catchSchema], default: [] },
});

const anglerSchema = new Schema<IAngler>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 50 },
    sessions: { type: [sessionSchema], default: [] },
  },
  { timestamps: true }
);


// Zod schemas for validation
export const catchZSchema = z.object({
  species: z.string().trim().min(1),
  quantity: z.number().int().min(1).default(1),
  sizeCm: z.number().min(0).optional(),
  bait: z.string().trim().optional(),
});

export const locationZSchema = z.object({
  area: z.string().trim().min(1),
  waterBody: z.string().trim().min(1),
});

export const createAnglerZSchema = z.object({
  /**
 * @openapi
 * components:
 *   schemas:
 *     CreateAnglerInput:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: David
 */

  name: z.string().trim().min(2).max(50),
});

export const updateAnglerZSchema = z.object({
  name: z.string().trim().min(2).max(50).optional(),
});

const sessionBaseZSchema = z.object({
  location: locationZSchema,
  startTime: z.coerce.date(),
  endTime: z.coerce.date().optional(),
  catches: z.array(catchZSchema).default([]),
});

export const createSessionZSchema = z.object({
  location: locationZSchema,
  startTime: z.coerce.date(),
  endTime: z.coerce.date().optional(),
  catches: z.array(catchZSchema).default([]),
});

export const updateSessionZSchema = sessionBaseZSchema.partial();

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateSessionInput:
 *       type: object
 *       required:
 *         - location
 *         - startTime
 *       properties:
 *         location:
 *           type: object
 *           required: [area, waterBody]
 *           properties:
 *             area:
 *               type: string
 *               example: Lough Key
 *             waterBody:
 *               type: string
 *               example: Lake
 *         startTime:
 *           type: string
 *           format: date-time
 *         endTime:
 *           type: string
 *           format: date-time
 *         catches:
 *           type: array
 *           items:
 *             type: object
 *             required: [species]
 *             properties:
 *               species:
 *                 type: string
 *                 example: Pike
 *               quantity:
 *                 type: integer
 *                 example: 1
 *               sizeCm:
 *                 type: number
 *                 example: 68
 *               bait:
 *                 type: string
 *                 example: Spinner
 */

export const updateCatchZSchema = z.object({
  /**
   * @openapi
   * components:
   *   schemas:
   *     UpdateCatchInput:
   *       type: object
   *       properties:
   *         species:
   *           type: string
   *           example: Pike
   *         quantity:
   *           type: integer
   *           minimum: 1
   *           example: 1
   *         sizeCm:
   *           type: number
   *           minimum: 0
   *           example: 72
   *         bait:
   *           type: string
   *           example: Spinner
   */

  species: z.string().trim().min(1).optional(),
  quantity: z.number().int().min(1).optional(),
  sizeCm: z.number().min(0).optional(),
  bait: z.string().trim().optional(),
});

export const AnglerModel = model<IAngler>('Angler', anglerSchema);