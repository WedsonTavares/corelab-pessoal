// Security middleware for API routes
import rateLimit from './rateLimit';

export const security = {
  // Rate limiting configuration
  rateLimit: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
  }),

  // Validate request method
  validateMethod: (allowedMethods) => (req, res, next) => {
    if (!allowedMethods.includes(req.method)) {
      return res.status(405).json({
        success: false,
        error: 'Method not allowed',
      });
    }
    next();
  },

  // Sanitize input data
  sanitizeInput: (data) => {
    if (typeof data === 'string') {
      return data.trim().slice(0, 1000); // Limit string length
    }
    if (typeof data === 'object' && data !== null) {
      const sanitized = {};
      for (const [key, value] of Object.entries(data)) {
        if (typeof value === 'string') {
          sanitized[key] = value.trim().slice(0, 1000);
        } else if (typeof value === 'boolean' || typeof value === 'number') {
          sanitized[key] = value;
        }
      }
      return sanitized;
    }
    return data;
  },

  // Validate MongoDB ObjectId
  isValidObjectId: (id) => {
    return /^[0-9a-fA-F]{24}$/.test(id);
  },

  // CORS headers
  setCORSHeaders: (res) => {
    res.setHeader(
      'Access-Control-Allow-Origin',
      process.env.ALLOWED_ORIGINS || 'http://localhost:3000'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    );
    res.setHeader('Access-Control-Max-Age', '86400');
  },

  // Security headers
  setSecurityHeaders: (res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader(
      'Permissions-Policy',
      'camera=(), microphone=(), geolocation=()'
    );
  },
};

export default security;
