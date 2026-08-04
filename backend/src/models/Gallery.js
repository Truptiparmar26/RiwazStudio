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
  status: { type: String, enum: ['draft', 'published', 'active', 'inactive'], default: 'published', index: true },
  isActive: { type: Boolean, default: true, index: true },
  sortOrder: { type: Number, default: 0, index: true },
  order: { type: Number, default: 0, index: true }
}, { timestamps: true });

gallerySchema.pre('validate', function(next) {
  if (this.order !== undefined && !this.sortOrder) this.sortOrder = this.order;
  if (this.sortOrder !== undefined && !this.order) this.order = this.sortOrder;
  if (this.status === 'published' || this.status === 'active') this.isActive = true;
  if (this.status === 'draft' || this.status === 'inactive') this.isActive = false;
  if (this.isActive === true && this.status === 'draft') this.status = 'published';
  if (this.isActive === false && (this.status === 'published' || !this.status)) this.status = 'draft';
  next();
});

gallerySchema.index({ title: 'text', description: 'text', category: 'text', tags: 'text' });

export default mongoose.model('Gallery', gallerySchema, 'gallery');
