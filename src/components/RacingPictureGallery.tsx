import React, { useState, useEffect, useRef } from "react";

import { Button } from "./ui/button";

type GalleryImage = {
  image: string;
  thumbnail: string;
  album: string;
};
type Album = {
  album: string;
  images: GalleryImage[];
};

const RacingPictureGallery: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [albumFilter, setAlbumFilter] = useState<string>("All");
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const [imgLoading, setImgLoading] = useState(false);
  const prevIdxRef = useRef<number | null>(null);

  // Load gallery.json on mount
  useEffect(() => {
    fetch("/racingGallery.json")
      .then((res) => res.json())
      .then((data: Album[]) => {
        setAlbums(data);
        setImages(
          data.flatMap((a) =>
            a.images.map((img) => ({ ...img, album: a.album }))
          )
        );
      });
  }, []);

  // Update images when albumFilter changes
  useEffect(() => {
    if (albumFilter === "All") {
      setImages(
        albums.flatMap((a) =>
          a.images.map((img) => ({ ...img, album: a.album }))
        )
      );
    } else {
      const album = albums.find((a) => a.album === albumFilter);
      setImages(
        album ? album.images.map((img) => ({ ...img, album: album.album })) : []
      );
    }
    setSelectedIdx(null);
  }, [albumFilter, albums]);

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

  useEffect(() => {
    if (selectedIdx !== null && prevIdxRef.current !== selectedIdx) {
      setImgLoading(true);
      prevIdxRef.current = selectedIdx;
    }
  }, [selectedIdx]);

  const albumNames = ["All", ...albums.map((a) => a.album)];
  const selected = selectedIdx !== null ? images[selectedIdx] : null;

  // Set loading state when selectedIdx changes
  useEffect(() => {
    if (selectedIdx !== null && prevIdxRef.current !== selectedIdx) {
      setImgLoading(true);
      prevIdxRef.current = selectedIdx;
    }
  }, [selectedIdx]);

  // Reset selection if filter changes
  useEffect(() => {
    setSelectedIdx(null);
  }, [albumFilter]);

  return (
    <div>
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {albumNames.map((album) => (
          <Button
            className="cursor-pointer"
            key={album}
            variant={albumFilter === album ? "default" : "ghost"}
            onClick={() => setAlbumFilter(album)}
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
            className="focus:outline-none"
            onClick={() => setSelectedIdx(idx)}
          >
            <img
              src={img.thumbnail}
              alt="Thumbnail"
              className="aspect-square object-cover w-full h-full rounded shadow hover:scale-105 transition-transform duration-200"
              loading="lazy"
            />
          </button>
        ))}
      </div>
      {/* Modal for fullscreen image */}
      {selected && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={() => setSelectedIdx(null)}
        >
          <div
            className="relative w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-white text-2xl bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-80 cursor-pointer"
              onClick={() => setSelectedIdx(null)}
              aria-label="Close"
            >
              &times;
            </button>
            {/* Prev/Next arrows for desktop */}
            {selectedIdx !== null && selectedIdx > 0 && (
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-3xl bg-black bg-opacity-40 rounded-full p-2 hover:bg-opacity-80 cursor-pointer"
                onClick={() =>
                  setSelectedIdx(selectedIdx !== null ? selectedIdx - 1 : 0)
                }
                aria-label="Vorheriges Bild"
              >
                &#8592;
              </button>
            )}
            {selectedIdx !== null && selectedIdx < images.length - 1 && (
              <button
                className="absolute right-10 top-1/2 -translate-y-1/2 text-white text-3xl bg-black bg-opacity-40 rounded-full p-2 hover:bg-opacity-80 cursor-pointer"
                onClick={() =>
                  setSelectedIdx(selectedIdx !== null ? selectedIdx + 1 : 0)
                }
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
                src={selected.image}
                alt="Großansicht"
                className={`w-full h-auto max-h-[80vh] object-contain rounded shadow-lg select-none ${imgLoading ? "hidden" : ""}`}
                draggable={false}
                onLoad={() => setImgLoading(false)}
              />
            </div>
            <div className="text-white text-center mt-2">
              {selected.image.split("/").pop()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RacingPictureGallery;
