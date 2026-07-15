import express from 'express';
import { body } from 'express-validator';
import { createGallery, deleteGallery, getGallery, getGalleryById, updateGallery } from '../controllers/galleryController.js';
import { adminOnly } from '../middlewares/adminMiddleware.js';
import { protect } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/uploadMiddleware.js';
import { validate } from '../middlewares/validationMiddleware.js';

const router = express.Router();

router.get('/', getGallery);
router.get('/:id', getGalleryById);
router.post('/', protect, adminOnly, upload.single('image'), [body('title').isLength({ min: 2, max: 140 })], validate, createGallery);
router.put('/:id', protect, adminOnly, upload.single('image'), validate, updateGallery);
router.delete('/:id', protect, adminOnly, deleteGallery);

export default router;
