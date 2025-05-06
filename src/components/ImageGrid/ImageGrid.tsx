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
  onDelete: (mediaId: string) => void;
}

export const ImageGrid: React.FC<ImageGridProps> = ({ mediaItems, onImageClick, onDelete }) => {
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
              <div className="flex justify-between items-center">
                <p className="text-sm truncate">{item.title}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(item.id);
                  }}
                  className="p-1 text-gray-300 hover:text-red-500 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}; 