import express from 'express';
import { 
  createAppointment, 
  getAllAppointments, 
  updateAppointmentStatus, 
  deleteAppointment 
} from '../controllers/appointmentController';

const router = express.Router();

router.post('/', createAppointment);
router.get('/', getAllAppointments);
router.put('/:id/status', updateAppointmentStatus);
router.delete('/:id', deleteAppointment);

export default router;
