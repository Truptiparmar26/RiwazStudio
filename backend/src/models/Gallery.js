import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({ url: String, publicId: String }, { _id: false });

const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 140 },
  slug: { type: String, required: true, unique: true, lowercase: true, index: true },
  description: { type: String, maxlength: 1200 },
  category: { type: String, trim: true, index: true },
  image: imageSchema,
  featured: { type: Boolean, default: false, index: true },
  alt: String,
  tags: [{ type: String, lowercase: true, trim: true }],
  status: { type: String, enum: ['draft', 'published'], default: 'published', index: true },
  sortOrder: { type: Number, default: 0, index: true }
}, { timestamps: true });

gallerySchema.index({ title: 'text', description: 'text', category: 'text', tags: 'text' });

export default mongoose.model('Gallery', gallerySchema, 'gallery');
