import express from 'express';
import { body } from 'express-validator';
import { createTestimonial, deleteTestimonial, getTestimonials, updateTestimonial } from '../controllers/testimonialController.js';
import { adminOnly } from '../middlewares/adminMiddleware.js';
import { protect } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/uploadMiddleware.js';
import { validate } from '../middlewares/validationMiddleware.js';

const router = express.Router();

router.get('/', getTestimonials);
router.post('/', protect, adminOnly, upload.single('image'), [body('clientName').isLength({ min: 2 }), body('rating').isInt({ min: 1, max: 5 }), body('review').isLength({ min: 10 })], validate, createTestimonial);
router.put('/:id', protect, adminOnly, upload.single('image'), validate, updateTestimonial);
router.delete('/:id', protect, adminOnly, deleteTestimonial);

export default router;
