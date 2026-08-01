import Contact from '../models/Contact.js';
import { sendEmail } from '../config/nodemailer.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { getPagination, getPagingData } from '../utils/pagination.js';

export async function createContact(req, res, next) {
  try {
    const contact = await Contact.create(req.body);
    const targetEmail = process.env.NOTIFY_EMAIL || 'riwazstudioofficial@gmail.com';

    const htmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #0F172A; color: #F8FAFC; border-radius: 12px; overflow: hidden; border: 1px solid #1E293B; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
        <div style="background: linear-gradient(135deg, #1E1B4B 0%, #312E81 100%); padding: 30px; text-align: center; border-bottom: 2px solid #F59E0B;">
          <h1 style="color: #F59E0B; margin: 0; font-size: 26px; letter-spacing: 2px; font-weight: 800;">RIWAZ STUDIO</h1>
          <p style="color: #CBD5E1; font-size: 14px; margin: 8px 0 0; text-transform: uppercase; letter-spacing: 1px;">New Client Inquiry Received</p>
        </div>
        
        <div style="padding: 30px;">
          <p style="color: #E2E8F0; font-size: 16px; line-height: 1.5; margin-top: 0;">Hello Admin,<br/>A visitor just submitted a new contact inquiry via the Riwaz Studio website.</p>
          
          <div style="background: #1E293B; border-radius: 8px; padding: 20px; margin: 25px 0; border-left: 4px solid #F59E0B;">
            <p style="margin: 0 0 12px;"><strong style="color: #94A3B8; font-size: 12px; text-transform: uppercase; display: block;">Client Name:</strong> <span style="font-size: 16px; color: #FFFFFF; font-weight: bold;">${contact.name || 'N/A'}</span></p>
            <p style="margin: 0 0 12px;"><strong style="color: #94A3B8; font-size: 12px; text-transform: uppercase; display: block;">Phone Number:</strong> <span style="font-size: 16px; color: #F59E0B; font-weight: bold;">${contact.phone || 'N/A'}</span></p>
            <p style="margin: 0 0 12px;"><strong style="color: #94A3B8; font-size: 12px; text-transform: uppercase; display: block;">Email Address:</strong> <span style="font-size: 15px; color: #60A5FA;">${contact.email || 'N/A'}</span></p>
            <p style="margin: 0 0 12px;"><strong style="color: #94A3B8; font-size: 12px; text-transform: uppercase; display: block;">Subject:</strong> <span style="font-size: 16px; color: #FFFFFF;">${contact.subject || 'General Inquiry'}</span></p>
            <hr style="border: none; border-top: 1px solid #334155; margin: 15px 0;" />
            <p style="margin: 0;"><strong style="color: #94A3B8; font-size: 12px; text-transform: uppercase; display: block; margin-bottom: 5px;">Message:</strong> <span style="font-size: 15px; color: #F1F5F9; white-space: pre-wrap; line-height: 1.6;">${contact.message || 'No message provided.'}</span></p>
          </div>

          <p style="color: #64748B; font-size: 13px; text-align: center; margin: 30px 0 0;">This inquiry has also been saved directly into your Admin Executive Portal.</p>
        </div>
        
        <div style="background: #0B0F19; padding: 15px; text-align: center; color: #64748B; font-size: 12px; border-top: 1px solid #1E293B;">
          &copy; ${new Date().getFullYear()} Riwaz Studio Official Executive Portal. All rights reserved.
        </div>
      </div>
    `;

    try {
      await sendEmail({
        to: targetEmail,
        subject: `✨ New Inquiry from ${contact.name}: ${contact.subject || 'Website Contact'}`,
        html: htmlContent,
        text: `New Inquiry from ${contact.name}\nPhone: ${contact.phone || 'No phone'}\nEmail: ${contact.email}\nSubject: ${contact.subject || 'N/A'}\n\nMessage:\n${contact.message}`
      });
      console.log(`\n✅ [CONTACT INQUIRY SENT] Delivered notification email directly to ${targetEmail}\n`);
    } catch (mailErr) {
      console.warn(`\n⚠️ [CONTACT INQUIRY EMAIL DELIVERY FAILED] Could not send SMTP mail to ${targetEmail}:`, mailErr.message);
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
