#!/usr/bin/env node
// Konvertatsiya: public/images ichidagi katta JPG/PNG -> WebP (asl saqlanadi).
// Ishga tushirish: node scripts/optimize-images.js [minBytes]
// Default minBytes = 500000 (500 KB).

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..', 'public', 'images');
const MIN = Number(process.argv[2] || 500_000);

async function walk(dir) {
  const items = await fs.promises.readdir(dir, { withFileTypes: true });
  const tasks = [];
  for (const item of items) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) tasks.push(walk(full));
    else if (/\.(jpe?g|png)$/i.test(item.name)) {
      const stat = await fs.promises.stat(full);
      if (stat.size < MIN) continue;
      const out = full.replace(/\.(jpe?g|png)$/i, '.webp');
      if (fs.existsSync(out)) continue;
      tasks.push(
        sharp(full)
          .webp({ quality: 82 })
          .toFile(out)
          .then(() => {
            const newSize = fs.statSync(out).size;
            console.log(
              `${path.relative(ROOT, full)}  ${(stat.size / 1024).toFixed(0)}KB -> ${(newSize / 1024).toFixed(0)}KB`,
            );
          })
          .catch((e) => console.error('FAIL', full, e.message)),
      );
    }
  }
  await Promise.all(tasks);
}

walk(ROOT).then(() => console.log('Done.'));
