import React, { useState, useCallback } from 'react';
import { THEME } from '@/constants';

interface VoiceRecognitionProps {
  onTranscript: (text: string) => void;
}

// Add type declarations for the Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export const VoiceRecognition: React.FC<VoiceRecognitionProps> = ({ onTranscript }) => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startListening = useCallback(() => {
    if (!('webkitSpeechRecognition' in window)) {
      setError('Speech recognition is not supported in your browser');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join('');

      onTranscript(transcript);
    };

    recognition.onerror = (event: any) => {
      setError(`Error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  }, [onTranscript]);

  const stopListening = useCallback(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.stop();
    }
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        onClick={isListening ? stopListening : startListening}
        className={`px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105
          ${isListening 
            ? 'bg-red-500 hover:bg-red-600 text-white' 
            : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
      >
        {isListening ? 'Stop Listening' : 'Start Voice Recognition'}
      </button>
      
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
      
      {isListening && (
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          <span className="text-sm text-gray-600">Listening...</span>
        </div>
      )}
    </div>
  );
}; 