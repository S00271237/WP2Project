import { Request, Response } from 'express';

import { AnglerService } from '../services/anglers';

import { createAnglerZSchema } from '../models/anglers';
import { Types } from 'mongoose';

const anglerService = new AnglerService();

export class AnglerController {
    getAnglers = async (req: Request, res: Response): Promise<void> => {

 /**
 * @openapi
 * /anglers:
 *   get:
 *     summary: Retrieve all anglers
 *     tags:
 *       - Anglers
 *     responses:
 *       200:
 *         description: Successfully retrieved anglers
 *       500:
 *         description: Internal server error
*/
try {
      const anglers = await anglerService.getAllAnglers();
      res.status(200).json(anglers);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving anglers', error });
        
}
}
getAnglerById = async (req: Request, res: Response): Promise<void> => {
    /**
 * @openapi
 * /anglers/{id}:
 *   get:
 *     summary: Retrieve a single angler by ID
 *     tags:
 *       - Anglers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the angler to retrieve
 *         example: 670a1f3c9d1e4b0012a1b002
 *     responses:
 *       200:
 *         description: Successfully retrieved the angler
 *       400:
 *         description: Invalid angler ID
 *       404:
 *         description: Angler not found
 *       500:
 *         description: Internal server error
 */
  try {
    const id = String(req.params.id);
    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Invalid angler ID' });
      return;
    }

    const angler = await anglerService.getAnglerById(id);
    if (!angler) {
      res.status(404).json({ message: 'Angler not found' });
      return;
    }

    res.status(200).json(angler);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving angler' });
  }
};
}