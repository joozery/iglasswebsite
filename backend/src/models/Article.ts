import mongoose, { Schema, Document } from 'mongoose';

export interface IArticle extends Document {
  title: string;
  content: string;
  image: string;
  category: string;
  author: string;
  
  // Advanced SEO & AI Optimization
  metaTitle?: string;
  metaDescription?: string;
  shortAnswer?: string;     // For AEO (Direct Answer)
  keyTakeaways?: string;    // For GEO (Generative engine summaries)
  faqData?: { question: string; answer: string }[]; // Structured data for AI
  
  createdAt: Date;
}

const ArticleSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String }, 
  category: { type: String, default: 'General' },
  author: { type: String, required: true },

  // SEO & AI Fields
  metaTitle: { type: String },
  metaDescription: { type: String },
  shortAnswer: { type: String },   // Optimize for AEO
  keyTakeaways: { type: String },  // Optimize for GEO/LLMs
  faqData: [{
     question: String,
     answer: String
  }],

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IArticle>('Article', ArticleSchema);
