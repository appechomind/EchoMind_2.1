'use client';

import React, { useState, useEffect } from 'react';
import { MAGIC_TRICK_DURATION } from '../../constants';

export function MagicTrick({ items, onComplete }) {
  const [isActive, setIsActive] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (isActive && items.length > 0) {
      const randomIndex = Math.floor(Math.random() * items.length);
      setSelectedItem(items[randomIndex]);

      const timer = setTimeout(() => {
        setIsActive(false);
        setSelectedItem(null);
        onComplete?.();
      }, MAGIC_TRICK_DURATION);

      return () => clearTimeout(timer);
    }
  }, [isActive, items, onComplete]);

  const startMagicTrick = () => {
    if (items.length === 0) return;
    setIsActive(true);
  };

  return (
    <div className="relative">
      <button
        onClick={startMagicTrick}
        disabled={isActive || items.length === 0}
        className={`px-4 py-2 rounded-lg transition-all transform
          ${isActive
            ? 'bg-purple-600 text-white scale-105'
            : items.length === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-purple-500 text-white hover:bg-purple-600 hover:scale-105'
          }`}
      >
        {isActive ? '✨ Magic in Progress...' : '🎩 Magic Trick'}
      </button>

      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 animate-fade-in">
          <div className="max-w-4xl max-h-[90vh] p-4 transform scale-100 animate-zoom-in">
            <img
              src={selectedItem.url}
              alt={selectedItem.title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="mt-4 text-center text-white">
              <h3 className="text-xl font-bold">{selectedItem.title}</h3>
              <p className="text-sm text-gray-300">✨ Magic Trick ✨</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 