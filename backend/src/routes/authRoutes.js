import express from 'express';
import { body } from 'express-validator';
import { changePassword, forgotPassword, getProfile, login, logout, refreshToken, resetPassword, updateProfile } from '../controllers/authController.js';
import { adminOnly } from '../middlewares/adminMiddleware.js';
import { protect } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/uploadMiddleware.js';
import { validate } from '../middlewares/validationMiddleware.js';

const router = express.Router();

router.post('/login', [body('email').isEmail(), body('password').isLength({ min: 6 })], validate, login);
router.post('/refresh-token', refreshToken);
router.post('/logout', protect, adminOnly, logout);
router.post('/forgot-password', [body('email').isEmail()], validate, forgotPassword);
router.post('/reset-password', [body('token').notEmpty(), body('password').isLength({ min: 8 })], validate, resetPassword);
router.get('/profile', protect, adminOnly, getProfile);
router.put('/profile', protect, adminOnly, upload.single('profileImage'), [body('name').optional().isLength({ min: 2, max: 80 })], validate, updateProfile);
router.put('/change-password', protect, adminOnly, [body('currentPassword').notEmpty(), body('newPassword').isLength({ min: 8 })], validate, changePassword);

export default router;
