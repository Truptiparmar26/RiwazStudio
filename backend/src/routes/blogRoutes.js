import express from 'express';
import { body } from 'express-validator';
import { createBlog, deleteBlog, getBlogBySlug, getBlogs, updateBlog } from '../controllers/blogController.js';
import { adminOnly } from '../middlewares/adminMiddleware.js';
import { protect } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/uploadMiddleware.js';
import { validate } from '../middlewares/validationMiddleware.js';

const router = express.Router();

router.get('/', getBlogs);
router.get('/:slug', getBlogBySlug);
router.post('/', protect, adminOnly, upload.any(), [body('title').optional().isString()], validate, createBlog);
router.put('/:id', protect, adminOnly, upload.any(), validate, updateBlog);
router.delete('/:id', protect, adminOnly, deleteBlog);

export default router;
