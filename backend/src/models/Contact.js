import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  phone: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  subject: { type: String, required: true, trim: true, maxlength: 180 },
  message: { type: String, required: true, maxlength: 4000 },
  status: { type: String, enum: ['unread', 'read', 'replied', 'archived'], default: 'unread', index: true },
  reply: { message: String, sentAt: Date }
}, { timestamps: true });

contactSchema.index({ name: 'text', email: 'text', subject: 'text', message: 'text' });

export default mongoose.model('Contact', contactSchema, 'contacts');
