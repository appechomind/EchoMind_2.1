'use client';

import React, { useState, useEffect } from 'react';
import { ImageGrid } from '../ImageGrid/ImageGrid';
import { MediaUploader } from '../MediaUploader/MediaUploader';
import { ProjectManager } from '../ProjectManager/ProjectManager';
import { VoiceRecognition } from '../VoiceRecognition/VoiceRecognition';
import { usePersistentStorage } from '../../hooks/usePersistentStorage';
import { generateId, filterMediaByProject, searchMedia } from '../../utils';
import { STORAGE_KEYS } from '../../constants';

export function EchoMind() {
  const [projects, setProjects] = usePersistentStorage(STORAGE_KEYS.PROJECTS, []);
  const [mediaItems, setMediaItems] = usePersistentStorage(STORAGE_KEYS.MEDIA_ITEMS, []);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMagicTrickActive, setIsMagicTrickActive] = useState(false);

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

  const handleMagicTrick = () => {
    if (searchResults.length === 0) return;
    
    setIsMagicTrickActive(true);
    const randomIndex = Math.floor(Math.random() * searchResults.length);
    const selectedItem = searchResults[randomIndex];
    
    // Show the selected item in a modal or highlight it
    // You can implement this based on your UI requirements
    
    setTimeout(() => {
      setIsMagicTrickActive(false);
    }, 3000);
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
              <button
                onClick={handleMagicTrick}
                disabled={isMagicTrickActive || searchResults.length === 0}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50"
              >
                Magic Trick
              </button>
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