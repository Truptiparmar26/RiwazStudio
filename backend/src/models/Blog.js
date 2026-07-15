import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({ url: String, publicId: String, alt: String }, { _id: false });

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 170 },
  slug: { type: String, required: true, unique: true, lowercase: true, index: true },
  featuredImage: imageSchema,
  category: { type: String, index: true },
  tags: [{ type: String, lowercase: true, trim: true }],
  excerpt: { type: String, maxlength: 500 },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  views: { type: Number, default: 0 },
  readingTime: { type: Number, default: 1 },
  status: { type: String, enum: ['draft', 'published'], default: 'draft', index: true },
  seoTitle: String,
  seoDescription: String,
  publishDate: Date
}, { timestamps: true });

blogSchema.index({ title: 'text', excerpt: 'text', content: 'text', category: 'text', tags: 'text' });

export default mongoose.model('Blog', blogSchema, 'blogs');
