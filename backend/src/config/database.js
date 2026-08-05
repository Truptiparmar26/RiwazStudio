import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';
import Gallery from '../models/Gallery.js';
import Service from '../models/Service.js';
import Blog from '../models/Blog.js';
import Testimonial from '../models/Testimonial.js';

export default async function connectDatabase() {
  try {
    mongoose.set('bufferCommands', false);
    const connectionUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    await mongoose.connect(connectionUri, { serverSelectionTimeoutMS: 10000 });
    console.log('MongoDB connected successfully to cloud cluster');
    await seedAdmin();
    await seedContent();
  } catch (error) {
    console.error(`❌ MongoDB connection failed: ${error.message}`);
    if (error.message.includes('Server selection timed out') || error.message.includes('ENOTFOUND')) {
      console.error('💡 TIP: Your current Internet IP address is not whitelisted in MongoDB Atlas, or your Wi-Fi/ISP is blocking port 27017.');
      console.error('👉 FIX: Go to MongoDB Atlas Dashboard -> Network Access -> Add IP Address -> Allow Access From Anywhere (0.0.0.0/0) or Add Current IP.');
    }
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
      admin.role = 'admin';
      await admin.save();
      console.log('Admin account verified in database (preserving any password resets)');
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

async function seedContent() {
  try {
    const galleryCount = await Gallery.countDocuments();
    if (galleryCount === 0) {
      const defaultGallery = [
        ['Wedding', 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=750&q=76&fm=webp'],
        ['Fashion', 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=750&q=76&fm=webp'],
        ['Portrait', 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=750&q=76&fm=webp'],
        ['Product', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=750&q=76&fm=webp'],
        ['Nature', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=750&q=76&fm=webp'],
        ['Baby', 'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=750&q=76&fm=webp'],
        ['Travel', 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=750&q=76&fm=webp'],
        ['Commercial', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=750&q=76&fm=webp'],
        ['Events', 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=750&q=76&fm=webp'],
        ['Fashion', 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=750&q=76&fm=webp'],
        ['Wedding', 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=750&q=76&fm=webp'],
        ['Product', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=750&q=76&fm=webp']
      ].map(([category, image], index) => ({
        title: `${category} Edit ${index + 1}`,
        slug: `${category.toLowerCase()}-edit-${index + 1}-${Date.now()}-${index}`,
        category,
        image: { url: image },
        status: 'published'
      }));
      await Gallery.insertMany(defaultGallery);
      console.log('✅ Default Gallery items seeded into MongoDB');
    }

    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      const defaultServices = [
        'Wedding Editing', 'Pre Wedding Editing', 'Fashion Retouching', 'Product Editing',
        'Baby Shoot Editing', 'Portrait Retouching', 'Skin Retouch', 'Color Correction'
      ].map((title, index) => ({
        title,
        slug: `${title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}-${index}`,
        price: index % 3 === 0 ? 'From $49' : index % 3 === 1 ? 'From $89' : 'Custom',
        bannerImage: { url: [
          'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=750&q=76&fm=webp',
          'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=750&q=76&fm=webp',
          'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=750&q=76&fm=webp',
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=750&q=76&fm=webp'
        ][index % 4] },
        description: 'High-end editing with precise detail recovery, cinematic color language, natural texture, and delivery-ready exports.',
        features: ['Color craft', 'Texture control', 'Client-ready exports'],
        status: 'published'
      }));
      await Service.insertMany(defaultServices);
      console.log('✅ Default Services seeded into MongoDB');
    }

    const blogCount = await Blog.countDocuments();
    if (blogCount === 0) {
      const defaultBlogs = [
        {
          title: 'How cinematic color grading changes wedding storytelling',
          slug: 'how-cinematic-color-grading-changes-wedding-storytelling',
          category: 'Color Grading',
          featuredImage: { url: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=750&q=76&fm=webp' },
          content: 'Cinematic color grading elevates raw footage into an emotional narrative...',
          status: 'published'
        },
        {
          title: 'Retouching skin texture without losing human detail',
          slug: 'retouching-skin-texture-without-losing-human-detail',
          category: 'Photoshop',
          featuredImage: { url: 'https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?auto=format&fit=crop&w=750&q=76&fm=webp' },
          content: 'High-end portrait retouching preserves natural pores while removing distractions...',
          status: 'published'
        }
      ];
      await Blog.insertMany(defaultBlogs);
      console.log('✅ Default Blogs seeded into MongoDB');
    }

    const testCount = await Testimonial.countDocuments();
    if (testCount === 0) {
      const defaultTestimonials = [
        { clientName: 'Aarav Mehta', profession: 'Wedding Filmmaker', review: 'Every album came back rich, clean, and emotionally consistent. The grading felt like a film.', rating: 5, status: 'published' },
        { clientName: 'Mira Kapoor', profession: 'Fashion Photographer', review: 'They understand luxury skin work. The edits are polished without feeling plastic.', rating: 5, status: 'published' },
        { clientName: 'Nivaan Shah', profession: 'Product Brand Lead', review: 'Turnaround was fast, communication was clear, and the images looked campaign-ready.', rating: 5, status: 'published' }
      ];
      await Testimonial.insertMany(defaultTestimonials);
      console.log('✅ Default Testimonials seeded into MongoDB');
    }
  } catch (err) {
    console.error('Failed to seed default content:', err.message);
  }
}
