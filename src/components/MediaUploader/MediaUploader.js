'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from '../../constants';

export function MediaUploader({ onUpload }) {
  const onDrop = useCallback((acceptedFiles) => {
    onUpload(acceptedFiles);
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILE_TYPES,
    maxSize: MAX_FILE_SIZE,
  });

  return (
    <div
      {...getRootProps()}
      className={`flex-1 p-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors
        ${isDragActive
          ? 'border-purple-500 bg-purple-50'
          : 'border-gray-300 hover:border-purple-500 hover:bg-purple-50'
        }`}
    >
      <input {...getInputProps()} />
      <div className="space-y-2">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <div className="text-sm text-gray-600">
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>
              Drag & drop files here, or click to select files
              <br />
              <span className="text-xs text-gray-500">
                (Max size: 10MB)
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
} 