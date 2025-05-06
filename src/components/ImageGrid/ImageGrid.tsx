import React from 'react';

interface MediaItem {
  id: string;
  url: string;
  title: string;
  keywords: string[];
  projectId?: string;
}

interface ImageGridProps {
  mediaItems: MediaItem[];
  onImageClick: (item: MediaItem) => void;
}

export const ImageGrid: React.FC<ImageGridProps> = ({ mediaItems, onImageClick }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {mediaItems.map((item) => (
        <div
          key={item.id}
          className="relative group cursor-pointer"
          onClick={() => onImageClick(item)}
        >
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src={item.url}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 rounded-lg">
            <div className="absolute bottom-0 left-0 right-0 p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-sm truncate">{item.title}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}; 