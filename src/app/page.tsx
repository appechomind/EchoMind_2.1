'use client';

import React, { useState, useCallback } from 'react';
import { ImageGrid } from '@/components/ImageGrid/ImageGrid';
import { MediaUploader } from '@/components/MediaUploader/MediaUploader';
import { VoiceRecognition } from '@/components/VoiceRecognition/VoiceRecognition';
import { ProjectManager } from '@/components/ProjectManager/ProjectManager';
import { usePersistentStorage } from '@/hooks/usePersistentStorage';
import { MediaItem, Project } from '@/types';
import { generateId, filterMediaByProject, searchMedia } from '@/utils';
import { APP_NAME, MAGIC_TRICK_DURATION, IMAGE_PREVIEW_DURATION, THEME } from '@/constants';

export default function Home() {
  const [mediaItems, setMediaItems] = usePersistentStorage<MediaItem[]>('MEDIA_ITEMS', []);
  const [projects, setProjects] = usePersistentStorage<Project[]>('PROJECTS', []);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPerformingMagicTrick, setIsPerformingMagicTrick] = useState(false);
  const [selectedImage, setSelectedImage] = useState<MediaItem | null>(null);

  const handleUpload = useCallback((file: File) => {
    const newMediaItem: MediaItem = {
      id: generateId(),
      url: URL.createObjectURL(file),
      title: file.name,
      keywords: [],
      projectId: selectedProject,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    setMediaItems(prev => [...prev, newMediaItem]);
  }, [selectedProject, setMediaItems]);

  const handleDelete = useCallback((id: string) => {
    setMediaItems(prev => prev.filter(item => item.id !== id));
  }, [setMediaItems]);

  const handleProjectSelect = useCallback((projectId: string | null) => {
    setSelectedProject(projectId);
  }, []);

  const handleVoiceTranscript = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  const performMagicTrick = useCallback(() => {
    if (mediaItems.length === 0) return;

    setIsPerformingMagicTrick(true);
    const randomIndex = Math.floor(Math.random() * mediaItems.length);
    setSelectedImage(mediaItems[randomIndex]);

    setTimeout(() => {
      setIsPerformingMagicTrick(false);
      setSelectedImage(null);
    }, MAGIC_TRICK_DURATION);
  }, [mediaItems]);

  const filteredMedia = searchMedia(
    filterMediaByProject(mediaItems, selectedProject),
    searchQuery
  );

  return (
    <main className={`min-h-screen ${THEME.background}`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className={`text-4xl font-bold mb-8 ${THEME.textGradient}`}>
          {APP_NAME}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <ProjectManager
              projects={projects}
              selectedProject={selectedProject}
              onProjectSelect={handleProjectSelect}
              onProjectCreate={(name) => {
                const newProject: Project = {
                  id: generateId(),
                  name,
                  description: '',
                  mediaCount: 0,
                  createdAt: Date.now(),
                  updatedAt: Date.now()
                };
                setProjects(prev => [...prev, newProject]);
              }}
              onProjectDelete={(id) => {
                setProjects(prev => prev.filter(p => p.id !== id));
                if (selectedProject === id) {
                  setSelectedProject(null);
                }
              }}
            />

            <MediaUploader onUpload={handleUpload} />

            <VoiceRecognition onTranscript={handleVoiceTranscript} />

            <button
              onClick={performMagicTrick}
              disabled={isPerformingMagicTrick || mediaItems.length === 0}
              className={`w-full py-3 rounded-lg font-medium transition-all
                ${isPerformingMagicTrick || mediaItems.length === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-purple-500 hover:bg-purple-600 text-white'}`}
            >
              {isPerformingMagicTrick ? 'Performing Magic...' : 'Perform Magic Trick'}
            </button>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search media..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <ImageGrid
              mediaItems={filteredMedia}
              onImageClick={setSelectedImage}
              onDelete={handleDelete}
            />
          </div>
        </div>

        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-auto rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 