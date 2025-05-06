import React from 'react';
import { MediaItem } from '@/types';
interface ImageGridProps {
    mediaItems: MediaItem[];
    onImageClick: (item: MediaItem) => void;
    onDelete: (id: string) => void;
}
export declare const ImageGrid: React.FC<ImageGridProps>;
export {};
