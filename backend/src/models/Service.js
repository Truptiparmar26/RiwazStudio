import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({ url: String, publicId: String, alt: String }, { _id: false });

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 140 },
  slug: { type: String, required: true, unique: true, lowercase: true, index: true },
  icon: String,
  bannerImage: imageSchema,
  description: { type: String, required: true, maxlength: 3000 },
  galleryImages: [imageSchema],
  features: [{ type: String, trim: true }],
  price: String,
  seoTitle: String,
  seoDescription: String,
  displayOrder: { type: Number, default: 0, index: true },
  status: { type: String, enum: ['draft', 'published'], default: 'published' }
}, { timestamps: true });

serviceSchema.index({ title: 'text', description: 'text', features: 'text' });

export default mongoose.model('Service', serviceSchema, 'services');
