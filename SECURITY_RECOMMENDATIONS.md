# Security Recommendations for Portfolio AI

## CRITICAL: Immediate Action Required

### 1. Rotate Your OpenAI API Key IMMEDIATELY

**Your API key has been compromised and must be rotated NOW.**

Your API key was shared in a public conversation and is now visible to anyone with access to that conversation history. This poses several risks:

- **Unauthorized API usage** - Others can use your API key to make OpenAI requests
- **Unexpected charges** - Malicious actors could rack up charges on your OpenAI account
- **Rate limit abuse** - Your account could hit rate limits, blocking your legitimate usage
- **Quota exhaustion** - Your monthly quota could be depleted

#### How to Rotate Your API Key:

1. **Go to OpenAI API Keys page**: https://platform.openai.com/api-keys
2. **Find the compromised key** in the list (it will show partial characters)
3. **Click the "Revoke" or delete button** next to the key
4. **Create a new API key** by clicking "Create new secret key"
5. **Copy the new key** (it will start with `sk-proj-...` or `sk-...`)
6. **Update your `.env.local` file** with the new key:
   ```bash
   cd C:\Users\zacsl\portfolioai
   # Edit .env.local and replace the OPENAI_API_KEY value
   ```
7. **Restart your development server** to load the new key

**Do this NOW before continuing.**

---

## Best Practices for API Key Security

### ✅ Do's

1. **Never share API keys publicly**
   - Don't paste them in chat, forums, GitHub issues, or Discord
   - Don't commit them to version control (even private repos)
   - Don't include them in screenshots or videos

2. **Use environment variables**
   - Store keys in `.env.local` (already set up)
   - Verify `.env.local` is in `.gitignore` (✅ already configured)
   - Use different keys for development and production

3. **Set up usage limits in OpenAI**
   - Go to https://platform.openai.com/settings/organization/limits
   - Set monthly budget limits (e.g., $10-20/month)
   - Set up email alerts for usage thresholds

4. **Monitor your API usage regularly**
   - Check usage at https://platform.openai.com/usage
   - Review unexpected spikes immediately
   - Set up billing alerts

5. **Rotate keys periodically**
   - Change API keys every 90 days
   - Rotate immediately if suspected compromise
   - Keep old keys active briefly during rotation

### ❌ Don'ts

1. **Never hardcode API keys** in source files
2. **Never commit `.env` or `.env.local`** to Git
3. **Never share your API key** via email, chat, or screenshots
4. **Never use production keys** in development
5. **Never disable `.env*.local` in `.gitignore`**

---

## Current Security Status

### ✅ What's Already Protected

- `.env.local` is in `.gitignore` (line 26)
- Environment variables are validated on server startup
- API key format validation is in place
- Rate limiting is configured (10 requests/minute per IP)
- Enhanced error handling prevents key leakage
- CSP headers restrict external connections
- Input sanitization prevents injection attacks

### ⚠️ Additional Recommendations

#### 1. Set Up Vercel Environment Variables (for production)

When deploying to Vercel:

1. Go to your project settings on Vercel
2. Navigate to Settings > Environment Variables
3. Add `OPENAI_API_KEY` with your production key
4. Set it for "Production" environment only
5. Use a different key than your development key

#### 2. Implement Request Logging

Add logging to track API usage:

```typescript
// In app/api/chat/route.ts
console.log('Chat request from IP:', ip, 'at', new Date().toISOString());
```

#### 3. Add Budget Alerts

Set up OpenAI budget alerts:

1. Go to https://platform.openai.com/settings/organization/limits
2. Set "Hard limit" to maximum monthly spend (e.g., $50)
3. Set "Soft limit" to get warnings earlier (e.g., $30)
4. Add your email for notifications

#### 4. Consider Using OpenAI SDK's Built-in Retry Logic

The OpenAI SDK has automatic retry logic. Enable it:

```typescript
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  maxRetries: 3,
  timeout: 30000, // 30 seconds
});
```

#### 5. Monitor for Unusual Patterns

Watch for:
- Sudden spikes in API calls
- Requests from unexpected IPs
- Unusual error rates
- Quota exhaustion

---

## Deployment Security Checklist

Before deploying to production:

- [ ] Rotated compromised API key
- [ ] Set up separate production API key
- [ ] Configured environment variables in Vercel/hosting platform
- [ ] Set OpenAI monthly spending limits
- [ ] Enabled billing alerts
- [ ] Tested rate limiting in production
- [ ] Verified CSP headers are active
- [ ] Confirmed `.env.local` is not in Git history
- [ ] Set up monitoring/logging
- [ ] Documented incident response plan

---

## Git History Check

To verify `.env.local` was never committed to Git:

```bash
cd C:\Users\zacsl\portfolioai
git log --all --full-history -- .env.local
git log --all --full-history -- .env
```

If you see any results, your keys may be in Git history. Contact GitHub support to purge the history or make the repo private.

---

## Incident Response Plan

If your API key is compromised again:

1. **Immediately revoke the key** at https://platform.openai.com/api-keys
2. **Check your usage** for unauthorized requests
3. **Generate a new key** and update `.env.local`
4. **Review recent charges** and dispute if necessary
5. **Update any deployed instances** with the new key
6. **Document what happened** to prevent recurrence

---

## Additional Resources

- [OpenAI API Best Practices](https://platform.openai.com/docs/guides/production-best-practices)
- [OpenAI Safety Best Practices](https://platform.openai.com/docs/guides/safety-best-practices)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)

---

## Summary

**IMMEDIATE ACTION**: Rotate your OpenAI API key NOW.

Your portfolio AI is now configured correctly with:
- ✅ API key loaded from `.env.local`
- ✅ Enhanced error handling
- ✅ Input validation and sanitization
- ✅ Rate limiting
- ✅ Security headers (CSP, CORS)
- ✅ Updated OpenAI package (v6.7.0)

But you MUST rotate your API key before using the application, as the current key is compromised.

---

**Questions or concerns?** Review the OpenAI API documentation or reach out to OpenAI support.
