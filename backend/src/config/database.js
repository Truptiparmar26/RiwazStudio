import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';
import Gallery from '../models/Gallery.js';
import Service from '../models/Service.js';
import Blog from '../models/Blog.js';
import Testimonial from '../models/Testimonial.js';

export default async function connectDatabase() {
  if (mongoose.connection.readyState === 1) return;
  try {
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
        ['Wedding', 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=750&q=76&fm=webp', 'Royal Heritage Wedding Edit'],
        ['Pre-Wedding', 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=750&q=76&fm=webp', 'Golden Hour Pre-Wedding Story'],
        ['Portrait', 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=750&q=76&fm=webp', 'Natural Light Editorial Portrait'],
        ['Retouching', 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=750&q=76&fm=webp', 'High-Fashion Beauty Retouching'],
        ['Color Grading', 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=750&q=76&fm=webp', 'Cinematic Teal & Amber Grading'],
        ['Creative Edits', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=750&q=76&fm=webp', 'Vogue Editorial Creative Composite'],
        ['Instagram Posts', 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=750&q=76&fm=webp', 'Luxury Brand Social Media Grid'],
        ['Wedding', 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=750&q=76&fm=webp', 'Cinematic Bridal Ceremony Story'],
        ['Pre-Wedding', 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=750&q=76&fm=webp', 'Romantic Dunes Pre-Wedding Edit'],
        ['Portrait', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=750&q=76&fm=webp', 'Studio High-Key Fine Art Portrait'],
        ['Retouching', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=750&q=76&fm=webp', 'Pore-Preserving Luxury Skin Finish'],
        ['Color Grading', 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=750&q=76&fm=webp', 'Mood & Nostalgia Film Look'],
        ['Creative Edits', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=750&q=76&fm=webp', 'Seamless Landscape Clean Composite'],
        ['Instagram Posts', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=750&q=76&fm=webp', 'E-Commerce Hero Campaign Layout']
      ].map(([category, image, title], index) => ({
        title: title || `${category} Edit ${index + 1}`,
        slug: `${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${index + 1}-${Date.now()}-${index}`,
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
        {
          title: 'Wedding Editing',
          category: 'Weddings & Couples',
          price: 'Custom',
          image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
          description: 'Premium wedding photo editing with elegant skin tones, cinematic colors, natural retouching, and a polished final look.',
          features: ['Cinematic Color', 'Skin Retouch', 'Natural Finish']
        },
        {
          title: 'Pre Wedding Editing',
          category: 'Weddings & Couples',
          price: 'From $89',
          image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
          description: 'Creative pre-wedding edits with beautiful color grading, clean skin tones, and a romantic cinematic finish.',
          features: ['Color Grading', 'Skin Retouch', 'Cinematic Look']
        },
        {
          title: 'Fashion Retouching',
          category: 'Portraits & Retouch',
          price: 'From $49',
          image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
          description: 'High-end fashion retouching with refined skin, detailed textures, clean tones, and a professional editorial finish.',
          features: ['Beauty Retouch', 'Detail Control', 'Editorial Finish']
        },
        {
          title: 'Product Editing',
          category: 'Commercial & Real Estate',
          price: 'From $39',
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
          description: 'Clean and professional product editing with accurate colors, refined details, background cleanup, and e-commerce ready results.',
          features: ['Product Cleanup', 'Color Accuracy', 'Web Ready']
        },
        {
          title: 'Kids Photo Editing',
          category: 'Portraits & Retouch',
          price: 'From $49',
          image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80',
          description: 'Bright and natural kids photo editing with gentle skin retouching, vibrant colors, clean backgrounds, and a playful polished finish.',
          features: ['Natural Retouch', 'Soft Colors', 'Clean Finish']
        },
        {
          title: 'Portrait Retouching',
          category: 'Portraits & Retouch',
          price: 'From $49',
          image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
          description: 'Professional portrait retouching that enhances skin, lighting, colors, and details while keeping the person natural and authentic.',
          features: ['Skin Retouch', 'Color Balance', 'Natural Look']
        },
        {
          title: 'Skin Retouch',
          category: 'Portraits & Retouch',
          price: 'From $39',
          image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
          description: 'Natural skin retouching that removes distractions while preserving real texture, facial details, and a clean premium appearance.',
          features: ['Natural Skin', 'Texture Control', 'Clean Finish']
        },
        {
          title: 'Color Correction',
          category: 'Color & Drone',
          price: 'From $29',
          image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
          description: 'Precise color correction to balance exposure, white balance, skin tones, and overall image consistency.',
          features: ['Color Balance', 'Skin Tone', 'Exposure Fix']
        },
        {
          title: 'Color Grading',
          category: 'Color & Drone',
          price: 'From $59',
          image: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=800&q=80',
          description: 'Cinematic color grading designed to create mood, depth, consistency, and a distinctive visual style for your images.',
          features: ['Cinematic Tone', 'Mood & Depth', 'Signature Look']
        },
        {
          title: 'Background Removal',
          category: 'Restoration & Cutout',
          price: 'From $19',
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
          description: 'Precise background removal with clean edges and professional masking for portraits, products, and creative compositions.',
          features: ['Clean Cutout', 'Precise Masking', 'High Quality']
        },
        {
          title: 'Object Removal',
          category: 'Restoration & Cutout',
          price: 'From $29',
          image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
          description: 'Seamless removal of unwanted people, objects, wires, and distractions while maintaining a natural-looking background.',
          features: ['Clean Removal', 'Seamless Edit', 'Natural Finish']
        },
        {
          title: 'Photo Restoration',
          category: 'Restoration & Cutout',
          price: 'From $69',
          image: 'https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?auto=format&fit=crop&w=800&q=80',
          description: 'Restore old and damaged photographs with careful repair, detail enhancement, color correction, and a natural finished look.',
          features: ['Old Photo Repair', 'Detail Recovery', 'Color Restore']
        },
        {
          title: 'Instagram Post Design',
          category: 'Commercial & Real Estate',
          price: 'From $39',
          image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80',
          description: 'Creative and premium Instagram post designs crafted with clean layouts, elegant typography, and a strong visual identity that makes every post stand out.',
          features: ['Creative Layouts', 'Premium Design', 'Social Ready']
        },
        {
          title: 'Real Estate Editing',
          category: 'Commercial & Real Estate',
          price: 'From $49',
          image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
          description: 'Professional real estate photo editing with balanced exposure, accurate colors, clean interiors, and bright natural-looking results.',
          features: ['HDR Balance', 'Color Correction', 'Clean Interiors']
        },
        {
          title: 'Drone Editing',
          category: 'Color & Drone',
          price: 'From $59',
          image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80',
          description: 'Professional drone photo enhancement with improved colors, contrast, details, and cinematic aerial presentation.',
          features: ['Aerial Enhancement', 'Color Grading', 'Detail Boost']
        },
        {
          title: 'AI Photo Enhancement',
          category: 'Restoration & AI',
          price: 'From $39',
          image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
          description: 'Smart photo enhancement for improving resolution, clarity, details, and overall image quality while keeping the result natural.',
          features: ['Detail Enhancement', 'Resolution Boost', 'Natural Finish']
        }
      ].map((item, index) => ({
        ...item,
        slug: `${item.title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}-${index}`,
        bannerImage: { url: item.image },
        status: 'published'
      }));
      await Service.insertMany(defaultServices);
      console.log('✅ Default 16 Services seeded into MongoDB');
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
