import React, { useState, useEffect, useMemo, useRef } from "react";

import { Button } from "./ui/button";

type GalleryImage = {
  image: string;
  thumbnail: string;
  large?: string;
  album: string;
  mtime?: number;
};
type Album = {
  album: string;
  images: GalleryImage[];
};

function formatImageDate(mtime?: number) {
  if (!mtime) return null;
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(mtime));
}

const RacingPictureGallery: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [albumFilter, setAlbumFilter] = useState<string>("All");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  // Source of the last fully loaded fullscreen image
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);

  // Load gallery.json on mount
  useEffect(() => {
    fetch("/data/racingGallery.json")
      .then((res) => res.json())
      .then((data: Album[]) => setAlbums(data));
  }, []);

  // Images of the selected album (or all albums), sorted by mtime descending
  const images = useMemo<GalleryImage[]>(
    () =>
      albums
        .filter((a) => albumFilter === "All" || a.album === albumFilter)
        .flatMap((a) => a.images.map((img) => ({ ...img, album: a.album })))
        .toSorted((a, b) => (b.mtime ?? 0) - (a.mtime ?? 0)),
    [albums, albumFilter]
  );

  const selectAlbum = (album: string) => {
    setAlbumFilter(album);
    setSelectedIdx(null);
  };

  // Keyboard navigation and ESC close
  useEffect(() => {
    if (selectedIdx === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIdx(null);
      if (e.key === "ArrowRight")
        setSelectedIdx((idx) =>
          idx !== null && idx < images.length - 1 ? idx + 1 : idx
        );
      if (e.key === "ArrowLeft")
        setSelectedIdx((idx) => (idx !== null && idx > 0 ? idx - 1 : idx));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIdx, images.length]);

  // Preload the neighbouring images so prev/next feels instant
  useEffect(() => {
    if (selectedIdx === null) return;
    for (const neighbour of [images[selectedIdx - 1], images[selectedIdx + 1]]) {
      if (neighbour) new Image().src = neighbour.large ?? neighbour.image;
    }
  }, [selectedIdx, images]);

  // Touch swipe navigation
  useEffect(() => {
    if (selectedIdx === null) return;
    const modal = modalRef.current;
    if (!modal) return;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX.current = e.changedTouches[0].clientX;
      if (touchStartX.current !== null && touchEndX.current !== null) {
        const dx = touchEndX.current - touchStartX.current;
        if (dx > 50 && selectedIdx > 0) setSelectedIdx(selectedIdx - 1); // swipe right
        if (dx < -50 && selectedIdx < images.length - 1)
          setSelectedIdx(selectedIdx + 1); // swipe left
      }
      touchStartX.current = null;
      touchEndX.current = null;
    };
    modal.addEventListener("touchstart", handleTouchStart);
    modal.addEventListener("touchend", handleTouchEnd);
    return () => {
      modal.removeEventListener("touchstart", handleTouchStart);
      modal.removeEventListener("touchend", handleTouchEnd);
    };
  }, [selectedIdx, images.length]);

  // Albums sorted by their most recent image, newest first
  const albumNames = useMemo(() => {
    const latest = (a: Album) => Math.max(0, ...a.images.map((img) => img.mtime ?? 0));
    return ["All", ...albums.toSorted((a, b) => latest(b) - latest(a)).map((a) => a.album)];
  }, [albums]);
  const selected = selectedIdx !== null ? images[selectedIdx] : null;
  const selectedSrc = selected ? (selected.large ?? selected.image) : null;
  const imgLoading = selected !== null && loadedSrc !== selectedSrc;

  return (
    <div>
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {albumNames.map((album) => (
          <Button
            className="cursor-pointer"
            key={album}
            variant={albumFilter === album ? "default" : "ghost"}
            onClick={() => selectAlbum(album)}
          >
            {album.replace(/_/g, " ")}
          </Button>
        ))}
      </div>
      {/* Portfolio grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((img, idx) => (
          <button
            key={img.thumbnail + idx}
            className="focus:outline-none cursor-pointer"
            onClick={() => setSelectedIdx(idx)}
          >
            <img
              src={img.thumbnail}
              alt={img.image.split("/").pop()}
              className="aspect-square object-cover w-full h-full rounded shadow hover:scale-105 transition-transform duration-200"
              loading="lazy"
              decoding="async"
            />
          </button>
        ))}
      </div>
      {/* Modal for fullscreen image */}
      {selected && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setSelectedIdx(null)}
        >
          {/* Clicks on the dark backdrop bubble up and close the lightbox; image, buttons and caption stop them */}
          <div className="relative w-full mx-4">
            <button
              className="absolute top-2 right-2 text-white text-2xl bg-black/50 rounded-full p-2 hover:bg-black/80 cursor-pointer"
              onClick={() => setSelectedIdx(null)}
              aria-label="Close"
            >
              &times;
            </button>
            {/* Prev/Next arrows for desktop */}
            {selectedIdx !== null && selectedIdx > 0 && (
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-3xl bg-black/40 rounded-full p-2 hover:bg-black/80 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIdx(selectedIdx - 1);
                }}
                aria-label="Vorheriges Bild"
              >
                &#8592;
              </button>
            )}
            {selectedIdx !== null && selectedIdx < images.length - 1 && (
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-3xl bg-black/40 rounded-full p-2 hover:bg-black/80 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIdx(selectedIdx + 1);
                }}
                aria-label="Nächstes Bild"
              >
                &#8594;
              </button>
            )}
            {/* Loader or image */}
            <div className="flex items-center justify-center min-h-[40vh] max-h-[80vh]">
              {imgLoading && (
                <div className="flex flex-col items-center w-full">
                  <div
                    className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"
                    style={{ borderColor: "#fff #888 #fff #888" }}
                  />
                  <span className="text-white">Bild wird geladen ...</span>
                </div>
              )}
              <img
                src={selected.large ?? selected.image}
                alt="Großansicht"
                className={`max-w-full h-auto max-h-[80vh] object-contain rounded shadow-lg select-none ${imgLoading ? "hidden" : ""}`}
                draggable={false}
                onClick={(e) => e.stopPropagation()}
                onLoad={() => setLoadedSrc(selectedSrc)}
              />
            </div>
            <div
              className="text-white text-center mt-2 space-y-1"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                {selected.image.split("/").pop()}
                {" · "}
                <a
                  href={selected.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-gray-300 hover:text-white"
                >
                  Original
                </a>
              </div>
              {selected.mtime ? (
                <div className="text-sm text-gray-300">
                  {formatImageDate(selected.mtime)}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RacingPictureGallery;
