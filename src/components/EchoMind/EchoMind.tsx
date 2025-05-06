import React, { useState, useCallback } from 'react';
import { ImageGrid } from '../ImageGrid/ImageGrid';
import { MediaUploader } from '../MediaUploader/MediaUploader';
import { VoiceRecognition } from '../VoiceRecognition/VoiceRecognition';
import { ProjectManager } from '../ProjectManager/ProjectManager';
import { usePersistentStorage } from '@/hooks/usePersistentStorage';
import { MediaItem, Project } from '@/types';
import { generateId, filterMediaByProject, searchMedia } from '@/utils';
import { APP_NAME, MAGIC_TRICK_DURATION, THEME } from '@/constants';

interface EchoMindProps {
  className?: string;
  onMediaSelect?: (media: MediaItem) => void;
  onProjectSelect?: (project: Project | null) => void;
}

export const EchoMind: React.FC<EchoMindProps> = ({
  className = '',
  onMediaSelect,
  onProjectSelect
}) => {
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
      projectId: selectedProject || undefined,
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
    if (onProjectSelect) {
      const project = projectId ? projects.find(p => p.id === projectId) || null : null;
      onProjectSelect(project);
    }
  }, [projects, onProjectSelect]);

  const handleVoiceTranscript = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  const handleImageClick = useCallback((item: MediaItem) => {
    setSelectedImage(item);
    if (onMediaSelect) {
      onMediaSelect(item);
    }
  }, [onMediaSelect]);

  const performMagicTrick = useCallback(() => {
    if (mediaItems.length === 0) return;

    setIsPerformingMagicTrick(true);
    const randomIndex = Math.floor(Math.random() * mediaItems.length);
    const randomMedia = mediaItems[randomIndex];
    setSelectedImage(randomMedia);
    if (onMediaSelect) {
      onMediaSelect(randomMedia);
    }

    setTimeout(() => {
      setIsPerformingMagicTrick(false);
      setSelectedImage(null);
    }, MAGIC_TRICK_DURATION);
  }, [mediaItems, onMediaSelect]);

  const filteredMedia = searchMedia(
    filterMediaByProject(mediaItems, selectedProject),
    searchQuery
  );

  return (
    <div className={`bg-slate-900 ${className}`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
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
              onImageClick={handleImageClick}
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
    </div>
  );
}; 