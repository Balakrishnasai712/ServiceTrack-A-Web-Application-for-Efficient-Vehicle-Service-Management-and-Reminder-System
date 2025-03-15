import express from 'express';
import { 
    addVehicle, 
    getVehicles, 
    updateVehicle, 
    deleteVehicle 
} from '../controllers/vehicleController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, addVehicle);
router.get('/', protect, getVehicles);
router.put('/:id', protect, updateVehicle);
router.delete('/:id', protect, deleteVehicle);

export default router;
