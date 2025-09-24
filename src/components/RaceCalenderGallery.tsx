import { useEffect, useState } from "react";

// Hilfsfunktion, um alle Bildnamen und Beschreibungen zu generieren
function getGalleryList() {
  // Die Dateinamen sind nicht dynamisch im Build bekannt, daher hier statisch pflegen oder per gallery.json laden
  // Alternativ: gallery.json in public/img/rennkalender/ mit [{name, img, description}] bereitstellen
  // Hier: Wir lesen gallery.json, falls vorhanden
  return fetch("/calenderGallery.json")
    .then((res) => (res.ok ? res.json() : []))
    .catch(() => []);
}

export default function RaceCalendarGallery() {
  const [gallery, setGallery] = useState<
    Array<{ name: string; img: string; description: string }>
  >([]);

  useEffect(() => {
    getGalleryList().then((data) => {
      setGallery(
        Array.isArray(data)
          ? data.sort((a, b) => b.name.localeCompare(a.name))
          : []
      );
    });
  }, []);

  return (
    <div className="flex flex-col gap-8">
      {gallery.map(({ name, img, description }) => (
        <div key={name} className="flex flex-col items-center">
          <img
            src={"/img/raceCalender/" + img}
            alt={name}
            className="w-full mx-auto h-auto object-contain"
          />
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
