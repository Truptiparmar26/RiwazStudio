import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { sendEmail } from '../config/nodemailer.js';
import { uploadToCloudinary } from '../middlewares/uploadMiddleware.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { generateAccessToken, generateRefreshToken, setRefreshTokenCookie } from '../utils/generateToken.js';

const adminPayload = (admin) => ({
  id: admin._id,
  name: admin.name,
  email: admin.email,
  phone: admin.phone,
  profileImage: admin.profileImage,
  role: admin.role
});

export async function login(req, res, next) {
  try {
    const admin = await Admin.findOne({ email: req.body.email.toLowerCase(), role: 'admin' }).select('+password');
    if (!admin) throw new ApiError(401, 'Invalid admin credentials');
    const valid = await bcrypt.compare(req.body.password, admin.password);
    if (!valid) throw new ApiError(401, 'Invalid admin credentials');

    const accessToken = generateAccessToken(admin);
    const refreshToken = generateRefreshToken(admin);
    admin.refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    await admin.save();
    setRefreshTokenCookie(res, refreshToken);
    return ApiResponse.ok(res, 'Login successful', { admin: adminPayload(admin), accessToken });
  } catch (error) {
    next(error);
  }
}

export async function refreshToken(req, res, next) {
  try {
    const token = req.cookies.refreshToken || req.body.refreshToken;
    if (!token) throw new ApiError(401, 'Refresh token is required');
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const admin = await Admin.findById(decoded.id).select('+refreshTokenHash');
    if (!admin || admin.tokenVersion !== decoded.tokenVersion) throw new ApiError(401, 'Invalid refresh token');
    const valid = await bcrypt.compare(token, admin.refreshTokenHash || '');
    if (!valid) throw new ApiError(401, 'Invalid refresh token');
    return ApiResponse.ok(res, 'Token refreshed', { accessToken: generateAccessToken(admin) });
  } catch (error) {
    next(error);
  }
}

export async function logout(req, res, next) {
  try {
    await Admin.findByIdAndUpdate(req.admin._id, { $unset: { refreshTokenHash: 1 }, $inc: { tokenVersion: 1 } });
    res.clearCookie('refreshToken');
    return ApiResponse.ok(res, 'Logged out');
  } catch (error) {
    next(error);
  }
}

export async function forgotPassword(req, res, next) {
  try {
    const admin = await Admin.findOne({ email: req.body.email.toLowerCase() });
    if (!admin) return ApiResponse.ok(res, 'If the email exists, reset instructions were sent');
    const rawToken = crypto.randomBytes(32).toString('hex');
    admin.resetPasswordToken = crypto.createHash('sha256').update(rawToken).digest('hex');
    admin.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
    await admin.save();
    await sendEmail({ to: admin.email, subject: 'Reset your Riwaz Studio password', text: `Reset token: ${rawToken}` });
    return ApiResponse.ok(res, 'If the email exists, reset instructions were sent');
  } catch (error) {
    next(error);
  }
}

export async function resetPassword(req, res, next) {
  try {
    const token = crypto.createHash('sha256').update(req.body.token).digest('hex');
    const admin = await Admin.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
    if (!admin) throw new ApiError(400, 'Reset token is invalid or expired');
    admin.password = await bcrypt.hash(req.body.password, 12);
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpires = undefined;
    admin.tokenVersion += 1;
    await admin.save();
    return ApiResponse.ok(res, 'Password reset successful');
  } catch (error) {
    next(error);
  }
}

export function getProfile(req, res) {
  return ApiResponse.ok(res, 'Profile fetched', { admin: adminPayload(req.admin) });
}

export async function updateProfile(req, res, next) {
  try {
    const payload = { name: req.body.name, phone: req.body.phone };
    if (req.file) payload.profileImage = await uploadToCloudinary(req.file, 'riwaz-studio/admin');
    const admin = await Admin.findByIdAndUpdate(req.admin._id, payload, { new: true, runValidators: true });
    return ApiResponse.ok(res, 'Profile updated', { admin: adminPayload(admin) });
  } catch (error) {
    next(error);
  }
}

export async function changePassword(req, res, next) {
  try {
    const admin = await Admin.findById(req.admin._id).select('+password');
    const valid = await bcrypt.compare(req.body.currentPassword, admin.password);
    if (!valid) throw new ApiError(400, 'Current password is incorrect');
    admin.password = await bcrypt.hash(req.body.newPassword, 12);
    admin.tokenVersion += 1;
    await admin.save();
    return ApiResponse.ok(res, 'Password changed');
  } catch (error) {
    next(error);
  }
}
