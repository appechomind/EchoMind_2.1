import React from 'react';
import { MediaItem } from '@/types';
import { formatDate } from '@/utils';

interface ImageGridProps {
  mediaItems: MediaItem[];
  onImageClick: (item: MediaItem) => void;
  onDelete: (id: string) => void;
}

export const ImageGrid: React.FC<ImageGridProps> = ({
  mediaItems,
  onImageClick,
  onDelete
}) => {
  if (mediaItems.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No media items found. Upload some files to get started!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {mediaItems.map((item) => (
        <div
          key={item.id}
          className="group relative aspect-square rounded-lg overflow-hidden bg-gray-100"
        >
          <img
            src={item.url}
            alt={item.title}
            className="w-full h-full object-cover cursor-pointer transition-transform group-hover:scale-105"
            onClick={() => onImageClick(item)}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="font-medium truncate">{item.title}</h3>
              <p className="text-sm text-gray-200">
                Added {formatDate(item.createdAt)}
              </p>
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(item.id);
              }}
              className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-full text-white hover:bg-red-500 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}; 