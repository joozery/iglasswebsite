import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  order: { type: Number, default: 0 }
}, {
  timestamps: true
});

export default mongoose.models.Service || mongoose.model('Service', serviceSchema);
