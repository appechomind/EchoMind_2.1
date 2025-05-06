import React from 'react';
import { MediaItem, Project } from '@/types';
interface EchoMindProps {
    className?: string;
    onMediaSelect?: (media: MediaItem) => void;
    onProjectSelect?: (project: Project | null) => void;
}
export declare const EchoMind: React.FC<EchoMindProps>;
export {};
