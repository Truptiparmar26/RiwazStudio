import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({ url: String, publicId: String }, { _id: false });

const settingsSchema = new mongoose.Schema({
  studioName: { type: String, default: 'Riwaz Studio' },
  logo: imageSchema,
  favicon: imageSchema,
  email: String,
  phone: String,
  address: String,
  whatsapp: String,
  instagram: String,
  facebook: String,
  youtube: String,
  linkedIn: String,
  businessHours: String,
  seoTitle: String,
  seoDescription: String,
  googleAnalytics: String,
  googleMapLink: String,
  footerText: String
}, { timestamps: true });

export default mongoose.model('Settings', settingsSchema, 'settings');
