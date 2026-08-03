import express from 'express';
import { body } from 'express-validator';
import rateLimit from 'express-rate-limit';
import { changePassword, forgotPassword, getProfile, login, logout, refreshToken, resendOtp, resetPassword, updateProfile, verifyOtp } from '../controllers/authController.js';
import { adminOnly } from '../middlewares/adminMiddleware.js';
import { protect } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/uploadMiddleware.js';
import { validate } from '../middlewares/validationMiddleware.js';

const router = express.Router();

const forgotLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 5, message: { success: false, message: 'Too many reset requests. Try again in 15 minutes.' }, standardHeaders: true, legacyHeaders: false });
const resetLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 15, message: { success: false, message: 'Too many verification attempts. Try again later.' }, standardHeaders: true, legacyHeaders: false });

router.post('/login', [body('email').isEmail(), body('password').isLength({ min: 6 })], validate, login);
router.post('/refresh-token', refreshToken);
router.post('/logout', protect, adminOnly, logout);
router.post('/forgot-password', forgotLimiter, [body('email').isEmail()], validate, forgotPassword);
router.post('/resend-otp', forgotLimiter, [body('email').isEmail()], validate, resendOtp);
router.post('/resend-reset-otp', forgotLimiter, [body('email').isEmail()], validate, resendOtp);
router.post('/verify-otp', resetLimiter, [body('email').isEmail(), body('otp').notEmpty()], validate, verifyOtp);
router.post('/verify-reset-otp', resetLimiter, [body('email').isEmail(), body('otp').notEmpty()], validate, verifyOtp);
router.post('/reset-password/:token', resetLimiter, resetPassword);
router.post('/reset-password', resetLimiter, resetPassword);
router.get('/profile', protect, adminOnly, getProfile);
router.put('/profile', protect, adminOnly, upload.single('profileImage'), [body('name').optional().isLength({ min: 2, max: 80 })], validate, updateProfile);
router.put('/change-password', protect, adminOnly, [body('currentPassword').notEmpty(), body('newPassword').isLength({ min: 8 })], validate, changePassword);

export default router;
