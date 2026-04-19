import mongoose from 'mongoose';

const galleryItemSchema = new mongoose.Schema({
  src: { type: String, required: true },
  order: { type: Number, default: 0 }
}, {
  timestamps: true
});

export default mongoose.models.GalleryItem || mongoose.model('GalleryItem', galleryItemSchema);
