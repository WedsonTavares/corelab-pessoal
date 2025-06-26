// Simple in-memory rate limiting (for production, use Redis)
const requests = new Map();

export default function rateLimit(options = {}) {
  const {
    windowMs = 15 * 60 * 1000, // 15 minutes
    max = 100, // limit each IP to 100 requests per windowMs
    message = 'Too many requests from this IP, please try again later.',
    skipSuccessfulRequests = false,
    skipFailedRequests = false,
  } = options;

  return (req, res, next) => {
    // Get client IP - Next.js Request object doesn't have connection property
    const ip =
      req.headers.get?.('x-forwarded-for') ||
      req.headers.get?.('x-real-ip') ||
      req.ip ||
      '127.0.0.1';

    const now = Date.now();
    const windowStart = now - windowMs;

    // Clean old entries
    for (const [key, data] of requests.entries()) {
      if (data.resetTime < now) {
        requests.delete(key);
      }
    }

    // Get or create request data for this IP
    let requestData = requests.get(ip);
    if (!requestData || requestData.resetTime < now) {
      requestData = {
        count: 0,
        resetTime: now + windowMs,
      };
      requests.set(ip, requestData);
    }

    // Check if limit exceeded
    if (requestData.count >= max) {
      if (res.status) {
        res.status(429).json({
          success: false,
          error: message,
          retryAfter: Math.ceil((requestData.resetTime - now) / 1000),
        });
      }
      return {
        status: 429,
        json: {
          success: false,
          error: message,
          retryAfter: Math.ceil((requestData.resetTime - now) / 1000),
        },
      };
    }

    // Increment counter
    requestData.count++;

    // Add rate limit headers
    if (res.setHeader) {
      res.setHeader('X-RateLimit-Limit', max);
      res.setHeader(
        'X-RateLimit-Remaining',
        Math.max(0, max - requestData.count)
      );
      res.setHeader(
        'X-RateLimit-Reset',
        Math.ceil(requestData.resetTime / 1000)
      );
    }

    if (typeof next === 'function') {
      next();
    }

    return null; // No rate limit hit
  };
}
