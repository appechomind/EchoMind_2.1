import React from 'react';
import { Project } from '@/types';
interface ProjectManagerProps {
    projects: Project[];
    selectedProject: string | null;
    onProjectSelect: (projectId: string | null) => void;
    onProjectCreate: (name: string) => void;
    onProjectDelete: (id: string) => void;
}
export declare const ProjectManager: React.FC<ProjectManagerProps>;
export {};
