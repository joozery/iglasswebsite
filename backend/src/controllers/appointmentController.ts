import { Request, Response } from 'express';
import Appointment from '../models/Appointment';

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const newAppointment = new Appointment(req.body);
    const saved = await newAppointment.save();
    res.status(201).json(saved);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllAppointments = async (req: Request, res: Response) => {
  try {
    const list = await Appointment.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAppointmentStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await Appointment.findByIdAndUpdate(id, { status }, { new: true });
    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Appointment.findByIdAndDelete(id);
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
