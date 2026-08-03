import Contact from '../models/Contact.js';
import { sendEmail } from '../config/nodemailer.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { getPagination, getPagingData } from '../utils/pagination.js';

export async function createContact(req, res, next) {
  try {
    // 1. Save contact submission to MongoDB (ensuring it shows in Admin Panel)
    const contact = await Contact.create(req.body);

    // 2. Prepare email notification details
    const targetEmail = 'riwazstudioofficial@gmail.com';

    const submissionDateObj = contact.createdAt ? new Date(contact.createdAt) : new Date();
    const formattedDateTime = submissionDateObj.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Contact Form Submission - Riwaz Studio</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #0B0F19; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; -webkit-font-smoothing: antialiased;">
        <div style="max-width: 620px; margin: 30px auto; background: #0F172A; color: #F8FAFC; border-radius: 12px; overflow: hidden; border: 1px solid #1E293B; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
          
          <!-- Header with Riwaz Studio Branding -->
          <div style="background: linear-gradient(135deg, #1E1B4B 0%, #312E81 100%); padding: 35px 30px; text-align: center; border-bottom: 3px solid #F59E0B;">
            <h1 style="color: #F59E0B; margin: 0; font-size: 28px; letter-spacing: 3px; font-weight: 800; text-transform: uppercase;">RIWAZ STUDIO</h1>
            <p style="color: #E2E8F0; font-size: 14px; margin: 10px 0 0; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600;">New Contact Form Submission</p>
          </div>
          
          <!-- Body Content -->
          <div style="padding: 35px 30px;">
            <p style="color: #E2E8F0; font-size: 16px; line-height: 1.6; margin-top: 0; margin-bottom: 25px;">
              Hello Admin,<br/><br/>
              A user has just submitted a new contact inquiry through the Riwaz Studio official website. Below are the complete submission details:
            </p>
            
            <!-- Details Card -->
            <div style="background: #1E293B; border-radius: 10px; padding: 25px; margin: 25px 0; border-left: 4px solid #F59E0B;">
              
              <div style="margin-bottom: 16px;">
                <span style="color: #94A3B8; font-size: 12px; text-transform: uppercase; font-weight: bold; letter-spacing: 0.5px; display: block;">User Name</span>
                <span style="font-size: 17px; color: #FFFFFF; font-weight: 700; margin-top: 3px; display: block;">${contact.name || 'N/A'}</span>
              </div>

              <div style="margin-bottom: 16px;">
                <span style="color: #94A3B8; font-size: 12px; text-transform: uppercase; font-weight: bold; letter-spacing: 0.5px; display: block;">User Email</span>
                <a href="mailto:${contact.email || ''}" style="font-size: 16px; color: #60A5FA; text-decoration: none; font-weight: 600; margin-top: 3px; display: block;">${contact.email || 'N/A'}</a>
              </div>

              <div style="margin-bottom: 16px;">
                <span style="color: #94A3B8; font-size: 12px; text-transform: uppercase; font-weight: bold; letter-spacing: 0.5px; display: block;">Phone Number</span>
                <a href="tel:${contact.phone || ''}" style="font-size: 16px; color: #F59E0B; text-decoration: none; font-weight: 700; margin-top: 3px; display: block;">${contact.phone || 'N/A'}</a>
              </div>

              <div style="margin-bottom: 16px;">
                <span style="color: #94A3B8; font-size: 12px; text-transform: uppercase; font-weight: bold; letter-spacing: 0.5px; display: block;">Subject / Service</span>
                <span style="font-size: 16px; color: #FFFFFF; font-weight: 600; margin-top: 3px; display: block;">${contact.subject || 'General Inquiry'}</span>
              </div>

              <div style="margin-bottom: 16px;">
                <span style="color: #94A3B8; font-size: 12px; text-transform: uppercase; font-weight: bold; letter-spacing: 0.5px; display: block;">Submission Date &amp; Time</span>
                <span style="font-size: 15px; color: #CBD5E1; margin-top: 3px; display: block;">${formattedDateTime}</span>
              </div>

              <hr style="border: none; border-top: 1px solid #334155; margin: 20px 0;" />
              
              <div>
                <span style="color: #94A3B8; font-size: 12px; text-transform: uppercase; font-weight: bold; letter-spacing: 0.5px; display: block; margin-bottom: 8px;">Message</span>
                <div style="font-size: 15px; color: #F1F5F9; white-space: pre-wrap; line-height: 1.7; background: #0F172A; padding: 16px; border-radius: 6px; border: 1px solid #334155;">${contact.message || 'No message provided.'}</div>
              </div>

            </div>

            <p style="color: #94A3B8; font-size: 14px; text-align: center; margin: 30px 0 10px;">
              ⚡ This submission has been permanently recorded in your MongoDB database and is visible in your Admin Panel.
            </p>
          </div>
          
          <!-- Footer -->
          <div style="background: #0B0F19; padding: 20px; text-align: center; color: #64748B; font-size: 12px; border-top: 1px solid #1E293B;">
            <p style="margin: 0 0 6px;">&copy; ${new Date().getFullYear()} Riwaz Studio Official Executive Portal. All rights reserved.</p>
            <p style="margin: 0; color: #475569;">Automated Notification System • Do not reply directly to this automated email address</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const textContent = `New Contact Form Submission - Riwaz Studio\n\n` +
      `User Name: ${contact.name || 'N/A'}\n` +
      `User Email: ${contact.email || 'N/A'}\n` +
      `Phone Number: ${contact.phone || 'N/A'}\n` +
      `Subject / Service: ${contact.subject || 'N/A'}\n` +
      `Submission Date & Time: ${formattedDateTime}\n\n` +
      `Message:\n${contact.message || 'N/A'}`;

    // 3. Attempt sending email notification without disrupting DB saving or response
    try {
      await sendEmail({
        to: targetEmail,
        subject: "New Contact Form Submission - Riwaz Studio",
        html: htmlContent,
        text: textContent
      });
      console.log(`\n✅ [CONTACT NOTIFICATION SENT] Successfully emailed submission details to ${targetEmail}\n`);
    } catch (mailErr) {
      // Log the backend error safely without exposing SMTP credentials
      console.error(`\n⚠️ [CONTACT EMAIL NOTIFICATION FAILED] Submission saved to DB, but email delivery failed. Safe reason: ${mailErr.message || 'Unknown SMTP error'}\n`);
      // NOTE: We deliberately do NOT throw or delete the contact submission if email sending fails.
    }

    // 4. Return a proper success response to the frontend
    return ApiResponse.created(res, 'Message received successfully', { contact });
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
