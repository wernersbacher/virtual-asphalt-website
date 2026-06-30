import { useEffect, useState } from "react";

function getGalleryList() {
  return fetch("/data/calenderGallery.json")
    .then((res) => (res.ok ? res.json() : []))
    .catch(() => []);
}

export default function RaceCalendarGallery() {
  const [gallery, setGallery] = useState<
    Array<{ name: string; img: string; description: string; mtime?: number }>
  >([]);

  useEffect(() => {
    getGalleryList().then((data) => {
      if (!Array.isArray(data)) return setGallery([]);
      setGallery(
        data.sort((a: any, b: any) => {
          const am = a.mtime ?? 0;
          const bm = b.mtime ?? 0;
          if (bm !== am) return bm - am;
          return b.name.localeCompare(a.name);
        })
      );
    });
  }, []);

  return (
    <div className="flex flex-col gap-8">
      {gallery.map(({ name, img, description }) => (
        <div key={name} className="flex flex-col items-center">
          <img src={img} alt={name} className="w-full mx-auto h-auto object-contain" />
          <div className="p-4 w-full mx-auto">
            <h2 className="text-xl font-semibold mb-2 capitalize">
              {description}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
}
