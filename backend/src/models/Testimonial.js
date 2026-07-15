import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  clientName: { type: String, required: true, trim: true, maxlength: 100 },
  profession: String,
  company: String,
  image: { url: String, publicId: String },
  rating: { type: Number, min: 1, max: 5, required: true },
  review: { type: String, required: true, maxlength: 1200 },
  featured: { type: Boolean, default: false, index: true },
  status: { type: String, enum: ['draft', 'published'], default: 'published' }
}, { timestamps: true });

export default mongoose.model('Testimonial', testimonialSchema, 'testimonials');
