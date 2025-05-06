'use client';

import React, { useState } from 'react';
import { ImageGrid } from '../ImageGrid/ImageGrid';
import { MediaUploader } from '../MediaUploader/MediaUploader';
import { ProjectManager } from '../ProjectManager/ProjectManager';
import { VoiceRecognition } from '../VoiceRecognition/VoiceRecognition';
import { MagicTrick } from '../MagicTrick/MagicTrick';
import { usePersistentStorage } from '../../hooks/usePersistentStorage';
import { generateId, filterMediaByProject, searchMedia } from '../../utils';
import { STORAGE_KEYS } from '../../constants';

export function EchoMind() {
  const [projects, setProjects] = usePersistentStorage(STORAGE_KEYS.PROJECTS, []);
  const [mediaItems, setMediaItems] = usePersistentStorage(STORAGE_KEYS.MEDIA_ITEMS, []);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMedia = filterMediaByProject(mediaItems, selectedProject);
  const searchResults = searchQuery ? searchMedia(filteredMedia, searchQuery) : filteredMedia;

  const handleProjectCreate = (name) => {
    const newProject = {
      id: generateId(),
      name,
      description: '',
      mediaCount: 0,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    setProjects([...projects, newProject]);
  };

  const handleProjectDelete = (id) => {
    setProjects(projects.filter(p => p.id !== id));
    setMediaItems(mediaItems.map(item => 
      item.projectId === id ? { ...item, projectId: null } : item
    ));
  };

  const handleMediaUpload = (files) => {
    const newItems = Array.from(files).map(file => ({
      id: generateId(),
      url: URL.createObjectURL(file),
      title: file.name,
      keywords: [],
      projectId: selectedProject,
      createdAt: Date.now(),
      updatedAt: Date.now()
    }));
    setMediaItems([...mediaItems, ...newItems]);
  };

  const handleMediaDelete = (id) => {
    setMediaItems(mediaItems.filter(item => item.id !== id));
  };

  const handleVoiceCommand = (text) => {
    setSearchQuery(text);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <ProjectManager
            projects={projects}
            selectedProject={selectedProject}
            onProjectSelect={setSelectedProject}
            onProjectCreate={handleProjectCreate}
            onProjectDelete={handleProjectDelete}
          />
        </div>
        
        <div className="md:col-span-3">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <MediaUploader onUpload={handleMediaUpload} />
              <VoiceRecognition onCommand={handleVoiceCommand} />
              <MagicTrick items={searchResults} />
            </div>

            {searchQuery && (
              <div className="text-sm text-gray-500">
                Showing results for: {searchQuery}
              </div>
            )}

            <ImageGrid
              items={searchResults}
              onDelete={handleMediaDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 