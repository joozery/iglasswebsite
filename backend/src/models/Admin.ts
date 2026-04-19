import mongoose, { Schema, Document } from 'mongoose';

export interface IAdmin extends Document {
  name: string;
  username: string;
  email: string;
  role: string;
  status: 'Active Now' | 'Away' | 'Offline';
  createdAt: Date;
}

const AdminSchema: Schema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  status: { type: String, default: 'Offline' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IAdmin>('Admin', AdminSchema);
