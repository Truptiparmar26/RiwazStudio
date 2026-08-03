import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export async function sendEmail({ to, subject, html, text }) {
  if (!to) {
    throw new Error('No recipient email specified for sendEmail');
  }

  const user = process.env.EMAIL_USER || process.env.SMTP_USER || 'riwazstudioofficial@gmail.com';
  const rawPass = process.env.EMAIL_PASS || process.env.EMAIL_PASSWORD || process.env.SMTP_PASS || '';
  const pass = rawPass.replace(/\s+/g, '');
  const from = process.env.MAIL_FROM || `"Riwaz Studio" <${user}>`;

  if (!user || !pass) {
    console.error('❌ [SMTP ERROR] Email credentials (EMAIL_USER or EMAIL_PASS) not found in environment variables.');
    throw new Error('SMTP credentials missing in environment');
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER || user,
      pass: process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s+/g, '') : pass
    }
  });

  try {
    const info = await transporter.sendMail({ from, to, subject, html, text });
    console.log(`\n✅ [EMAIL DISPATCH SUCCESS] Delivered directly to ${to} via Gmail SMTP (Port 465 SSL). MessageID: ${info.messageId || 'sent'}\n`);
    return true;
  } catch (error) {
    // Safely log error without exposing sensitive credentials
    console.error(`\n❌ [SMTP DELIVERY FAILED] Could not deliver email to ${to}. Error: ${error.message}\n`);
    throw error;
  }
}
