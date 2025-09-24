// Dieses Skript durchsucht das Verzeichnis public/img/rennkalender nach .jpg/.png und .txt-Dateien und erzeugt eine gallery.json
// Ausführen mit: npx ts-node build-calender.ts

import fs from "fs";
import path from "path";

const __dirname = path.resolve();
const publicDir = path.join(__dirname, "public");

const imgFiles = path.join(publicDir, "img", "raceCalender");
const outFile = path.join(publicDir, "calenderGallery.json");

function getFiles(): string[] {
  return fs.readdirSync(imgFiles).filter((f) => /\.(jpg|png)$/i.test(f));
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
}

function buildGallery(): void {
  const images = getFiles();
  const gallery: GalleryEntry[] = images.map((img) => {
    const base = img.replace(/\.(jpg|png)$/i, "");
    return {
      name: base,
      img,
      description: getDescription(base),
    };
  });
  // Sortiere absteigend nach name
  gallery.sort((a, b) => b.name.localeCompare(a.name));
  fs.writeFileSync(outFile, JSON.stringify(gallery, null, 2), "utf8");
}

buildGallery();
