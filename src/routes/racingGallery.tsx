import { createFileRoute } from "@tanstack/react-router";

import RacingPictureGallery from "../components/RacingPictureGallery";

export const Route = createFileRoute("/racingGallery")({
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold text-center mb-8 drop-shadow-lg text-primary">
        Racing Gallery
      </h1>
      <RacingPictureGallery />
    </div>
  );
}
