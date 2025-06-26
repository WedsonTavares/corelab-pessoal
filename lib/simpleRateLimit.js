// Simple rate limiting for Next.js API Routes
const requestCounts = new Map();

export function rateLimit(ip, windowMs = 15 * 60 * 1000, max = 100) {
  const now = Date.now();
  const windowStart = now - windowMs;

  // Clean old entries
  for (const [key, data] of requestCounts.entries()) {
    if (data.resetTime < now) {
      requestCounts.delete(key);
    }
  }

  // Get or create request data for this IP
  let requestData = requestCounts.get(ip);
  if (!requestData || requestData.resetTime < now) {
    requestData = {
      count: 0,
      resetTime: now + windowMs,
    };
    requestCounts.set(ip, requestData);
  }

  // Check if limit exceeded
  if (requestData.count >= max) {
    return {
      success: false,
      error: 'Too many requests from this IP, please try again later.',
      retryAfter: Math.ceil((requestData.resetTime - now) / 1000),
    };
  }

  // Increment counter
  requestData.count++;

  return {
    success: true,
    remaining: Math.max(0, max - requestData.count),
    resetTime: requestData.resetTime,
  };
}
