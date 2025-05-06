"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.THEME = exports.STORAGE_KEYS = exports.IMAGE_PREVIEW_DURATION = exports.MAGIC_TRICK_DURATION = exports.ACCEPTED_FILE_TYPES = exports.MAX_FILE_SIZE = exports.APP_DESCRIPTION = exports.APP_NAME = void 0;
exports.APP_NAME = 'EchoMind 2.1';
exports.APP_DESCRIPTION = 'Magic Photo Gallery with Voice Control';
exports.MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
exports.ACCEPTED_FILE_TYPES = {
    'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
    'video/*': ['.mp4', '.webm', '.mov']
};
exports.MAGIC_TRICK_DURATION = 3000; // 3 seconds
exports.IMAGE_PREVIEW_DURATION = 2000; // 2 seconds
exports.STORAGE_KEYS = {
    PROJECTS: 'echomind_projects',
    MEDIA_ITEMS: 'echomind_media_items',
};
exports.THEME = {
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
};
