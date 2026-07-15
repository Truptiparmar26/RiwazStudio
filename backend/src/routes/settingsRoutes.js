import express from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController.js';
import { adminOnly } from '../middlewares/adminMiddleware.js';
import { protect } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.get('/', getSettings);
router.put('/', protect, adminOnly, upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'favicon', maxCount: 1 }]), updateSettings);

export default router;
