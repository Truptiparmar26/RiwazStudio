import express from 'express';
import { body } from 'express-validator';
import { createTestimonial, deleteTestimonial, getTestimonialById, getTestimonials, updateTestimonial } from '../controllers/testimonialController.js';
import { adminOnly } from '../middlewares/adminMiddleware.js';
import { protect } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/uploadMiddleware.js';
import { validate } from '../middlewares/validationMiddleware.js';

const router = express.Router();

router.get('/', getTestimonials);
router.get('/:id', getTestimonialById);
router.post('/', protect, adminOnly, upload.any(), [body('clientName').optional().isString()], validate, createTestimonial);
router.put('/:id', protect, adminOnly, upload.any(), validate, updateTestimonial);
router.delete('/:id', protect, adminOnly, deleteTestimonial);

export default router;
