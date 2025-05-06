import React, { useState } from 'react';

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
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState({ name: '', description: '' });

  const handleCreateProject = () => {
    if (newProject.name.trim()) {
      const project: Project = {
        id: Date.now().toString(),
        name: newProject.name,
        description: newProject.description,
        mediaCount: 0,
      };
      setProjects([...projects, project]);
      setNewProject({ name: '', description: '' });
    }
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Project Name
            </label>
            <input
              type="text"
              value={newProject.name}
              onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              placeholder="Enter project name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              placeholder="Enter project description"
              rows={3}
            />
          </div>
          <button
            onClick={handleCreateProject}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Create Project
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Your Projects</h2>
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-4 border rounded-lg hover:border-primary cursor-pointer"
              onClick={() => onProjectSelect(project.id)}
            >
              <h3 className="font-medium">{project.name}</h3>
              <p className="text-sm text-gray-600">{project.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                {project.mediaCount} media files
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 