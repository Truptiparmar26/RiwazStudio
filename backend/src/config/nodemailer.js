import nodemailer from 'nodemailer';

function getTransporter() {
  if (!process.env.SMTP_HOST) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined
  });
}

export async function sendEmail({ to, subject, html, text }) {
  if (!to) return false;
  const transporter = getTransporter();
  if (!transporter) return false;
  await transporter.sendMail({ from: process.env.MAIL_FROM, to, subject, html, text });
  return true;
}
