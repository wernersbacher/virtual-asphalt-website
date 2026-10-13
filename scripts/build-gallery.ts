import fs from "fs";
import path from "path";

import sharp from "sharp";

const rootDir = path.resolve();

const publicDir = path.join(rootDir, "public");

const GALLERY_DIR = path.join(publicDir, "img", "racingGallery");
const PUBLIC_THUMB_ROOT = path.join(publicDir, "img", "thumbnails");
// Web-optimized variants for the lightbox; the originals are often 5k screenshots with 5-9 MB
const PUBLIC_LARGE_ROOT = path.join(publicDir, "img", "large", "racingGallery");
const OUTPUT_JSON = path.join(publicDir, "data", "racingGallery.json");

const THUMB_WIDTH = 400;
const LARGE_WIDTH = 1920;

type GalleryImage = { image: string; thumbnail: string; large: string; mtime: number };

async function main(): Promise<void> {
  if (!fs.existsSync(PUBLIC_THUMB_ROOT)) {
    fs.mkdirSync(PUBLIC_THUMB_ROOT, { recursive: true });
  }

  const existingGallery = fs.existsSync(OUTPUT_JSON)
    ? (JSON.parse(fs.readFileSync(OUTPUT_JSON, "utf8")) as Array<{
        album: string;
        images: Array<GalleryImage>;
      }>)
    : [];

  const existingMtimeByImage = new Map<string, number>();
  for (const album of existingGallery) {
    for (const image of album.images) {
      existingMtimeByImage.set(image.image, image.mtime);
    }
  }

  // Get all album directories
  const albums = fs
    .readdirSync(GALLERY_DIR)
    .filter((name) => {
      const fullPath = path.join(GALLERY_DIR, name);
      return fs.statSync(fullPath).isDirectory();
    })
    .toSorted();

  const gallery: Array<{ album: string; images: Array<GalleryImage> }> = [];

  for (const album of albums) {
    const albumDir = path.join(GALLERY_DIR, album);
    const thumbAlbumDir = path.join(PUBLIC_THUMB_ROOT, album);
    const largeAlbumDir = path.join(PUBLIC_LARGE_ROOT, album);
    fs.mkdirSync(thumbAlbumDir, { recursive: true });
    fs.mkdirSync(largeAlbumDir, { recursive: true });
    const files = fs
      .readdirSync(albumDir)
      .filter((file) => /(jpg|jpeg|png)$/i.test(file));
    // Sort files by committed mtime when available, otherwise fallback to the current filesystem mtime.
    const filesSorted = files
      .map((file) => {
        const relImg = `/img/racingGallery/${album}/${file}`;
        const imgPath = path.join(albumDir, file);
        const stat = fs.statSync(imgPath);
        const existingMtime = existingMtimeByImage.get(relImg);
        return {
          file,
          mtime: existingMtime ? new Date(existingMtime) : stat.mtime,
        };
      })
      .toSorted((a, b) => b.mtime.getTime() - a.mtime.getTime())
      .map((entry) => entry.file);
    const images: Array<GalleryImage> = [];
    for (const file of filesSorted) {
      const imgPath = path.join(albumDir, file);
      const stat = fs.statSync(imgPath);
      const relImg = `/img/racingGallery/${album}/${file}`;
      const thumbName = `${file.replace(/\.(jpg|jpeg|png)$/i, "_thumb.jpg")}`;
      const thumbPath = path.join(thumbAlbumDir, thumbName);

      if (!fs.existsSync(thumbPath)) {
        await sharp(imgPath)
          .resize({ width: THUMB_WIDTH })
          .jpeg({ quality: 80 })
          .toFile(thumbPath);
      }

      const largeName = file.replace(/\.(jpg|jpeg|png)$/i, ".webp");
      const largePath = path.join(largeAlbumDir, largeName);
      if (!fs.existsSync(largePath)) {
        await sharp(imgPath)
          .resize({ width: LARGE_WIDTH, withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(largePath);
      }

      images.push({
        image: relImg,
        thumbnail: `/img/thumbnails/${album}/${thumbName}`,
        large: `/img/large/racingGallery/${album}/${largeName}`,
        mtime: existingMtimeByImage.get(relImg) ?? stat.mtime.getTime(),
      });
    }
    gallery.push({ album, images });
  }

  // Ensure the data directory exists before writing the JSON file
  const outputJsonDir = path.dirname(OUTPUT_JSON);
  if (!fs.existsSync(outputJsonDir)) {
    fs.mkdirSync(outputJsonDir, { recursive: true });
  }

  const galleryJson = JSON.stringify(gallery, null, 2);
  if (!fs.existsSync(OUTPUT_JSON) || fs.readFileSync(OUTPUT_JSON, "utf8") !== galleryJson) {
    fs.writeFileSync(OUTPUT_JSON, galleryJson);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
