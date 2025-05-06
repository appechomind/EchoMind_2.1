'use client';

import { useState } from 'react';
import { ImageGrid } from '@/components/ImageGrid/ImageGrid';
import { MediaUploader } from '@/components/MediaUploader/MediaUploader';
import { VoiceRecognition } from '@/components/VoiceRecognition/VoiceRecognition';
import { ProjectManager } from '@/components/ProjectManager/ProjectManager';
import { usePersistentStorage } from '@/hooks/usePersistentStorage';

interface MediaItem {
  id: string;
  url: string;
  title: string;
  keywords: string[];
  projectId?: string;
}

export default function Home() {
  const [mediaItems, setMediaItems] = usePersistentStorage<MediaItem[]>('mediaItems', []);
  const [currentProject, setCurrentProject] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPerformingTrick, setIsPerformingTrick] = useState(false);
  const [selectedImage, setSelectedImage] = useState<MediaItem | null>(null);

  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const newItem: MediaItem = {
        id: Date.now().toString(),
        url: e.target?.result as string,
        title: file.name,
        keywords: [],
        projectId: currentProject || undefined
      };
      setMediaItems(prev => [...prev, newItem]);
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteMedia = (mediaId: string) => {
    setMediaItems(prev => prev.filter(item => item.id !== mediaId));
  };

  const handleSpeechResult = (result: string) => {
    setSearchQuery(result);
    if (result.toLowerCase().includes('magic')) {
      performMagicTrick();
    }
  };

  const performMagicTrick = () => {
    if (mediaItems.length === 0) return;
    
    setIsPerformingTrick(true);
    const randomIndex = Math.floor(Math.random() * mediaItems.length);
    const selected = mediaItems[randomIndex];
    setSelectedImage(selected);

    // Reset after animation
    setTimeout(() => {
      setIsPerformingTrick(false);
      setSelectedImage(null);
    }, 3000);
  };

  const handleProjectSelect = (projectId: string) => {
    setCurrentProject(projectId);
  };

  const filteredMedia = mediaItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesProject = !currentProject || item.projectId === currentProject;
    return matchesSearch && matchesProject;
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
          EchoMind 2.1 - Magic Photo Gallery
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl">
              <h2 className="text-2xl font-semibold mb-4">Project Manager</h2>
              <ProjectManager onProjectSelect={handleProjectSelect} />
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl">
              <h2 className="text-2xl font-semibold mb-4">Upload Media</h2>
              <MediaUploader onUpload={handleUpload} />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl">
              <h2 className="text-2xl font-semibold mb-4">Voice Control</h2>
              <VoiceRecognition onSpeechResult={handleSpeechResult} />
              <p className="mt-4 text-sm text-gray-300">
                Say "magic" to perform a trick!
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl">
              <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
              <div className="relative">
                {isPerformingTrick && selectedImage && (
                  <div className="absolute inset-0 z-50 flex items-center justify-center">
                    <div className="animate-pulse bg-white/20 rounded-lg p-4">
                      <img 
                        src={selectedImage.url} 
                        alt={selectedImage.title}
                        className="max-w-full h-auto rounded-lg shadow-2xl"
                      />
                    </div>
                  </div>
                )}
                <ImageGrid 
                  mediaItems={filteredMedia}
                  onImageClick={(item: MediaItem) => {
                    setSelectedImage(item);
                    setTimeout(() => setSelectedImage(null), 2000);
                  }}
                  onDelete={handleDeleteMedia}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 