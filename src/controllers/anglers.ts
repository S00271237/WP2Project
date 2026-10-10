import { Request, Response } from 'express';

import { AnglerService } from '../services/anglers';

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

createAngler = async (req: Request, res: Response): Promise<void> => {
/**
 * @openapi
 * /anglers:
 *   post:
 *     summary: Create an angler profile for the logged-in user
 *     tags:
 *       - Anglers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAnglerInput'
 *     responses:
 *       201:
 *         description: Successfully created the angler
 *       400:
 *         description: Invalid input data
 *       409:
 *         description: This user already has an angler profile
 *       500:
 *         description: Internal server error
 */
  try {
    const newAngler = await anglerService.createAngler({
      ...req.body,
      user: new Types.ObjectId(req.body.user),
    });
    res.status(201).json(newAngler);
  } catch (error) {
    if ((error as { code?: number }).code === 11000) {
      res.status(409).json({ message: 'This user already has an angler profile' });
      return;
    }
    console.error(error);
    res.status(500).json({ message: 'Error creating angler' });
  }
}

updateAngler = async (req: Request, res: Response): Promise<void> => {
  /**
 * @openapi
 * /anglers/{id}:
 *   put:
 *     summary: Update an angler profile by ID
 *     tags:
 *       - Anglers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the angler to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateAnglerInput'
 *     responses:
 *       200:
 *         description: Successfully updated the angler
 *       400:
 *         description: Invalid input data
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

    const updatedAngler = await anglerService.updateAngler(id, req.body);
    if (!updatedAngler) {
      res.status(404).json({ message: 'Angler not found' });
      return;
    }

    res.status(200).json(updatedAngler);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating angler' });
  }
}


deleteAngler = async (req: Request, res: Response): Promise<void> => {
  /**
 * @openapi
 * /anglers/{id}:
 *   delete:
 *     summary: Delete an angler profile by ID
 *     tags:
 *       - Anglers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the angler to delete
 *     responses:
 *       200:
 *         description: Successfully deleted the angler
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

    const deletedAngler = await anglerService.deleteAngler(id);
    if (!deletedAngler) {
      res.status(404).json({ message: 'Angler not found' });
      return;
    }

    res.status(200).json(deletedAngler);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting angler' });
  }
}

addSessionToAngler = async (req: Request, res: Response): Promise<void> => {
    /**
 * @openapi
 * /anglers/{anglerId}/sessions:
 *   post:
 *     summary: Add a new fishing session to an angler's profile
 *     tags:
 *       - Anglers
 *     parameters:
 *       - in: path
 *         name: anglerId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the angler to add a session to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSessionInput'
 *     responses:
 *       200:
 *         description: Successfully added the fishing session
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Angler not found
 *       500:
 *         description: Internal server error
 */

    try { const anglerId = String(req.params.anglerId);
    if (!Types.ObjectId.isValid(anglerId)) {
      res.status(400).json({ message: 'Invalid angler ID' });
      return;
    }

    const updatedAngler = await anglerService.addSessionToAngler(anglerId, req.body);
    if (!updatedAngler) {
      res.status(404).json({ message: 'Angler not found' });
      return;
    }

    res.status(200).json(updatedAngler);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding session to angler' });
  }
}
};