import mongoose from 'mongoose';

const promotionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  price: { type: String, required: true },
  originalPrice: { type: String },
  tag: { type: String },
  image: { type: String, required: true },
  isFeatured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, {
  timestamps: true
});

export default mongoose.models.Promotion || mongoose.model('Promotion', promotionSchema);
