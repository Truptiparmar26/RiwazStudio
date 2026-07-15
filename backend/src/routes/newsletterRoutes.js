import express from 'express';
import { body } from 'express-validator';
import { deleteNewsletter, getNewsletter, subscribeNewsletter, unsubscribeNewsletter } from '../controllers/newsletterController.js';
import { adminOnly } from '../middlewares/adminMiddleware.js';
import { protect } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validationMiddleware.js';

const router = express.Router();

router.post('/', [body('email').isEmail()], validate, subscribeNewsletter);
router.post('/unsubscribe', [body('email').isEmail()], validate, unsubscribeNewsletter);
router.get('/', protect, adminOnly, getNewsletter);
router.delete('/:id', protect, adminOnly, deleteNewsletter);

export default router;
