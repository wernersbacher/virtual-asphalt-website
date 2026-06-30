import fs from "fs";
import path from "path";

import sharp from "sharp";

const __dirname = path.resolve();

const publicDir = path.join(__dirname, "public");

const GALLERY_DIR = path.join(publicDir, "img", "racingGallery");
const PUBLIC_THUMB_ROOT = path.join(publicDir, "img", "thumbnails");
const OUTPUT_JSON = path.join(publicDir, "data", "racingGallery.json");

const THUMB_WIDTH = 400;

async function main(): Promise<void> {
  if (!fs.existsSync(PUBLIC_THUMB_ROOT)) {
    fs.mkdirSync(PUBLIC_THUMB_ROOT, { recursive: true });
  }

  const existingGallery = fs.existsSync(OUTPUT_JSON)
    ? (JSON.parse(fs.readFileSync(OUTPUT_JSON, "utf8")) as Array<{
        album: string;
        images: Array<{ image: string; thumbnail: string; mtime: number }>;
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
    .sort();

  const gallery: Array<{
    album: string;
    images: Array<{ image: string; thumbnail: string; mtime: number }>;
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
      .sort((a, b) => b.mtime.getTime() - a.mtime.getTime())
      .map((entry) => entry.file);
    const images = [];
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

      images.push({
        image: relImg,
        thumbnail: `/img/thumbnails/${album}/${thumbName}`,
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
