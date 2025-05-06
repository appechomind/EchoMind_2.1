'use client';

import React, { useState } from 'react';
import { formatDate } from '../../utils';

export function ImageGrid({ items, onDelete }) {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100"
        >
          <img
            src={item.url}
            alt={item.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
            onClick={() => setSelectedItem(item)}
          />
          
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity">
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <h3 className="text-sm font-medium truncate">{item.title}</h3>
              <p className="text-xs text-gray-200">
                Added {formatDate(item.createdAt)}
              </p>
            </div>
            
            <button
              onClick={() => onDelete(item.id)}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      ))}

      {selectedItem && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setSelectedItem(null)}
        >
          <div className="max-w-4xl max-h-[90vh] p-4">
            <img
              src={selectedItem.url}
              alt={selectedItem.title}
              className="max-w-full max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
} 