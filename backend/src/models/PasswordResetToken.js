import mongoose from 'mongoose';

const passwordResetTokenSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  hashedToken: {
    type: String,
    required: true,
    unique: true
  },
  expiresAt: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600 // Auto-purge token documents after 1 hour in MongoDB
  }
});

export default mongoose.model('PasswordResetToken', passwordResetTokenSchema);
