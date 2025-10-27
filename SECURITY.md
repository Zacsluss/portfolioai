# Security Policy

## Supported Versions

This project is actively maintained. Security updates are provided for the latest version.

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Security Features

This portfolio implements several security best practices:

### 1. Content Security Policy (CSP)
- Strict CSP headers prevent XSS attacks
- Scripts and styles only from trusted sources
- External resources limited to verified CDNs

### 2. Input Validation & Sanitization
- All user inputs are validated and sanitized
- Message length limits prevent abuse
- File type and size validation for uploads

### 3. Rate Limiting
- API endpoints protected with rate limiting
- 10 requests per minute per IP (configurable)
- Prevents abuse and DoS attacks

### 4. Environment Variables
- Sensitive data stored in environment variables
- `.env.local` files excluded from version control
- API keys never exposed to client-side code

### 5. Error Handling
- React Error Boundaries prevent app crashes
- Detailed errors only shown in development
- Generic error messages in production

### 6. HTTPS & Headers
- Enforces HTTPS in production
- Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- CORS configuration for API routes

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly:

### How to Report

1. **Email**: Send details to [zacharyjsluss@gmail.com](mailto:zacharyjsluss@gmail.com)
2. **Subject**: Use "SECURITY: [Brief Description]"
3. **Include**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### Response Timeline

- **Initial Response**: Within 48 hours
- **Assessment**: Within 1 week
- **Fix & Disclosure**: Coordinated with reporter

### What to Expect

- Acknowledgment of your report
- Regular updates on progress
- Credit in security advisory (if desired)
- Responsible disclosure timeline

## Security Best Practices for Deployment

If you're using this portfolio as a template, follow these best practices:

### 1. Environment Variables
```bash
# Never commit these files
.env.local
.env
.env.production
```

### 2. API Key Protection
- Use environment variables for all API keys
- Rotate API keys regularly
- Monitor API usage for anomalies

### 3. Vercel Deployment
- Add environment variables in Vercel dashboard
- Enable "Automatically expose System Environment Variables"
- Use Preview Deployments for testing

### 4. OpenAI API Security
- Set spending limits in OpenAI dashboard
- Monitor token usage
- Implement rate limiting (already included)

### 5. Regular Updates
```bash
# Check for security updates
npm audit

# Update dependencies
npm update

# Fix vulnerabilities
npm audit fix
```

## Dependencies Security

This project uses:
- **Next.js**: Regular security updates from Vercel
- **React**: Industry-standard security practices
- **OpenAI SDK**: Official SDK with security patches
- **TypeScript**: Type safety reduces common vulnerabilities

Run `npm audit` regularly to check for known vulnerabilities.

## Contact

For security-related questions or concerns:
- **Email**: zacharyjsluss@gmail.com
- **GitHub**: [@Zacsluss](https://github.com/Zacsluss)

---

**Last Updated**: 2025-10-27
