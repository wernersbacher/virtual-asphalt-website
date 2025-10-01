// build-gallery.js
// Node.js-Skript: Generiert Thumbnails und eine JSON-Liste aller Bilder für die Galerie

import fs from "fs";
import path from "path";

import sharp from "sharp";

const __dirname = path.resolve();

const publicDir = path.join(__dirname, "public");

const GALLERY_DIR = path.join(publicDir, "img", "racingGallery");
const PUBLIC_THUMB_ROOT = path.join(publicDir, "img", "thumbnails");
const OUTPUT_JSON = path.join(publicDir, "racingGallery.json");

const THUMB_WIDTH = 400;

async function main(): Promise<void> {
  if (!fs.existsSync(PUBLIC_THUMB_ROOT)) {
    fs.mkdirSync(PUBLIC_THUMB_ROOT, { recursive: true });
  }

  // Get all album directories
  const albums = fs.readdirSync(GALLERY_DIR).filter((name) => {
    const fullPath = path.join(GALLERY_DIR, name);
    return fs.statSync(fullPath).isDirectory();
  });

  const gallery: Array<{
    album: string;
    images: Array<{ image: string; thumbnail: string }>;
  }> = [];

  for (const album of albums) {
    const albumDir = path.join(GALLERY_DIR, album);
    const thumbAlbumDir = path.join(PUBLIC_THUMB_ROOT, album);
    if (!fs.existsSync(thumbAlbumDir)) {
      fs.mkdirSync(thumbAlbumDir, { recursive: true });
    }
    const files = fs
      .readdirSync(albumDir)
      .filter((file) => /(jpg|jpeg|png)$/i.test(file));
    // Sort files by mtime (newest first)
    const filesSorted = files
      .map((file) => {
        const imgPath = path.join(albumDir, file);
        const stat = fs.statSync(imgPath);
        return { file, mtime: stat.mtime };
      })
      .sort((a, b) => b.mtime.getTime() - a.mtime.getTime())
      .map((entry) => entry.file);
    const images = [];
    for (const file of filesSorted) {
      const imgPath = path.join(albumDir, file);
      const relImg = `/img/racingGallery/${album}/${file}`;
      const thumbName = `${file.replace(/\.(jpg|jpeg|png)$/i, "_thumb.jpg")}`;
      const thumbPath = path.join(thumbAlbumDir, thumbName);
      await sharp(imgPath)
        .resize({ width: THUMB_WIDTH })
        .jpeg({ quality: 80 })
        .toFile(thumbPath);
      images.push({
        image: relImg,
        thumbnail: `/img/thumbnails/${album}/${thumbName}`,
      });
    }
    gallery.push({ album, images });
  }

  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(gallery, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
