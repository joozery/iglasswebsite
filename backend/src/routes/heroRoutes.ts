import express from 'express';
import { getHeroSlides, createHeroSlide, updateHeroSlide, deleteHeroSlide } from '../controllers/heroController';

const router = express.Router();

router.get('/', getHeroSlides);
router.post('/', createHeroSlide);
router.put('/:id', updateHeroSlide);
router.delete('/:id', deleteHeroSlide);

export default router;
