import express from 'express';
import { getDashboard } from '../controllers/dashboardController.js';
import { adminOnly } from '../middlewares/adminMiddleware.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', protect, adminOnly, getDashboard);

export default router;
