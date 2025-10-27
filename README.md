<div align="center">

# AI-Powered Portfolio

### Interactive career assistant powered by GPT-4o—your resume, but it talks back

**[Try Live Demo](https://ai-portfolio-hazel-nine.vercel.app)** • **[Download](https://github.com/Zacsluss/portfolioai/archive/refs/heads/main.zip)**

</div>

---

## What This Is

An AI-powered portfolio that replaces static career documents with a conversational assistant named ZARVIS. Instead of reading bullet points, visitors engage in natural dialogue about 7 years of enterprise Salesforce architecture across 22 countries. Ask about specific projects, technical decisions, or certifications—ZARVIS understands context and provides detailed responses drawn from my complete professional history.

The technical challenge was integrating GPT-4o into a production-grade portfolio that serves as both a demonstration of AI integration capabilities and a functional career showcase. The result is a Next.js 14 application with server-side API routes protecting sensitive keys, streaming responses for optimal perceived performance, and Whisper API integration for real-time voice transcription.

**Key Stats:**
- Next.js 14 with App Router and server-side API routes
- GPT-4o for conversational intelligence with full career context
- Whisper API for voice-to-text transcription
- TypeScript 5.3 strict mode throughout (zero ESLint warnings)
- Sub-1-second page loads via static export
- Vercel serverless deployment with edge functions
- Glassmorphism UI with Framer Motion animations

## Core Features

**Conversational AI:** ZARVIS is trained on my complete career history—15+ Fortune 500 Salesforce implementations, solutions deployed across 22 countries, complex integrations, data migrations, and custom Lightning components. It understands context and can discuss technical architecture decisions, project challenges, and specific client scenarios.

**Voice Integration:** Real-time speech-to-text using OpenAI's Whisper API enables natural voice conversations. Speak questions naturally instead of typing—ZARVIS responds with both text and text-to-speech output.

**Dual Mode:** Beyond professional consulting, ZARVIS can switch contexts entirely—ask it to run a D&D campaign and watch it shift from enterprise architect to dungeon master. This demonstrates the flexibility of contextual AI systems and makes the portfolio memorable.

## Technical Stack

Built with modern web technologies prioritizing performance, type safety, and maintainability.

**Framework & Language:**
- Next.js 14 with App Router for optimal routing and server components
- TypeScript 5.3 with strict mode enabled (full type safety)
- Server-side API routes protect OpenAI API keys from client exposure

**AI Integration:**
- GPT-4o for conversational responses with streaming support
- OpenAI Whisper API for voice transcription
- Custom system prompts trained on complete career history
- Context management for multi-turn conversations

**State & Styling:**
- Zustand for lightweight client-side state management
- Tailwind CSS with custom glassmorphism components
- Framer Motion for fluid animations
- Responsive design with mobile optimization

**Deployment:**
- Vercel serverless functions with edge runtime
- Environment variable management for API keys
- Static export optimization for fast initial loads
- Cost: ~$5-20/month for OpenAI API usage

## Quick Start

**Online:** Visit [ai-portfolio-hazel-nine.vercel.app](https://ai-portfolio-hazel-nine.vercel.app)

**Local Development:**
```bash
git clone https://github.com/Zacsluss/portfolioai.git
cd portfolioai
npm install

# Create .env.local file
echo "OPENAI_API_KEY=your_key_here" > .env.local

# Run development server
npm run dev
# Visit http://localhost:3000
```

**Deployment:**
Deploy to Vercel with one click:
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Zacsluss/portfolioai)

Add your `OPENAI_API_KEY` environment variable in Vercel dashboard and deploy.

## Customization

To adapt this portfolio for your own use:

1. **Edit Career Data:** Update `lib/portfolio-data.ts` with your professional history, skills, and projects
2. **Train the AI:** Modify `lib/assistant-context.ts` with your background, experiences, and personality
3. **Customize Styling:** Adjust Tailwind configuration and theme colors in `tailwind.config.js`
4. **Add Features:** Extend API routes in `app/api/` for additional functionality

## Why I Built This

As someone managing enterprise platforms serving 3,000+ users across 22 countries, I built this to demonstrate AI integration capabilities while solving a practical problem: traditional portfolios are passive and forgettable.

Static PDFs get skimmed. Static websites get skipped. An AI assistant that can discuss my career in real-time creates memorable interactions with recruiters and hiring managers while simultaneously demonstrating full-stack development, production-ready AI integration, and thoughtful design decisions.

The constraint of public deployment forced robust architecture. API keys must be protected server-side. Streaming responses must handle connection failures gracefully. Voice transcription needs error handling for network timeouts. These aren't academic exercises—they're production requirements.

The dual-mode feature (professional consultant vs. D&D dungeon master) demonstrates contextual AI flexibility and makes the portfolio shareable. People remember "the AI portfolio that runs D&D campaigns" more than another resume website.

This project embodies my philosophy: the best leaders never stop coding. Managing enterprise platforms doesn't preclude hands-on technical work—it demands it.

## Professional Background

**Enterprise Salesforce Architecture:** 7 years leading implementations for Fortune 500 clients in financial services, healthcare, and manufacturing. Architected solutions deployed across 22 countries involving complex integrations, large-scale data migrations, and custom Lightning components.

**Certifications:** Salesforce Administrator, Platform App Builder

**Technical Expertise:** Full-stack development, AI integration, cloud architecture, CRM systems design, API development, database optimization

**Creative Skills:** FAA-licensed commercial drone pilot, digital art (Adobe Creative Suite), music production (Ableton, Logic Pro)

## Contributing

This project is open source under the MIT License. Fork it, modify it, use it for your own portfolio. If you build something interesting with it, I'd love to see it.

---

<div align="center">

**Built by [Zachary Sluss](https://github.com/Zacsluss)** • MIT License

**Connect:** [LinkedIn](https://linkedin.com/in/zacharysluss) • [Email](mailto:zacsluss@yahoo.com)

[![GitHub stars](https://img.shields.io/github/stars/Zacsluss/portfolioai?style=social)](https://github.com/Zacsluss/portfolioai/stargazers)

</div>
