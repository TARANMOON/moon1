const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const zipPath = 'C:\\Users\\taran\\My Drive\\1 ezgif-162ff485baedb6b4-jpg.zip';
const destDir = path.resolve(__dirname, '../public/moon/frames');
const publicMoonDir = path.resolve(__dirname, '../public/moon');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

console.log('Extracting archive from:', zipPath);
console.log('Extracting to:', destDir);

try {
  execSync(`tar -xf "${zipPath}" -C "${destDir}"`, { stdio: 'inherit' });
  const files = fs.readdirSync(destDir).filter(f => f.endsWith('.jpg')).sort();
  console.log(`Extraction complete. Extracted ${files.length} frames.`);

  // Create poster frame (first frame copy)
  if (files.length > 0) {
    const firstFrame = path.join(destDir, files[0]);
    const posterPath = path.join(publicMoonDir, 'poster.jpg');
    fs.copyFileSync(firstFrame, posterPath);
    console.log('Created poster frame at:', posterPath);
  }

  // Create manifest.json
  const manifest = {
    totalFrames: files.length,
    framePattern: 'ezgif-frame-%03d.jpg',
    format: 'jpg',
    frames: files,
    created: new Date().toISOString()
  };

  const manifestPath = path.join(publicMoonDir, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log('Created manifest at:', manifestPath);
} catch (err) {
  console.error('Error during extraction:', err);
  process.exit(1);
}
