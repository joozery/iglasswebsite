import mongoose from 'mongoose';

const heroSlideSchema = new mongoose.Schema({
  src: { type: String, required: true },
  alt: { type: String, default: 'Hero Banner' },
  order: { type: Number, default: 0 }
}, {
  timestamps: true
});

export default mongoose.models.HeroSlide || mongoose.model('HeroSlide', heroSlideSchema);
