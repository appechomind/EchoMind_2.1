export const APP_NAME = 'EchoMind 2.1';
export const APP_DESCRIPTION = 'Magic Photo Gallery with Voice Control';

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const ACCEPTED_FILE_TYPES = {
  'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
  'video/*': ['.mp4', '.webm', '.mov']
} as const;

export const MAGIC_TRICK_DURATION = 3000; // 3 seconds
export const IMAGE_PREVIEW_DURATION = 2000; // 2 seconds

export const STORAGE_KEYS = {
  PROJECTS: 'echomind_projects',
  MEDIA_ITEMS: 'echomind_media_items',
} as const;

export const THEME = {
  colors: {
    primary: {
      light: '#60A5FA',
      DEFAULT: '#3B82F6',
      dark: '#2563EB',
    },
    background: {
      light: '#1E293B',
      DEFAULT: '#0F172A',
      dark: '#020617',
    },
    text: {
      light: '#F8FAFC',
      DEFAULT: '#E2E8F0',
      dark: '#94A3B8',
    },
  },
  gradients: {
    background: 'bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900',
    text: 'bg-gradient-to-r from-pink-500 to-violet-500',
  },
} as const; 