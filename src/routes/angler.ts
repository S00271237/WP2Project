import { Router } from 'express';
import { AnglerController } from '../controllers/anglers';
import { authenticateKey } from '../middleware/auth.middleware';
import {validate} from '../middleware/validate.middleware';
import {createCarZSchema}  from '../models/anglers';
import { updateCarZSchema } from '../models/anglers';


const router = Router();
const anglerController = new AnglerController();

router.get('/', anglerController.getAnglers);
router.post('/', validate(createCarZSchema), anglerController.createAngler);
router.get('/:id', anglerController.getAnglerById);
router.put('/:id', validate(updateCarZSchema), anglerController.updateAngler);
router.delete('/:id', authenticateKey, anglerController.deleteAngler);

export default router;
