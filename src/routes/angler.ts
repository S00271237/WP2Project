import { Router } from 'express';
import { AnglerController } from '../controllers/anglers';
import { 
  createAnglerZSchema, 
  updateAnglerZSchema, 
  createSessionZSchema, 
  updateSessionZSchema, 
  catchZSchema, 
  updateCatchZSchema 
} from '../models/anglers';
import { validate } from '../middleware/validate.middleware';

const router = Router();
const anglerController = new AnglerController();

// Angler Profile Routes
router.get('/', anglerController.getAnglers);
router.post('/', validate(createAnglerZSchema), anglerController.createAngler);
router.get('/:id', anglerController.getAnglerById);
router.put('/:id', validate(updateAnglerZSchema), anglerController.updateAngler);
router.delete('/:id', anglerController.deleteAngler);

// Fishing Session Sub-Routes
router.post('/:anglerId/sessions', validate(createSessionZSchema), anglerController.addSessionToAngler);
router.put('/:anglerId/sessions/:sessionId', validate(updateSessionZSchema), anglerController.updateSessionInAngler);
router.delete('/:anglerId/sessions/:sessionId', anglerController.deleteSessionFromAngler);

// Fishing Catch Sub-Routes
router.post('/:anglerId/sessions/:sessionId/catches', validate(catchZSchema), anglerController.addCatchToSession);
router.put('/:anglerId/sessions/:sessionId/catches/:catchId', validate(updateCatchZSchema), anglerController.updateCatchInSession);
router.delete('/:anglerId/sessions/:sessionId/catches/:catchId', anglerController.deleteCatchFromSession);

export default router;