import mongoose from 'mongoose';

const adminOtpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: true
  },
  otpHash: {
    type: String,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true
  },
  attempts: {
    type: Number,
    default: 0
  },
  verified: {
    type: Boolean,
    default: false
  },
  resetTokenHash: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600 // Auto-purge documents from MongoDB after 1 hour
  }
});

export default mongoose.model('AdminOtp', adminOtpSchema);
