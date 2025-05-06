import React, { useState } from 'react';

interface MediaUploaderProps {
  onUpload: (file: File, keywords: string) => void;
}

export const MediaUploader: React.FC<MediaUploaderProps> = ({ onUpload }) => {
  const [keywords, setKeywords] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && keywords) {
      onUpload(file, keywords);
      setKeywords('');
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Keywords (comma-separated)
        </label>
        <input
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          placeholder="e.g., apple pie, dessert, food"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Upload Media
        </label>
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="mt-1 block w-full"
        />
      </div>
    </div>
  );
}; 