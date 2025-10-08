import { useEffect, useState } from "react";

function getGalleryList() {
  return fetch("/calenderGallery.json")
    .then((res) => (res.ok ? res.json() : []))
    .catch(() => []);
}

export default function LatestRaceCalendarImage() {
  const [latest, setLatest] = useState<{
    name: string;
    img: string;
    description: string;
  } | null>(null);

  useEffect(() => {
    getGalleryList().then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        // Sortiere nach Name absteigend und nimm das erste Element
        const sorted = data.sort((a, b) => b.name.localeCompare(a.name));
        setLatest(sorted[0]);
      }
    });
  }, []);

  if (!latest) return null;

  return (
    <div className="flex flex-col items-center gap-2">
      <img
        src={"/img/raceCalender/" + latest.img}
        alt={latest.name}
        className="w-full max-w-md mx-auto h-auto object-contain rounded shadow"
      />
      <div className="p-2 w-full mx-auto text-center">
        <h2 className="text-lg font-semibold mb-1 capitalize">
          {latest.description}
        </h2>
      </div>
    </div>
  );
}
