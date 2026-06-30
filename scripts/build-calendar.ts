// Dieses Skript durchsucht das Verzeichnis public/img/rennkalender nach .jpg/.png und .txt-Dateien und erzeugt eine gallery.json
// Ausführen mit: npx ts-node build-calender.ts

import fs from "fs";
import path from "path";

const __dirname = path.resolve();
const publicDir = path.join(__dirname, "public");

const imgFiles = path.join(publicDir, "img", "raceCalender");
const outFile = path.join(publicDir, "data", "calenderGallery.json");

const existingGallery: GalleryEntry[] = fs.existsSync(outFile)
  ? JSON.parse(fs.readFileSync(outFile, "utf8"))
  : [];

const existingMtimeByName = new Map<string, number>();
for (const entry of existingGallery) {
  if (entry.mtime) {
    existingMtimeByName.set(entry.name, entry.mtime);
  }
}

function getFiles(): string[] {
  return fs.readdirSync(imgFiles).filter((f) => /\.(jpg|png)$/i.test(f)).sort();
}

function getDescription(base: string): string {
  const txtFile = path.join(imgFiles, base + ".txt");
  if (fs.existsSync(txtFile)) {
    return fs.readFileSync(txtFile, "utf8").trim();
  }
  return "";
}

interface GalleryEntry {
  name: string;
  img: string;
  description: string;
  mtime?: number;
}

function buildGallery(): void {
  const images = getFiles();
  const gallery: GalleryEntry[] = images
    .map((img) => {
      const base = img.replace(/\.(jpg|png)$/i, "");
      const imgPath = path.join(imgFiles, img);
      const existingMtime = existingMtimeByName.get(base);
      let mtime: number | undefined;
      try {
        const stat = fs.statSync(imgPath);
        mtime = existingMtime ?? stat.mtime.getTime();
      } catch {
        mtime = existingMtime;
      }
      return {
        name: base,
        img: `/img/raceCalender/${img}`,
        description: getDescription(base),
        mtime,
      };
    })
    // Sortiere absteigend nach mtime (neueste zuerst). Falls kein mtime vorhanden, fallback auf name.
    .sort((a, b) => {
      const am = a.mtime ?? 0;
      const bm = b.mtime ?? 0;
      if (bm !== am) return bm - am;
      return b.name.localeCompare(a.name);
    });

  // Ensure output directory exists
  const outDir = path.dirname(outFile);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const galleryJson = JSON.stringify(gallery, null, 2);
  if (!fs.existsSync(outFile) || fs.readFileSync(outFile, "utf8") !== galleryJson) {
    fs.writeFileSync(outFile, galleryJson, "utf8");
  }
}

buildGallery();
