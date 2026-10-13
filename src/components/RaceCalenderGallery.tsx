import { useEffect, useState } from "react";

function getGalleryList() {
  return fetch("/data/calenderGallery.json")
    .then((res) => (res.ok ? res.json() : []))
    .catch(() => []);
}

export default function RaceCalendarGallery() {
  const [gallery, setGallery] = useState<
    Array<{ name: string; img: string; web?: string; description: string; mtime?: number }>
  >([]);

  useEffect(() => {
    getGalleryList().then((data) => {
      if (!Array.isArray(data)) return setGallery([]);
      setGallery(
        data.toSorted((a, b) => {
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
      {gallery.map(({ name, img, web, description }, idx) => (
        <div key={name} className="flex flex-col items-center">
          <a href={img} target="_blank" rel="noopener noreferrer" className="w-full">
            <img
              src={web ?? img}
              alt={description || name}
              className="w-full mx-auto h-auto object-contain"
              loading={idx === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          </a>
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
