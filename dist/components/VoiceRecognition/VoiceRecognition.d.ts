import React from 'react';
interface VoiceRecognitionProps {
    onTranscript: (text: string) => void;
}
declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}
export declare const VoiceRecognition: React.FC<VoiceRecognitionProps>;
export {};
