'use client';

import { useState } from 'react';
import { ImageGrid } from '@/components/ImageGrid/ImageGrid';
import { MediaUploader } from '@/components/MediaUploader/MediaUploader';
import { VoiceRecognition } from '@/components/VoiceRecognition/VoiceRecognition';
import { ProjectManager } from '@/components/ProjectManager/ProjectManager';

interface MediaItem {
  id: string;
  url: string;
  title: string;
  keywords: string[];
}

export default function Home() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [currentProject, setCurrentProject] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleUpload = (file: File, keywords: string) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const newItem: MediaItem = {
        id: Date.now().toString(),
        url: e.target?.result as string,
        title: file.name,
        keywords: keywords.split(',').map(k => k.trim()),
      };
      setMediaItems([...mediaItems, newItem]);
    };
    reader.readAsDataURL(file);
  };

  const handleSpeechResult = (text: string) => {
    setSearchQuery(text);
  };

  const handleProjectSelect = (projectId: string) => {
    setCurrentProject(projectId);
  };

  const filteredMedia = mediaItems.filter(item =>
    item.keywords.some(keyword =>
      keyword.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          EchoMind 2.1
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <ProjectManager onProjectSelect={handleProjectSelect} />
            <div className="mt-8">
              <MediaUploader onUpload={handleUpload} />
            </div>
          </div>
          
          <div>
            <VoiceRecognition onSpeechResult={handleSpeechResult} />
            <div className="mt-4">
              {searchQuery && (
                <p className="text-sm text-gray-600 mb-4">
                  Searching for: {searchQuery}
                </p>
              )}
              <ImageGrid images={filteredMedia} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 