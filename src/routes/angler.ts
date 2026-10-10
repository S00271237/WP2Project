import { Router } from 'express';
import { AnglerController } from '../controllers/anglers';
import { createAnglerZSchema, updateAnglerZSchema } from '../models/anglers';
import { validate } from '../middleware/validate.middleware';

const router = Router();
const anglerController = new AnglerController();

router.get('/', anglerController.getAnglers);
router.post('/', validate(createAnglerZSchema), anglerController.createAngler);
router.get('/:id', anglerController.getAnglerById);
router.put('/:id', validate(updateAnglerZSchema), anglerController.updateAngler);
router.delete('/:id', anglerController.deleteAngler);

export default router;
