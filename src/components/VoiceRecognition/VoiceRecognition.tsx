import React, { useState, useEffect } from 'react';

interface VoiceRecognitionProps {
  onSpeechResult: (text: string) => void;
}

// Add type declarations for the Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export const VoiceRecognition: React.FC<VoiceRecognitionProps> = ({ onSpeechResult }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0])
            .map((result) => result.transcript)
            .join('');

          onSpeechResult(transcript);
        };

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };

        setRecognition(recognition);
      }
    }
  }, [onSpeechResult]);

  const toggleListening = () => {
    if (recognition) {
      if (isListening) {
        recognition.stop();
      } else {
        recognition.start();
      }
      setIsListening(!isListening);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={toggleListening}
        className={`px-4 py-2 rounded-full ${
          isListening
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-primary hover:bg-blue-600'
        } text-white transition-colors`}
      >
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>
      {isListening && (
        <div className="mt-2 text-sm text-gray-600">
          Listening for keywords...
        </div>
      )}
    </div>
  );
}; 