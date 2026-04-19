import express from 'express';
import { getGalleryItems, createGalleryItem, updateGalleryItem, deleteGalleryItem } from '../controllers/galleryController';

const router = express.Router();

router.get('/', getGalleryItems);
router.post('/', createGalleryItem);
router.put('/:id', updateGalleryItem);
router.delete('/:id', deleteGalleryItem);

export default router;
