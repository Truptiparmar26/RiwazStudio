import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generateCircularLogo() {
  const inputPath = path.resolve('../client/public/logo.png');
  const faviconPath = path.resolve('../client/public/favicon.png');
  const tempPath = path.resolve('../client/public/logo_round.png');

  console.log('Reading logo from:', inputPath);

  const image = sharp(inputPath);
  const metadata = await image.metadata();
  const size = Math.min(metadata.width || 512, metadata.height || 512);

  // Create a perfectly circular SVG mask with transparent background
  const circleSvg = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white" /></svg>`
  );

  await sharp(inputPath)
    .resize(size, size, { fit: 'cover' })
    .ensureAlpha()
    .composite([{ input: circleSvg, blend: 'dest-in' }])
    .png({ quality: 100 })
    .toFile(tempPath);

  console.log('Created circular PNG at:', tempPath);

  // Overwrite favicon.png and logo.png with the circular version
  fs.copyFileSync(tempPath, faviconPath);
  fs.copyFileSync(tempPath, inputPath);
  fs.unlinkSync(tempPath);

  console.log('Success! Logo and favicon are now perfect circles with transparent background.');
}

generateCircularLogo().catch(console.error);
