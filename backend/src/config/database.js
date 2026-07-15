import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';

export default async function connectDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 6000 });
    console.log('MongoDB connected');
    await seedAdmin();
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    if (process.env.NODE_ENV === 'production') process.exit(1);
  }
}

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) return;

  const exists = await Admin.findOne({ email: email.toLowerCase() });
  if (exists) return;

  await Admin.create({
    name: 'Riwaz Admin',
    email,
    password: await bcrypt.hash(password, 12),
    role: 'admin'
  });
  console.log('Default admin created');
}
