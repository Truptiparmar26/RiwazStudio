import Contact from '../models/Contact.js';
import { sendEmail } from '../config/nodemailer.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { getPagination, getPagingData } from '../utils/pagination.js';
import { uploadToCloudinary } from '../middlewares/uploadMiddleware.js';

export async function createContact(req, res, next) {
  try {
    let referenceUrl = null;
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file, 'riwaz-contacts');
      if (uploadResult) referenceUrl = uploadResult.url;
    }

    const contactData = { ...req.body };
    if (referenceUrl) contactData.referenceUrl = referenceUrl;

    // 1. Save contact submission to MongoDB (ensuring it shows in Admin Panel)
    const contact = await Contact.create(contactData);

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

    const fileButtonHtml = contact.referenceUrl 
      ? `
        <div style="margin-top: 25px; text-align: center;">
          <a href="${contact.referenceUrl}" target="_blank" style="display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #F4D690 0%, #D4AF37 100%); color: #000000; text-decoration: none; font-weight: 800; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; border-radius: 8px; box-shadow: 0 10px 25px rgba(244,214,144,0.3);">
            📎 View Reference File
          </a>
        </div>
      ` : '';

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Client Inquiry - Riwaz Studio</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #080A10; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #080A10; padding: 40px 15px;">
          <tr>
            <td align="center">
              <table width="100%" max-width="650" border="0" cellspacing="0" cellpadding="0" style="max-width: 650px; background: #0E121C; border-radius: 16px; overflow: hidden; border: 1px solid #232A3B; box-shadow: 0 30px 60px rgba(0,0,0,0.8);">
                
                <!-- Premium Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #111522 0%, #1A2235 100%); padding: 45px 30px; text-align: center; border-bottom: 2px solid #F4D690;">
                    <div style="width: 50px; height: 50px; margin: 0 auto 15px; border-radius: 50%; background: #F4D690; display: flex; align-items: center; justify-content: center;">
                      <span style="color: #000; font-size: 24px; font-weight: bold; line-height: 50px;">R</span>
                    </div>
                    <h1 style="color: #F4D690; margin: 0; font-size: 26px; letter-spacing: 4px; font-weight: 900; text-transform: uppercase;">RIWAZ STUDIO</h1>
                    <p style="color: #8A9BB3; font-size: 13px; margin: 12px 0 0; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Premium Client Inquiry</p>
                  </td>
                </tr>
                
                <!-- Body Content -->
                <tr>
                  <td style="padding: 40px 35px;">
                    <p style="color: #E2E8F0; font-size: 16px; line-height: 1.6; margin-top: 0; margin-bottom: 30px;">
                      Hello Admin,<br/><br/>
                      A new high-priority client inquiry has just been captured. Please find the verified submission details below:
                    </p>
                    
                    <!-- Details Card -->
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: #141A28; border-radius: 12px; border: 1px solid #232A3B;">
                      <tr>
                        <td style="padding: 30px;">
                          
                          <!-- Name -->
                          <div style="margin-bottom: 20px;">
                            <span style="color: #718096; font-size: 11px; text-transform: uppercase; font-weight: 700; letter-spacing: 1px; display: block;">Client Name</span>
                            <span style="font-size: 18px; color: #FFFFFF; font-weight: 700; margin-top: 4px; display: block;">${contact.name || 'N/A'}</span>
                          </div>

                          <!-- Contact Grid -->
                          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 20px;">
                            <tr>
                              <td width="50%" valign="top">
                                <span style="color: #718096; font-size: 11px; text-transform: uppercase; font-weight: 700; letter-spacing: 1px; display: block;">Email Address</span>
                                <a href="mailto:${contact.email || ''}" style="font-size: 15px; color: #60A5FA; text-decoration: none; font-weight: 600; margin-top: 4px; display: inline-block;">${contact.email || 'N/A'}</a>
                              </td>
                              <td width="50%" valign="top">
                                <span style="color: #718096; font-size: 11px; text-transform: uppercase; font-weight: 700; letter-spacing: 1px; display: block;">Phone / WhatsApp</span>
                                <a href="tel:${contact.phone || ''}" style="font-size: 15px; color: #F4D690; text-decoration: none; font-weight: 700; margin-top: 4px; display: inline-block;">${contact.phone || 'N/A'}</a>
                              </td>
                            </tr>
                          </table>

                          <!-- Service -->
                          <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #232A3B;">
                            <span style="color: #718096; font-size: 11px; text-transform: uppercase; font-weight: 700; letter-spacing: 1px; display: block;">Service Requested</span>
                            <span style="font-size: 16px; color: #FFFFFF; font-weight: 600; margin-top: 4px; display: block;">${contact.subject || 'General Inquiry'}</span>
                          </div>
                          
                          <!-- Message -->
                          <div>
                            <span style="color: #718096; font-size: 11px; text-transform: uppercase; font-weight: 700; letter-spacing: 1px; display: block; margin-bottom: 10px;">Project Details</span>
                            <div style="font-size: 15px; color: #E2E8F0; white-space: pre-wrap; line-height: 1.7; background: #0E121C; padding: 20px; border-radius: 8px; border: 1px solid #232A3B;">${contact.message || 'No details provided.'}</div>
                          </div>

                        </td>
                      </tr>
                    </table>

                    ${fileButtonHtml}

                    <div style="text-align: center; margin-top: 35px;">
                      <p style="color: #4A5568; font-size: 12px; margin: 0;">
                        🗓️ Submitted on: ${formattedDateTime}
                      </p>
                    </div>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background: #0B0F19; padding: 25px; text-align: center; border-top: 1px solid #1A2235;">
                    <p style="margin: 0 0 8px; color: #718096; font-size: 12px; font-weight: 500;">&copy; ${new Date().getFullYear()} Riwaz Studio. Secure Admin Portal.</p>
                    <p style="margin: 0; color: #4A5568; font-size: 11px;">This is an automated encrypted notification. Do not reply directly.</p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const textContent = `New Contact Form Submission - Riwaz Studio\n\n` +
      `User Name: ${contact.name || 'N/A'}\n` +
      `User Email: ${contact.email || 'N/A'}\n` +
      `Phone Number: ${contact.phone || 'N/A'}\n` +
      `Subject / Service: ${contact.subject || 'N/A'}\n` +
      `Submission Date & Time: ${formattedDateTime}\n\n` +
      `Message:\n${contact.message || 'N/A'}\n\n` +
      (contact.referenceUrl ? `Reference File: ${contact.referenceUrl}\n` : '');

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
