'use client';

import { MessageSquare, Mic, X, Trash2 } from 'lucide-react';
import { useAssistantStore } from '@/lib/store';
import { ChatInterface } from './ChatInterface';
import { VoiceInterface } from './VoiceInterface';
import { motion, AnimatePresence } from 'framer-motion';

export function Assistant() {
  const { mode, setMode, isOpen, setIsOpen, messages, clearMessages } = useAssistantStore();

  const toggleAssistant = () => {
    setIsOpen(!isOpen);
  };

  const handleClearChat = () => {
    if (confirm('Clear all messages?')) {
      clearMessages();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleAssistant}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-matrix-500 hover:bg-matrix-600 text-black rounded-full shadow-lg flex items-center justify-center transition-all animate-pulse-glow"
            aria-label="Open AI Assistant"
          >
            <MessageSquare className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Assistant Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleAssistant}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed top-0 right-0 bottom-0 w-full md:w-[400px] lg:w-[450px] bg-gray-900 border-l border-gray-800 shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-900/95 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-matrix-500 rounded-full animate-pulse" />
                  <h2 className="text-lg font-semibold text-white">ZARVIS</h2>
                </div>

                <div className="flex items-center gap-2">
                  {messages.length > 0 && mode === 'chat' && (
                    <button
                      onClick={handleClearChat}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                      aria-label="Clear messages"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={toggleAssistant}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                    aria-label="Close assistant"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Mode Toggle */}
              <div className="flex border-b border-gray-800 bg-gray-900/80">
                <button
                  onClick={() => setMode('chat')}
                  className={`flex-1 py-3 px-2 flex items-center justify-center gap-2 transition-colors ${
                    mode === 'chat'
                      ? 'bg-gray-800 text-matrix-500 border-b-2 border-matrix-500'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                  aria-label="Switch to chat mode"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-xs font-medium">Chat</span>
                </button>
                <button
                  onClick={() => setMode('voice')}
                  className={`flex-1 py-3 px-2 flex items-center justify-center gap-2 transition-colors ${
                    mode === 'voice'
                      ? 'bg-gray-800 text-matrix-500 border-b-2 border-matrix-500'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                  aria-label="Switch to push-to-talk mode"
                >
                  <Mic className="w-4 h-4" />
                  <span className="text-xs font-medium">Voice</span>
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
                <AnimatePresence mode="wait">
                  {mode === 'chat' && (
                    <motion.div
                      key="chat"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="h-full"
                    >
                      <ChatInterface />
                    </motion.div>
                  )}
                  {mode === 'voice' && (
                    <motion.div
                      key="voice"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="h-full"
                    >
                      <VoiceInterface />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="p-3 border-t border-gray-800 bg-gray-900/95">
                <p className="text-xs text-gray-500 text-center">
                  {mode === 'voice'
                    ? '🎤 Push-to-talk for voice conversations'
                    : '💬 Text chat powered by GPT-4o'
                  }
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
