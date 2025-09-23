// Vite import.meta.glob for static asset import
const images = {
  ...import.meta.glob('../img/rennkalender/*.jpg', { eager: true, as: 'url' }),
  ...import.meta.glob('../img/rennkalender/*.png', { eager: true, as: 'url' }),
};
const descriptions = import.meta.glob('../img/rennkalender/*.txt', {
  eager: true,
  as: 'raw',
});

// Build gallery data: [{ name, img, description }]
function getGalleryData() {
  // Get all image file names (without extension)
  const imageEntries = Object.entries(images);
  return imageEntries
    .map(([imgPath, imgUrl]) => {
      // Extract base name (e.g., 'wald') for .jpg or .png
      const match = imgPath.match(/([\w-]+)\.(jpg|png)$/);
      const base = match?.[1] || '';
      // Find matching description (key must match import.meta.glob pattern)
      const descKey = `../img/rennkalender/${base}.txt`;
      const rawDesc = descriptions[descKey];
      const description = typeof rawDesc === 'string' ? rawDesc.trim() : '';
      return { name: base, img: imgUrl, description };
    })
    .sort((a, b) => b.name.localeCompare(a.name));
}

export default function RaceCalendarGallery() {
  const gallery = getGalleryData();
  return (
    <div className="flex flex-col gap-8">
      {gallery.map(({ name, img, description }) => (
        <div key={name} className="flex flex-col items-center">
          <img
            src={img}
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
