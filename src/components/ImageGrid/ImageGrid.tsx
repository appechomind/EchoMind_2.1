import React from 'react';

interface ImageGridProps {
  images: Array<{
    id: string;
    url: string;
    title: string;
  }>;
}

export const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {images.map((image) => (
        <div key={image.id} className="relative aspect-square">
          <img
            src={image.url}
            alt={image.title}
            className="object-cover w-full h-full rounded-lg"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg">
            {image.title}
          </div>
        </div>
      ))}
    </div>
  );
}; 