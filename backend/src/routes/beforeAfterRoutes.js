import express from 'express';
import { body } from 'express-validator';
import { createBeforeAfter, deleteBeforeAfter, getBeforeAfter, updateBeforeAfter } from '../controllers/beforeAfterController.js';
import { adminOnly } from '../middlewares/adminMiddleware.js';
import { protect } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/uploadMiddleware.js';
import { validate } from '../middlewares/validationMiddleware.js';

const router = express.Router();
const images = upload.fields([{ name: 'originalImage', maxCount: 1 }, { name: 'editedImage', maxCount: 1 }]);

router.get('/', getBeforeAfter);
router.post('/', protect, adminOnly, images, [body('title').isLength({ min: 2, max: 140 })], validate, createBeforeAfter);
router.put('/:id', protect, adminOnly, images, validate, updateBeforeAfter);
router.delete('/:id', protect, adminOnly, deleteBeforeAfter);

export default router;
