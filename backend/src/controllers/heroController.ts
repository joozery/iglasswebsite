import { Request, Response } from 'express';
import HeroSlide from '../models/HeroSlide';

export const getHeroSlides = async (req: Request, res: Response) => {
  try {
    const slides = await HeroSlide.find().sort({ order: 1 });
    res.json(slides);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createHeroSlide = async (req: Request, res: Response) => {
  try {
    const newSlide = new HeroSlide(req.body);
    const savedSlide = await newSlide.save();
    res.status(201).json(savedSlide);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateHeroSlide = async (req: Request, res: Response) => {
  try {
    const updatedSlide = await HeroSlide.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedSlide);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteHeroSlide = async (req: Request, res: Response) => {
  try {
    await HeroSlide.findByIdAndDelete(req.params.id);
    res.json({ message: 'Slide deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
