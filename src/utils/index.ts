import { MediaItem, Project } from '@/types';

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function getFileExtension(filename: string): string {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
}

export function isImageFile(filename: string): boolean {
  const ext = getFileExtension(filename).toLowerCase();
  return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext);
}

export function isVideoFile(filename: string): boolean {
  const ext = getFileExtension(filename).toLowerCase();
  return ['mp4', 'webm', 'mov'].includes(ext);
}

export function getMediaType(filename: string): 'image' | 'video' | 'unknown' {
  if (isImageFile(filename)) return 'image';
  if (isVideoFile(filename)) return 'video';
  return 'unknown';
}

export function updateProjectMediaCount(project: Project, mediaItems: MediaItem[]): Project {
  const count = mediaItems.filter(item => item.projectId === project.id).length;
  return { ...project, mediaCount: count };
}

export function filterMediaByProject(mediaItems: MediaItem[], projectId: string | null): MediaItem[] {
  if (!projectId) return mediaItems;
  return mediaItems.filter(item => item.projectId === projectId);
}

export function searchMedia(mediaItems: MediaItem[], query: string): MediaItem[] {
  const searchTerm = query.toLowerCase();
  return mediaItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm) ||
    item.keywords.some(k => k.toLowerCase().includes(searchTerm))
  );
} 