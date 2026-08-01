import express from 'express';
import { body } from 'express-validator';
import { createContact, deleteContact, getContacts, markContactRead, replyContact } from '../controllers/contactController.js';
import { adminOnly } from '../middlewares/adminMiddleware.js';
import { protect } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validationMiddleware.js';

const router = express.Router();

router.post('/', [body('name').notEmpty().withMessage('Name required'), body('email').isEmail().withMessage('Valid email required'), body('message').notEmpty().withMessage('Message required')], validate, createContact);
router.get('/', protect, adminOnly, getContacts);
router.put('/:id/read', protect, adminOnly, markContactRead);
router.put('/:id/reply', protect, adminOnly, [body('message').isLength({ min: 2 })], validate, replyContact);
router.delete('/:id', protect, adminOnly, deleteContact);

export default router;
