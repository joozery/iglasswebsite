import { Request, Response } from 'express';
import Article from '../models/Article';

export const getArticles = async (req: Request, res: Response) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getArticleById = async (req: Request, res: Response) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json(article);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createArticle = async (req: Request, res: Response) => {
  try {
    const newArticle = new Article(req.body);
    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateArticle = async (req: Request, res: Response) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedArticle);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteArticle = async (req: Request, res: Response) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: 'Article deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
