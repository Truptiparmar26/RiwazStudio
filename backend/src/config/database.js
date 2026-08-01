import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';

export default async function connectDatabase() {
  try {
    mongoose.set('bufferCommands', false);
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 3000 });
    console.log('MongoDB connected');
    await seedAdmin();
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    if (process.env.NODE_ENV === 'production') process.exit(1);
  }
}

async function seedAdmin() {
  const email = (process.env.ADMIN_EMAIL || 'riwazstudioofficial@gmail.com').toLowerCase();
  const password = process.env.ADMIN_PASSWORD || 'Trutuu.@2612';

  try {
    const encryptedPassword = await bcrypt.hash(password, 12);
    let admin = await Admin.findOne({ role: 'admin' });
    if (!admin) {
      admin = await Admin.findOne({ email });
    }

    if (admin) {
      admin.email = email;
      admin.password = encryptedPassword;
      admin.role = 'admin';
      await admin.save();
      console.log('Admin account updated with encrypted password in database');
    } else {
      await Admin.create({
        name: 'Riwaz Admin',
        email,
        password: encryptedPassword,
        role: 'admin'
      });
      console.log('Default admin created with encrypted password in database');
    }
  } catch (err) {
    console.error('Failed to sync encrypted admin credentials:', err.message);
  }
}
