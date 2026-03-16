import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VoiceSearchProps {
  onResult: (text: string) => void;
}

export default function VoiceSearch({ onResult }: VoiceSearchProps) {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setError("Voice search is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setError("Could not hear you. Please try again.");
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="relative">
      <button
        onClick={startListening}
        disabled={isListening}
        className={`p-4 rounded-full transition-all shadow-lg active:scale-90 ${
          isListening 
            ? 'bg-red-500 text-white animate-pulse' 
            : 'bg-saffron text-white hover:bg-orange-600'
        }`}
        title="Voice Search"
      >
        {isListening ? <Loader2 className="h-6 w-6 animate-spin" /> : <Mic className="h-6 w-6" />}
      </button>

      <AnimatePresence>
        {isListening && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full mt-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-xl border border-gray-100 whitespace-nowrap z-50"
          >
            <p className="text-sm font-medium text-gray-700">Listening for symptoms...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <p className="absolute top-full mt-2 left-1/2 -translate-x-1/2 text-[10px] text-red-500 whitespace-nowrap">
          {error}
        </p>
      )}
    </div>
  );
}
