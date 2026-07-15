import mongoose from 'mongoose';

const newsletterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  status: { type: String, enum: ['subscribed', 'unsubscribed'], default: 'subscribed', index: true },
  source: { type: String, default: 'website' }
}, { timestamps: true });

export default mongoose.model('Newsletter', newsletterSchema, 'newsletter');
