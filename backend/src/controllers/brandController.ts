import { Request, Response } from 'express';
import Brand from '../models/Brand';

export const getBrands = async (req: Request, res: Response) => {
  try {
    const brands = await Brand.find().sort({ order: 1 });
    res.json(brands);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createBrand = async (req: Request, res: Response) => {
  try {
    const newBrand = new Brand(req.body);
    const savedBrand = await newBrand.save();
    res.status(201).json(savedBrand);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateBrand = async (req: Request, res: Response) => {
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBrand);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBrand = async (req: Request, res: Response) => {
  try {
    await Brand.findByIdAndDelete(req.params.id);
    res.json({ message: 'Brand deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
