import { Request, Response } from 'express';
import GalleryItem from '../models/GalleryItem';

export const getGalleryItems = async (req: Request, res: Response) => {
  try {
    const items = await GalleryItem.find().sort({ order: 1 });
    res.json(items);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createGalleryItem = async (req: Request, res: Response) => {
  try {
    const newItem = new GalleryItem(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateGalleryItem = async (req: Request, res: Response) => {
  try {
    const updatedItem = await GalleryItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteGalleryItem = async (req: Request, res: Response) => {
  try {
    await GalleryItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
