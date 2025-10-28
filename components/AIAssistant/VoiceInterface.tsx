'use client';

import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Loader2 } from 'lucide-react';
import { useAssistantStore } from '@/lib/store';
import { extractNavigationCommand, removeNavigationCommand, scrollToSection } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { logger } from '@/lib/logger';

export function VoiceInterface() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(true);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { messages, addMessage } = useAssistantStore();

  // Stop speaking when component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await processAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      logger.error('Error accessing microphone:', err);
      setError('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const processAudio = async (audioBlob: Blob) => {
    setIsProcessing(true);
    setTranscript('');
    setResponse('');

    try {
      // Step 1: Transcribe audio
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');

      const transcribeResponse = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (!transcribeResponse.ok) {
        throw new Error('Transcription failed');
      }

      const { text } = await transcribeResponse.json();
      setTranscript(text);
      addMessage('user', text);

      // Step 2: Get AI response
      const chatResponse = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: text },
          ],
        }),
      });

      if (!chatResponse.ok) {
        throw new Error('Failed to get response');
      }

      const reader = chatResponse.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') break;

              try {
                const parsed = JSON.parse(data);
                if (parsed.text) {
                  assistantMessage += parsed.text;
                }
              } catch {
                // Ignore parse errors
              }
            }
          }
        }
      }

      // Check for navigation command
      const navCommand = extractNavigationCommand(assistantMessage);
      if (navCommand) {
        setTimeout(() => scrollToSection(navCommand), 500);
      }

      // Remove navigation command from message
      const cleanMessage = removeNavigationCommand(assistantMessage);
      setResponse(cleanMessage);
      addMessage('assistant', cleanMessage);

      // Step 3: Convert to speech if enabled
      if (audioEnabled && cleanMessage) {
        await speakText(cleanMessage);
      }

    } catch (err) {
      logger.error('Processing error:', err);
      setError('An error occurred. Please try again.');
      addMessage('assistant', "I'm sorry, I encountered an error. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const speakText = async (text: string) => {
    try {
      setIsSpeaking(true);

      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('TTS failed');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };

      await audio.play();
    } catch (err) {
      logger.error('TTS error:', err);
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setIsSpeaking(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 space-y-8">
      {/* Status Display */}
      <div className="text-center space-y-2 min-h-[100px]">
        <AnimatePresence mode="wait">
          {isRecording && (
            <motion.div
              key="recording"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <p className="text-lg text-matrix-500 font-semibold">Listening...</p>
              <p className="text-sm text-gray-400">Speak your question</p>
            </motion.div>
          )}

          {isProcessing && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-2"
            >
              <Loader2 className="w-8 h-8 animate-spin text-matrix-500 mx-auto" />
              {transcript && (
                <div className="text-sm text-gray-300 max-w-md mx-auto">
                  <p className="font-semibold text-matrix-500 mb-1">You said:</p>
                  <p className="italic">&ldquo;{transcript}&rdquo;</p>
                </div>
              )}
              <p className="text-sm text-gray-400">Processing...</p>
            </motion.div>
          )}

          {isSpeaking && (
            <motion.div
              key="speaking"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-2"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Volume2 className="w-8 h-8 text-matrix-500 mx-auto" />
              </motion.div>
              {response && (
                <div className="text-sm text-gray-300 max-w-md mx-auto">
                  <p className="italic">&ldquo;{response}&rdquo;</p>
                </div>
              )}
            </motion.div>
          )}

          {!isRecording && !isProcessing && !isSpeaking && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <p className="text-lg text-gray-300">Ready to assist</p>
              <p className="text-sm text-gray-500">Click the microphone to start</p>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-red-400"
          >
            {error}
          </motion.p>
        )}
      </div>

      {/* Microphone Button */}
      <motion.button
        onClick={isRecording ? stopRecording : startRecording}
        disabled={isProcessing || isSpeaking}
        className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
          isRecording
            ? 'bg-red-500 hover:bg-red-600 animate-pulse-glow'
            : 'bg-matrix-500 hover:bg-matrix-600'
        }`}
        whileTap={{ scale: 0.95 }}
        aria-label={isRecording ? 'Stop recording' : 'Start recording'}
      >
        {isRecording ? (
          <MicOff className="w-8 h-8 text-white" />
        ) : (
          <Mic className="w-8 h-8 text-black" />
        )}

        {isRecording && (
          <motion.div
            className="absolute inset-0 border-4 border-red-500 rounded-full"
            animate={{ scale: [1, 1.3, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        )}
      </motion.button>

      {/* Audio Toggle */}
      <button
        onClick={() => setAudioEnabled(!audioEnabled)}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-matrix-500 transition-colors"
        aria-label={audioEnabled ? 'Disable audio responses' : 'Enable audio responses'}
      >
        {audioEnabled ? (
          <>
            <Volume2 className="w-4 h-4" />
            <span>Audio enabled</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4" />
            <span>Audio disabled</span>
          </>
        )}
      </button>

      {/* Stop Speaking Button */}
      {isSpeaking && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={stopSpeaking}
          className="text-sm text-gray-400 hover:text-red-400 transition-colors"
        >
          Stop speaking
        </motion.button>
      )}
    </div>
  );
}
