import Contact from '../models/Contact.js';
import { sendEmail } from '../config/nodemailer.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { getPagination, getPagingData } from '../utils/pagination.js';

export async function createContact(req, res, next) {
  try {
    const contact = await Contact.create(req.body);
    try {
      await sendEmail({
        to: process.env.NOTIFY_EMAIL || 'admin@riwazstudio.com',
        subject: `New Riwaz Studio inquiry: ${contact.subject || 'Website Inquiry'}`,
        text: `${contact.name}\n${contact.phone || 'No phone'}\n${contact.email}\n\n${contact.message}`
      });
    } catch {
      // SMTP sending failure should not prevent message storage
    }
    return ApiResponse.created(res, 'Message received', { contact });
  } catch (error) {
    next(error);
  }
}

export async function getContacts(req, res, next) {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const query = {};
    if (req.query.status) query.status = req.query.status;
    if (req.query.search) query.$text = { $search: req.query.search };
    const [items, total] = await Promise.all([
      Contact.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Contact.countDocuments(query)
    ]);
    return ApiResponse.ok(res, 'Messages fetched', getPagingData(items, total, page, limit));
  } catch (error) {
    next(error);
  }
}

export async function markContactRead(req, res, next) {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, { status: 'read' }, { new: true });
    if (!contact) throw new ApiError(404, 'Message not found');
    return ApiResponse.ok(res, 'Message marked read', { contact });
  } catch (error) {
    next(error);
  }
}

export async function replyContact(req, res, next) {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, { status: 'replied', reply: { message: req.body.message, sentAt: new Date() } }, { new: true });
    if (!contact) throw new ApiError(404, 'Message not found');
    await sendEmail({ to: contact.email, subject: `Re: ${contact.subject}`, text: req.body.message });
    return ApiResponse.ok(res, 'Reply saved and email attempted', { contact });
  } catch (error) {
    next(error);
  }
}

export async function deleteContact(req, res, next) {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) throw new ApiError(404, 'Message not found');
    return ApiResponse.ok(res, 'Message deleted');
  } catch (error) {
    next(error);
  }
}
