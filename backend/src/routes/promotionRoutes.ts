import express from 'express';
import { getPromotions, getPromotionById, createPromotion, updatePromotion, deletePromotion } from '../controllers/promotionController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getPromotions);
router.get('/:id', getPromotionById);
router.post('/', protect, createPromotion);
router.put('/:id', protect, updatePromotion);
router.delete('/:id', protect, deletePromotion);

export default router;
