'use client';

import React, { useState, useEffect } from 'react';

export function VoiceRecognition({ onCommand }) {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && !('webkitSpeechRecognition' in window)) {
      setError('Voice recognition is not supported in your browser.');
    }
  }, []);

  const startListening = () => {
    if (error) return;

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onCommand(transcript);
    };

    recognition.onerror = (event) => {
      setError('Error occurred in recognition: ' + event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="flex-1">
      <button
        onClick={startListening}
        disabled={isListening || error}
        className={`w-full px-4 py-2 rounded-lg transition-colors
          ${isListening
            ? 'bg-red-500 text-white'
            : error
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
      >
        {isListening ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            Listening...
          </div>
        ) : error ? (
          'Not Supported'
        ) : (
          'Start Voice Command'
        )}
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
} 