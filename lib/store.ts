import { create } from 'zustand';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export type AssistantMode = 'chat' | 'voice';
export type AssistantState = 'idle' | 'listening' | 'processing' | 'speaking';

interface AssistantStore {
  // Mode & State
  mode: AssistantMode;
  state: AssistantState;
  isOpen: boolean;

  // Messages
  messages: Message[];

  // Voice
  isListening: boolean;
  isSpeaking: boolean;

  // Actions
  setMode: (mode: AssistantMode) => void;
  setState: (state: AssistantState) => void;
  setIsOpen: (isOpen: boolean) => void;
  addMessage: (role: 'user' | 'assistant', content: string) => void;
  clearMessages: () => void;
  setIsListening: (isListening: boolean) => void;
  setIsSpeaking: (isSpeaking: boolean) => void;
}

export const useAssistantStore = create<AssistantStore>((set) => ({
  mode: 'chat',
  state: 'idle',
  isOpen: false,
  messages: [],
  isListening: false,
  isSpeaking: false,

  setMode: (mode) => set({ mode }),
  setState: (state) => set({ state }),
  setIsOpen: (isOpen) => set({ isOpen }),

  addMessage: (role, content) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: `${Date.now()}-${Math.random()}`,
          role,
          content,
          timestamp: Date.now(),
        },
      ],
    })),

  clearMessages: () => set({ messages: [] }),
  setIsListening: (isListening) => set({ isListening }),
  setIsSpeaking: (isSpeaking) => set({ isSpeaking }),
}));
