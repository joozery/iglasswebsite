import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  service: { type: String, required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled', 'completed'], 
    default: 'pending' 
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Appointment', appointmentSchema);
