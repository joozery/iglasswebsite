import { Request, Response } from 'express';
import Service from '../models/Service';

export const getServices = async (req: Request, res: Response) => {
  try {
    const services = await Service.find().sort({ order: 1 });
    res.json(services);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createService = async (req: Request, res: Response) => {
  try {
    const newService = new Service(req.body);
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateService = async (req: Request, res: Response) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedService);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
