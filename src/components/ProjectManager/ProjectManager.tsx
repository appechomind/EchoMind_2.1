import React, { useState } from 'react';
import { usePersistentStorage } from '@/hooks/usePersistentStorage';

interface Project {
  id: string;
  name: string;
  description: string;
  mediaCount: number;
}

interface ProjectManagerProps {
  onProjectSelect: (projectId: string) => void;
}

export const ProjectManager: React.FC<ProjectManagerProps> = ({ onProjectSelect }) => {
  const [projects, setProjects] = usePersistentStorage<Project[]>('projects', []);
  const [newProject, setNewProject] = useState({ name: '', description: '' });

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProject.name.trim()) {
      const project: Project = {
        id: Date.now().toString(),
        name: newProject.name,
        description: newProject.description,
        mediaCount: 0
      };
      setProjects([...projects, project]);
      setNewProject({ name: '', description: '' });
    }
  };

  const handleDeleteProject = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProjects(projects.filter(p => p.id !== projectId));
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleCreateProject} className="space-y-4">
        <div>
          <label htmlFor="projectName" className="block text-sm font-medium text-gray-300">
            Project Name
          </label>
          <input
            type="text"
            id="projectName"
            value={newProject.name}
            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter project name"
          />
        </div>
        <div>
          <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-300">
            Description
          </label>
          <textarea
            id="projectDescription"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
            placeholder="Enter project description"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Project
        </button>
      </form>

      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-300">Your Projects</h3>
        {projects.length === 0 ? (
          <p className="text-sm text-gray-400">No projects yet. Create one to get started!</p>
        ) : (
          <div className="space-y-2">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => onProjectSelect(project.id)}
                className="cursor-pointer rounded-lg border border-gray-600 bg-gray-700 p-4 hover:bg-gray-600 transition-colors group"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-white">{project.name}</h4>
                    <p className="text-sm text-gray-300">{project.description}</p>
                    <p className="mt-2 text-xs text-gray-400">
                      {project.mediaCount} media items
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleDeleteProject(project.id, e)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-400 hover:text-red-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}; 