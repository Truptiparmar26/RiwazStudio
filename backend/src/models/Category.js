import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  type: { type: String, enum: ['gallery', 'blog', 'service'], default: 'gallery' },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  sortOrder: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Category', categorySchema, 'categories');
