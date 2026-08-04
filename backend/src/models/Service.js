import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({ url: String, publicId: String, alt: String }, { _id: false });

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 140 },
  slug: { type: String, required: true, unique: true, lowercase: true, index: true },
  shortDescription: { type: String, maxlength: 500 },
  icon: String,
  image: imageSchema,
  bannerImage: imageSchema,
  description: { type: String, required: true, maxlength: 3000 },
  galleryImages: [imageSchema],
  features: [{ type: String, trim: true }],
  price: String,
  seoTitle: String,
  seoDescription: String,
  displayOrder: { type: Number, default: 0, index: true },
  order: { type: Number, default: 0, index: true },
  status: { type: String, enum: ['draft', 'published', 'active', 'inactive'], default: 'published', index: true },
  isActive: { type: Boolean, default: true, index: true }
}, { timestamps: true });

serviceSchema.pre('validate', function(next) {
  if (this.order !== undefined && !this.displayOrder) this.displayOrder = this.order;
  if (this.displayOrder !== undefined && !this.order) this.order = this.displayOrder;
  if (this.image && !this.bannerImage) this.bannerImage = this.image;
  if (this.bannerImage && !this.image) this.image = this.bannerImage;
  if (this.status === 'published' || this.status === 'active') this.isActive = true;
  if (this.status === 'draft' || this.status === 'inactive') this.isActive = false;
  if (this.isActive === true && this.status === 'draft') this.status = 'published';
  if (this.isActive === false && (this.status === 'published' || !this.status)) this.status = 'draft';
  next();
});

serviceSchema.index({ title: 'text', description: 'text', features: 'text' });

export default mongoose.model('Service', serviceSchema, 'services');
