# API Documentation

## Overview
This document describes the REST API endpoints for the ZARVIS AI Portfolio application.

All API routes are server-side Next.js API routes located in `/app/api/*`.

---

## Authentication
All API endpoints require an OpenAI API key to be configured in the environment variables:
```bash
OPENAI_API_KEY=sk-your-key-here
```

---

## Endpoints

### POST /api/chat
Chat with ZARVIS using GPT-4o with streaming responses.

**Request Body:**
```typescript
{
  messages: Array<{
    role: 'user' | 'assistant'
    content: string
  }>
}
```

**Response:**
Server-Sent Events (SSE) stream with the following format:
```
data: {"text": "partial response"}
data: {"text": " continued response"}
...
data: [DONE]
```

**Status Codes:**
- `200` - Success (streaming response)
- `400` - Invalid request (missing messages, invalid format, too many messages)
- `429` - Rate limit exceeded
- `500` - Internal server error
- `503` - Service unavailable (API key not configured)

**Rate Limiting:**
- Default: 10 requests per minute per IP
- Configurable via `RATE_LIMIT_MAX_REQUESTS` and `RATE_LIMIT_WINDOW_MS`

**Example Request:**
```javascript
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    messages: [
      { role: 'user', content: 'Tell me about your experience' }
    ]
  })
})

const reader = response.body.getReader()
const decoder = new TextDecoder()

while (true) {
  const { done, value } = await reader.read()
  if (done) break

  const text = decoder.decode(value)
  const lines = text.split('\n')

  for (const line of lines) {
    if (line.startsWith('data: ')) {
      const data = line.slice(6)
      if (data === '[DONE]') break
      const json = JSON.parse(data)
      console.log(json.text)
    }
  }
}
```

**Security Features:**
- Input sanitization (removes control characters, limits length to 2000 chars)
- Message count validation (1-50 messages)
- API key format validation
- Rate limiting per IP address
- Comprehensive error handling

---

### POST /api/transcribe
Transcribe audio to text using OpenAI Whisper API.

**Request Body:**
```typescript
FormData with 'audio' field containing audio file
```

**Response:**
```typescript
{
  text: string  // Transcribed text
}
```

**Status Codes:**
- `200` - Success
- `400` - Invalid request (missing file, wrong format, file too large)
- `500` - Internal server error
- `503` - Service unavailable (API key not configured)

**File Requirements:**
- **Max size:** 25MB
- **Allowed formats:**
  - `audio/webm`
  - `audio/mp4`
  - `audio/mpeg`
  - `audio/wav`
  - `audio/ogg`

**Example Request:**
```javascript
const formData = new FormData()
formData.append('audio', audioBlob, 'recording.webm')

const response = await fetch('/api/transcribe', {
  method: 'POST',
  body: formData
})

const data = await response.json()
console.log(data.text)  // Transcribed text
```

---

### POST /api/tts
Convert text to speech using OpenAI TTS API.

**Request Body:**
```typescript
{
  text: string  // Text to convert to speech
}
```

**Response:**
Audio file (audio/mpeg)

**Status Codes:**
- `200` - Success (returns audio file)
- `400` - Invalid request (missing or invalid text)
- `500` - Internal server error
- `503` - Service unavailable (API key not configured)

**Example Request:**
```javascript
const response = await fetch('/api/tts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    text: 'Hello, I am ZARVIS'
  })
})

const audioBlob = await response.blob()
const audioUrl = URL.createObjectURL(audioBlob)
const audio = new Audio(audioUrl)
await audio.play()
```

**Voice Configuration:**
Uses voice settings from `lib/assistant-context.ts`:
- Model: `tts-1`
- Voice: Configured in assistant context
- Speed: `1.0`

---

## Error Responses

All endpoints return consistent error response format:

```typescript
{
  error: string  // Human-readable error message
}
```

### Common Error Messages:

**400 Bad Request:**
- `Invalid request: messages array required`
- `Invalid message count`
- `Invalid request: audio file required`
- `Audio file too large. Maximum size is 25MB.`
- `Invalid audio format. Supported: webm, mp4, mpeg, wav, ogg`

**429 Too Many Requests:**
- `Rate limit exceeded. Please try again later.`
- `OpenAI API rate limit exceeded. Please try again in a moment.`

**500 Internal Server Error:**
- `Invalid API key configuration. Please check your OpenAI API key.`
- `An error occurred processing your request. Please try again.`

**503 Service Unavailable:**
- `Service configuration error: API key not found. Please check server configuration.`
- `Service configuration error: Invalid API key format.`
- `OpenAI service is temporarily unavailable. Please try again later.`

---

## Configuration

### Environment Variables

```bash
# Required
OPENAI_API_KEY=sk-your-key-here

# Optional - Rate Limiting
RATE_LIMIT_MAX_REQUESTS=10        # Max requests per window
RATE_LIMIT_WINDOW_MS=60000        # Window size in milliseconds

# Optional - Input Validation
MAX_INPUT_LENGTH=2000              # Max characters per message
MAX_MESSAGE_HISTORY=50             # Max messages in conversation
```

### Rate Limiting

Rate limiting is implemented in-memory per IP address:
- **Default:** 10 requests per 60 seconds
- **Headers returned:** `X-RateLimit-Remaining`
- **Recommendation:** Use Redis for multi-instance deployments

---

## Best Practices

### Client-Side

1. **Error Handling:** Always handle all status codes
2. **Streaming:** Process SSE events as they arrive for better UX
3. **Retry Logic:** Implement exponential backoff for 429/500 errors
4. **Timeout:** Set appropriate timeouts for long-running requests

### Server-Side

1. **API Keys:** Never expose API keys to the client
2. **Rate Limiting:** Consider upgrading to Redis for production
3. **Monitoring:** Log all errors for debugging
4. **Caching:** Consider caching frequent requests

---

## Monitoring

All API routes log important events using the centralized logger (`lib/logger.ts`):
- Error conditions
- API key validation failures
- Rate limit hits
- OpenAI API errors

In development, all logs are output to console. In production, only errors and warnings are logged.

---

## Testing

See `__tests__/` directory for comprehensive API tests.

Run tests:
```bash
npm test
npm run test:ci  # With coverage
```

---

## Support

For issues or questions:
- **GitHub:** https://github.com/Zacsluss/portfolioai
- **Email:** zacsluss@yahoo.com
