import express from 'express';
import { getAdmins, createAdmin, updateAdmin, deleteAdmin, loginAdmin, logoutAdmin } from '../controllers/adminController';

const router = express.Router();

router.get('/', getAdmins);
router.post('/', createAdmin);
router.post('/login', loginAdmin);
router.post('/logout/:id', logoutAdmin);
router.put('/:id', updateAdmin);
router.delete('/:id', deleteAdmin);

export default router;
