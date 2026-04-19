import express from 'express';
import multer from 'multer';
import { uploadImage } from '../controllers/uploadController';

const router = express.Router();

// Memory storage to handle buffer for direct R2 upload
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

router.post('/', upload.single('image'), uploadImage);

export default router;
