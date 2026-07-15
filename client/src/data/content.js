export const heroTags = [
  'Professional Editing',
  'Wedding Editing',
  'Fashion Editing',
  'Product Editing',
  'Portrait Retouching',
  'Album Designing',
  'Color Grading',
  'Restoration'
];

export const stats = [
  { label: 'Projects Completed', value: '1.8K+' },
  { label: 'Clients', value: '420+' },
  { label: 'Photos Edited', value: '240K+' },
  { label: 'Years Experience', value: '9+' }
];

export const services = [
  'Wedding Editing',
  'Pre Wedding Editing',
  'Fashion Retouching',
  'Product Editing',
  'Baby Shoot Editing',
  'Portrait Retouching',
  'Skin Retouch',
  'Color Correction',
  'Color Grading',
  'Background Removal',
  'Object Removal',
  'Photo Restoration',
  'Album Designing',
  'Real Estate Editing',
  'Drone Editing',
  'Food Photography Editing',
  'Jewelry Editing',
  'Social Media Editing',
  'AI Photo Enhancement'
].map((title, index) => ({
  title,
  price: index % 3 === 0 ? 'From $49' : index % 3 === 1 ? 'From $89' : 'Custom',
  image: [
    'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=80'
  ][index % 6],
  description: 'High-end editing with precise detail recovery, cinematic color language, natural texture, and delivery-ready exports.',
  features: ['Color craft', 'Texture control', 'Client-ready exports']
}));

export const categories = ['All', 'Wedding', 'Fashion', 'Portrait', 'Product', 'Nature', 'Baby', 'Travel', 'Commercial', 'Events'];

export const gallery = [
  ['Wedding', 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80'],
  ['Fashion', 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80'],
  ['Portrait', 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=900&q=80'],
  ['Product', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80'],
  ['Nature', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80'],
  ['Baby', 'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=900&q=80'],
  ['Travel', 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80'],
  ['Commercial', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80'],
  ['Events', 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=80'],
  ['Fashion', 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80'],
  ['Wedding', 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=900&q=80'],
  ['Product', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80']
].map(([category, image], index) => ({
  id: index + 1,
  title: `${category} Edit ${index + 1}`,
  category,
  image
}));

export const blogs = [
  {
    title: 'How cinematic color grading changes wedding storytelling',
    category: 'Color Grading',
    image: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=900&q=80'
  },
  {
    title: 'Retouching skin texture without losing human detail',
    category: 'Photoshop',
    image: 'https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?auto=format&fit=crop&w=900&q=80'
  },
  {
    title: 'Product edits that make ecommerce imagery feel expensive',
    category: 'Editing Tips',
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=900&q=80'
  }
];

export const testimonials = [
  { name: 'Aarav Mehta', role: 'Wedding Filmmaker', quote: 'Every album came back rich, clean, and emotionally consistent. The grading felt like a film.', rating: 5 },
  { name: 'Mira Kapoor', role: 'Fashion Photographer', quote: 'They understand luxury skin work. The edits are polished without feeling plastic.', rating: 5 },
  { name: 'Nivaan Shah', role: 'Product Brand Lead', quote: 'Turnaround was fast, communication was clear, and the images looked campaign-ready.', rating: 5 }
];
