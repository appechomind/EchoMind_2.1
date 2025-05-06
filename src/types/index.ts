export interface MediaItem {
  id: string;
  url: string;
  title: string;
  keywords: string[];
  projectId?: string;
  createdAt: number;
  updatedAt: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  mediaCount: number;
  createdAt: number;
  updatedAt: number;
}

export interface StorageData {
  projects: Project[];
  mediaItems: MediaItem[];
} 