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
  readTime: { type: Number, default: 1 },
  status: { type: String, enum: ['draft', 'published', 'active', 'inactive'], default: 'published', index: true },
  isPublished: { type: Boolean, default: true, index: true },
  isActive: { type: Boolean, default: true, index: true },
  seoTitle: String,
  seoDescription: String,
  publishDate: { type: Date, default: Date.now }
}, { timestamps: true });

blogSchema.pre('validate', function(next) {
  if (this.readTime !== undefined && !this.readingTime) this.readingTime = this.readTime;
  if (this.readingTime !== undefined && !this.readTime) this.readTime = this.readingTime;
  if (this.status === 'published' || this.status === 'active') {
    this.isPublished = true;
    this.isActive = true;
  }
  if (this.status === 'draft' || this.status === 'inactive') {
    this.isPublished = false;
    this.isActive = false;
  }
  if (this.isActive === true || this.isPublished === true) {
    if (this.status === 'draft' || !this.status) this.status = 'published';
    this.isPublished = true;
    this.isActive = true;
  }
  if (this.isActive === false || this.isPublished === false) {
    if (this.status === 'published' || !this.status) this.status = 'draft';
    this.isPublished = false;
    this.isActive = false;
  }
  if (!this.publishDate && (this.status === 'published' || this.isPublished)) {
    this.publishDate = new Date();
  }
  next();
});

blogSchema.index({ title: 'text', excerpt: 'text', content: 'text', category: 'text', tags: 'text' });

export default mongoose.model('Blog', blogSchema, 'blogs');
