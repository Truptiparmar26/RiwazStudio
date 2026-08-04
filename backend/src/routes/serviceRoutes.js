import express from 'express';
import { body } from 'express-validator';
import { createService, deleteService, getServiceBySlug, getServices, updateService } from '../controllers/serviceController.js';
import { adminOnly } from '../middlewares/adminMiddleware.js';
import { protect } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/uploadMiddleware.js';
import { validate } from '../middlewares/validationMiddleware.js';

const router = express.Router();

router.get('/', getServices);
router.get('/:slug', getServiceBySlug);
router.post('/', protect, adminOnly, upload.any(), [body('title').optional().isString()], validate, createService);
router.put('/:id', protect, adminOnly, upload.any(), validate, updateService);
router.delete('/:id', protect, adminOnly, deleteService);

export default router;
