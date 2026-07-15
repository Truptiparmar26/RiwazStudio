import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  password: { type: String, required: true, select: false },
  phone: { type: String, trim: true },
  profileImage: { url: String, publicId: String },
  role: { type: String, enum: ['admin'], default: 'admin' },
  refreshTokenHash: { type: String, select: false },
  resetPasswordToken: { type: String, select: false },
  resetPasswordExpires: Date,
  tokenVersion: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Admin', adminSchema, 'admins');
