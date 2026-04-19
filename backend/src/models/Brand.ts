import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  order: { type: Number, default: 0 }
}, {
  timestamps: true
});

export default mongoose.models.Brand || mongoose.model('Brand', brandSchema);
