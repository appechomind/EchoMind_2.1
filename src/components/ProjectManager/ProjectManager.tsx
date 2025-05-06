import React, { useState } from 'react';
import { Project } from '@/types';
import { formatDate } from '@/utils';

interface ProjectManagerProps {
  projects: Project[];
  selectedProject: string | null;
  onProjectSelect: (projectId: string | null) => void;
  onProjectCreate: (name: string) => void;
  onProjectDelete: (id: string) => void;
}

export const ProjectManager: React.FC<ProjectManagerProps> = ({
  projects,
  selectedProject,
  onProjectSelect,
  onProjectCreate,
  onProjectDelete
}) => {
  const [newProjectName, setNewProjectName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProjectName.trim()) {
      onProjectCreate(newProjectName.trim());
      setNewProjectName('');
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Projects</h2>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          placeholder="New project name..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Create
        </button>
      </form>

      <div className="space-y-2">
        <button
          onClick={() => onProjectSelect(null)}
          className={`w-full text-left px-4 py-2 rounded-lg transition-colors
            ${selectedProject === null
              ? 'bg-blue-100 text-blue-700'
              : 'hover:bg-gray-100'}`}
        >
          All Media
        </button>

        {projects.map((project) => (
          <div
            key={project.id}
            className={`group flex items-center justify-between px-4 py-2 rounded-lg transition-colors
              ${selectedProject === project.id
                ? 'bg-blue-100 text-blue-700'
                : 'hover:bg-gray-100'}`}
          >
            <button
              onClick={() => onProjectSelect(project.id)}
              className="flex-1 text-left"
            >
              <div className="font-medium">{project.name}</div>
              <div className="text-sm text-gray-500">
                {project.mediaCount} items • Created {formatDate(project.createdAt)}
              </div>
            </button>
            
            <button
              onClick={() => onProjectDelete(project.id)}
              className="opacity-0 group-hover:opacity-100 p-1 text-gray-500 hover:text-red-500 transition-opacity"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}; 