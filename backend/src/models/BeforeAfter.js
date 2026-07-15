import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({ url: String, publicId: String }, { _id: false });

const beforeAfterSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 140 },
  originalImage: imageSchema,
  editedImage: imageSchema,
  description: { type: String, maxlength: 1200 },
  featured: { type: Boolean, default: false, index: true },
  status: { type: String, enum: ['draft', 'published'], default: 'published' }
}, { timestamps: true });

beforeAfterSchema.index({ title: 'text', description: 'text' });

export default mongoose.model('BeforeAfter', beforeAfterSchema, 'beforeafter');
