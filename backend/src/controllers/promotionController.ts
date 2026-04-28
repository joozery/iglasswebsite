import { Request, Response } from 'express';
import Promotion from '../models/Promotion';

export const getPromotions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { activeOnly } = req.query;
    const query = activeOnly === 'true' ? { isActive: true } : {};
    const promotions = await Promotion.find(query).sort({ isFeatured: -1, order: 1, createdAt: -1 });
    res.status(200).json(promotions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching promotions', error });
  }
};

export const getPromotionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const promotion = await Promotion.findById(req.params.id);
    if (!promotion) {
      res.status(404).json({ message: 'Promotion not found' });
      return;
    }
    res.status(200).json(promotion);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching promotion', error });
  }
};

export const createPromotion = async (req: Request, res: Response): Promise<void> => {
  try {
    const promotion = new Promotion(req.body);
    const savedPromotion = await promotion.save();
    res.status(201).json(savedPromotion);
  } catch (error) {
    res.status(500).json({ message: 'Error creating promotion', error });
  }
};

export const updatePromotion = async (req: Request, res: Response): Promise<void> => {
  try {
    const promotion = await Promotion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!promotion) {
      res.status(404).json({ message: 'Promotion not found' });
      return;
    }
    res.status(200).json(promotion);
  } catch (error) {
    res.status(500).json({ message: 'Error updating promotion', error });
  }
};

export const deletePromotion = async (req: Request, res: Response): Promise<void> => {
  try {
    const promotion = await Promotion.findByIdAndDelete(req.params.id);
    if (!promotion) {
      res.status(404).json({ message: 'Promotion not found' });
      return;
    }
    res.status(200).json({ message: 'Promotion deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting promotion', error });
  }
};
