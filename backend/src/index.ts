import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import adminRoutes from './routes/adminRoutes';
import articleRoutes from './routes/articleRoutes';
import uploadRoutes from './routes/uploadRoutes';
import serviceRoutes from './routes/serviceRoutes';
import brandRoutes from './routes/brandRoutes';
import galleryRoutes from './routes/galleryRoutes';
import heroRoutes from './routes/heroRoutes';
import appointmentRoutes from './routes/appointmentRoutes';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/admins', adminRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/appointments', appointmentRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('API is running for Iglass Backend...');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
