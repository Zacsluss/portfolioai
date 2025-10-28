import { renderHook, act } from '@testing-library/react'
import { useAssistantStore } from '@/lib/store'

describe('useAssistantStore', () => {
  beforeEach(() => {
    // Reset store before each test
    const { result } = renderHook(() => useAssistantStore())
    act(() => {
      result.current.clearMessages()
      result.current.setMode('chat')
      result.current.setState('idle')
      result.current.setIsOpen(false)
    })
  })

  describe('Mode Management', () => {
    it('should initialize with chat mode', () => {
      const { result } = renderHook(() => useAssistantStore())
      expect(result.current.mode).toBe('chat')
    })

    it('should switch between chat and voice modes', () => {
      const { result } = renderHook(() => useAssistantStore())

      act(() => {
        result.current.setMode('voice')
      })
      expect(result.current.mode).toBe('voice')

      act(() => {
        result.current.setMode('chat')
      })
      expect(result.current.mode).toBe('chat')
    })
  })

  describe('State Management', () => {
    it('should initialize with idle state', () => {
      const { result } = renderHook(() => useAssistantStore())
      expect(result.current.state).toBe('idle')
    })

    it('should change states correctly', () => {
      const { result } = renderHook(() => useAssistantStore())

      const states: Array<'idle' | 'listening' | 'processing' | 'speaking'> = [
        'listening',
        'processing',
        'speaking',
        'idle',
      ]

      states.forEach((state) => {
        act(() => {
          result.current.setState(state)
        })
        expect(result.current.state).toBe(state)
      })
    })
  })

  describe('Open/Close Management', () => {
    it('should initialize with closed state', () => {
      const { result } = renderHook(() => useAssistantStore())
      expect(result.current.isOpen).toBe(false)
    })

    it('should toggle open state', () => {
      const { result } = renderHook(() => useAssistantStore())

      act(() => {
        result.current.setIsOpen(true)
      })
      expect(result.current.isOpen).toBe(true)

      act(() => {
        result.current.setIsOpen(false)
      })
      expect(result.current.isOpen).toBe(false)
    })
  })

  describe('Message Management', () => {
    it('should initialize with empty messages', () => {
      const { result } = renderHook(() => useAssistantStore())
      expect(result.current.messages).toEqual([])
    })

    it('should add user message', () => {
      const { result } = renderHook(() => useAssistantStore())

      act(() => {
        result.current.addMessage('user', 'Hello')
      })

      expect(result.current.messages).toHaveLength(1)
      expect(result.current.messages[0]).toMatchObject({
        role: 'user',
        content: 'Hello',
      })
      expect(result.current.messages[0]).toHaveProperty('id')
      expect(result.current.messages[0]).toHaveProperty('timestamp')
    })

    it('should add assistant message', () => {
      const { result } = renderHook(() => useAssistantStore())

      act(() => {
        result.current.addMessage('assistant', 'Hi there!')
      })

      expect(result.current.messages).toHaveLength(1)
      expect(result.current.messages[0]).toMatchObject({
        role: 'assistant',
        content: 'Hi there!',
      })
    })

    it('should add multiple messages in order', () => {
      const { result } = renderHook(() => useAssistantStore())

      act(() => {
        result.current.addMessage('user', 'Question 1')
        result.current.addMessage('assistant', 'Answer 1')
        result.current.addMessage('user', 'Question 2')
        result.current.addMessage('assistant', 'Answer 2')
      })

      expect(result.current.messages).toHaveLength(4)
      expect(result.current.messages[0].content).toBe('Question 1')
      expect(result.current.messages[1].content).toBe('Answer 1')
      expect(result.current.messages[2].content).toBe('Question 2')
      expect(result.current.messages[3].content).toBe('Answer 2')
    })

    it('should limit messages to prevent memory leaks', () => {
      const { result } = renderHook(() => useAssistantStore())
      const maxMessages = 50

      // Add more than max messages
      act(() => {
        for (let i = 0; i < maxMessages + 10; i++) {
          result.current.addMessage('user', `Message ${i}`)
        }
      })

      // Should only keep the last 50 messages
      expect(result.current.messages).toHaveLength(maxMessages)
      expect(result.current.messages[0].content).toBe(`Message 10`)
      expect(result.current.messages[maxMessages - 1].content).toBe(`Message ${maxMessages + 9}`)
    })

    it('should clear all messages', () => {
      const { result } = renderHook(() => useAssistantStore())

      act(() => {
        result.current.addMessage('user', 'Message 1')
        result.current.addMessage('assistant', 'Response 1')
        result.current.addMessage('user', 'Message 2')
      })

      expect(result.current.messages).toHaveLength(3)

      act(() => {
        result.current.clearMessages()
      })

      expect(result.current.messages).toEqual([])
    })

    it('should generate unique IDs for messages', () => {
      const { result } = renderHook(() => useAssistantStore())

      act(() => {
        result.current.addMessage('user', 'Message 1')
        result.current.addMessage('user', 'Message 2')
      })

      const ids = result.current.messages.map((m) => m.id)
      expect(new Set(ids).size).toBe(ids.length) // All IDs should be unique
    })
  })

  describe('Voice State Management', () => {
    it('should manage listening state', () => {
      const { result } = renderHook(() => useAssistantStore())

      expect(result.current.isListening).toBe(false)

      act(() => {
        result.current.setIsListening(true)
      })
      expect(result.current.isListening).toBe(true)

      act(() => {
        result.current.setIsListening(false)
      })
      expect(result.current.isListening).toBe(false)
    })

    it('should manage speaking state', () => {
      const { result } = renderHook(() => useAssistantStore())

      expect(result.current.isSpeaking).toBe(false)

      act(() => {
        result.current.setIsSpeaking(true)
      })
      expect(result.current.isSpeaking).toBe(true)

      act(() => {
        result.current.setIsSpeaking(false)
      })
      expect(result.current.isSpeaking).toBe(false)
    })
  })
})
