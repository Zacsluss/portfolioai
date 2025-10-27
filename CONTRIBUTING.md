# Contributing to AI Portfolio

Thank you for your interest in contributing! This portfolio is both a personal project and an open-source template. We welcome contributions that improve the template's usefulness for others.

## 🎯 Project Purpose

This is:
1. **Zachary Sluss's Personal Portfolio** - Showcasing enterprise technology leadership
2. **Open Source Template** - For others to build their own AI-powered portfolios
3. **Tech Demo** - Demonstrating Next.js 14, OpenAI integration, and modern web practices

## 🤝 How to Contribute

### Types of Contributions We Welcome

✅ **Template Improvements**
- Better documentation
- Enhanced UI/UX components
- Performance optimizations
- Accessibility improvements
- Bug fixes

✅ **New Features**
- Additional AI capabilities
- New visual effects
- Mobile optimizations
- Internationalization (i18n)

✅ **Developer Experience**
- Better setup instructions
- Testing infrastructure
- CI/CD improvements
- Code quality tools

❌ **What We Don't Accept**
- Changes to personal content (my experience, projects, bio)
- Features that break the template's simplicity
- Unnecessary dependencies

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- OpenAI API key (for AI features)

### Local Development Setup

1. **Fork and Clone**
```bash
git fork https://github.com/Zacsluss/portfolioai
git clone https://github.com/YOUR_USERNAME/portfolioai
cd portfolioai
```

2. **Install Dependencies**
```bash
npm install
```

3. **Set Up Environment**
```bash
cp .env.local.example .env.local
# Add your OPENAI_API_KEY to .env.local
```

4. **Run Development Server**
```bash
npm run dev
```

Visit `http://localhost:3000`

## 📝 Development Guidelines

### Code Style

- **TypeScript**: Strict mode enabled, use proper types
- **Components**: Functional components with hooks
- **Naming**: PascalCase for components, camelCase for functions
- **Comments**: JSDoc for public functions, inline for complex logic

### File Structure

```
portfolioai/
├── app/                    # Next.js 14 app router
│   ├── api/               # API routes
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── sections/         # Page sections
│   ├── effects/          # Visual effects
│   └── AIAssistant/      # AI features
├── lib/                   # Utilities and data
│   ├── portfolio-data.ts # Content (customize this!)
│   └── assistant-context.ts # AI system prompt
└── public/                # Static assets
```

### Making Changes

1. **Create a Branch**
```bash
git checkout -b feature/your-feature-name
```

2. **Make Your Changes**
- Write clean, readable code
- Add comments for complex logic
- Update documentation if needed

3. **Test Locally**
```bash
npm run dev
npm run build  # Ensure it builds
```

4. **Commit Changes**
```bash
git add .
git commit -m "feat: Add new feature description"
```

Use conventional commits:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Adding tests

5. **Push and Create PR**
```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## 🔍 Pull Request Process

1. **Describe Your Changes**
   - What does this PR do?
   - Why is it needed?
   - Any breaking changes?

2. **Checklist**
   - [ ] Code follows project style
   - [ ] Changes are tested locally
   - [ ] Documentation updated (if needed)
   - [ ] No personal content changes
   - [ ] Build succeeds (`npm run build`)

3. **Review Process**
   - Maintainer will review within 1 week
   - Address any feedback
   - Once approved, it will be merged!

## 🐛 Reporting Bugs

Found a bug? Help us fix it!

### Before Reporting
- Check existing issues
- Try the latest version
- Verify it's not a personal content issue

### Bug Report Should Include
1. **Description**: What went wrong?
2. **Steps to Reproduce**: How can we see it?
3. **Expected Behavior**: What should happen?
4. **Actual Behavior**: What actually happens?
5. **Environment**:
   - OS (Windows/Mac/Linux)
   - Node version
   - Browser (if applicable)
6. **Screenshots**: If relevant

[Create an Issue](https://github.com/Zacsluss/portfolioai/issues/new)

## 💡 Feature Requests

Have an idea? We'd love to hear it!

### Before Requesting
- Check existing issues/PRs
- Ensure it fits the template's purpose
- Consider if it's generally useful

### Feature Request Should Include
1. **Problem**: What problem does this solve?
2. **Solution**: Your proposed solution
3. **Alternatives**: Other options you considered
4. **Examples**: Similar features elsewhere

[Create a Feature Request](https://github.com/Zacsluss/portfolioai/issues/new)

## 🎨 Customizing for Your Own Use

This template is designed to be customized! Here's how:

1. **Update Personal Info**
   - Edit `lib/portfolio-data.ts` with your information
   - Update `lib/assistant-context.ts` for your AI personality
   - Replace images in `public/`

2. **Customize Styling**
   - Colors: `tailwind.config.ts`
   - Fonts: `app/layout.tsx`
   - Components: Modify any component in `components/`

3. **Deploy Your Version**
   - See README.md for deployment instructions
   - Don't forget your OpenAI API key!

## 📜 Code of Conduct

- **Be respectful** - Kind and constructive feedback
- **Be collaborative** - Help others learn
- **Be patient** - This is a side project
- **Be professional** - No spam, abuse, or harassment

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be:
- Acknowledged in release notes
- Listed in CONTRIBUTORS.md (if substantial contribution)
- Given credit in commit history

## 💬 Questions?

- **General Questions**: Open a GitHub Discussion
- **Bug Reports**: Open an Issue
- **Security Issues**: See SECURITY.md
- **Direct Contact**: zacharyjsluss@gmail.com

---

Thank you for contributing to making this portfolio template better for everyone! 🚀

**Happy Coding!**
