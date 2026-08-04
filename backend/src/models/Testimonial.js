import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({ url: String, publicId: String }, { _id: false });

const testimonialSchema = new mongoose.Schema({
  clientName: { type: String, required: true, trim: true, maxlength: 100 },
  profession: String,
  designation: String,
  company: String,
  image: imageSchema,
  profileImage: imageSchema,
  rating: { type: Number, min: 1, max: 5, required: true, default: 5 },
  review: { type: String, maxlength: 1200 },
  message: { type: String, maxlength: 1200 },
  featured: { type: Boolean, default: false, index: true },
  order: { type: Number, default: 0, index: true },
  status: { type: String, enum: ['draft', 'published', 'active', 'inactive'], default: 'published', index: true },
  isActive: { type: Boolean, default: true, index: true }
}, { timestamps: true });

testimonialSchema.pre('validate', function(next) {
  if (!this.message && this.review) this.message = this.review;
  if (!this.review && this.message) this.review = this.message;
  if (!this.designation && this.profession) this.designation = this.profession;
  if (!this.profession && this.designation) this.profession = this.designation;
  if (!this.profileImage && this.image) this.profileImage = this.image;
  if (!this.image && this.profileImage) this.image = this.profileImage;
  if (this.status === 'published' || this.status === 'active') this.isActive = true;
  if (this.status === 'draft' || this.status === 'inactive') this.isActive = false;
  if (this.isActive === true && this.status === 'draft') this.status = 'published';
  if (this.isActive === false && (this.status === 'published' || !this.status)) this.status = 'draft';
  next();
});

export default mongoose.model('Testimonial', testimonialSchema, 'testimonials');
