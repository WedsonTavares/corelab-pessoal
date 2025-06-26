import dbConnect from '@/lib/mongodb';
import Task from '@/models/Task';
import { NextResponse } from 'next/server';
import rateLimit from '@/lib/rateLimit';

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// Security headers helper
function setSecurityHeaders(response) {
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  return response;
}

// Input sanitization
function sanitizeInput(data) {
  if (typeof data === 'string') {
    return data.trim().slice(0, 1000);
  }
  if (typeof data === 'object' && data !== null) {
    const sanitized = {};
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string') {
        sanitized[key] = value.trim().slice(0, 1000);
      } else if (typeof value === 'boolean') {
        sanitized[key] = value;
      }
    }
    return sanitized;
  }
  return data;
}

// GET - Fetch all tasks
export async function GET(request) {
  try {
    // Apply rate limiting
    const rateLimitResult = await new Promise((resolve) => {
      limiter(
        request,
        { status: (code) => code, json: (data) => data },
        resolve
      );
    });

    if (rateLimitResult && rateLimitResult.status) {
      return NextResponse.json(rateLimitResult, { status: 429 });
    }

    await dbConnect();

    const { searchParams } = new URL(request.url);
    const filter = sanitizeInput(searchParams.get('filter'));
    const color = sanitizeInput(searchParams.get('color'));

    let query = {};

    if (filter === 'favorites') {
      query.isFavorite = true;
    }

    if (color && color !== 'all') {
      // Validate color format (hex color)
      if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
        query.color = color;
      }
    }

    const tasks = await Task.find(query)
      .sort({
        isFavorite: -1, // Favorites first
        createdAt: -1, // Then by newest
      })
      .limit(1000); // Limit results

    const response = NextResponse.json(
      { success: true, data: tasks },
      { status: 200 }
    );
    return setSecurityHeaders(response);
  } catch (error) {
    console.error('GET /api/tasks error:', error);
    const response = NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
    return setSecurityHeaders(response);
  }
}

// POST - Create new task
export async function POST(request) {
  try {
    // Apply rate limiting
    const rateLimitResult = await new Promise((resolve) => {
      limiter(
        request,
        { status: (code) => code, json: (data) => data },
        resolve
      );
    });

    if (rateLimitResult && rateLimitResult.status) {
      return NextResponse.json(rateLimitResult, { status: 429 });
    }

    await dbConnect();

    const body = await request.json();
    const sanitizedData = sanitizeInput(body);

    // Validate required fields
    if (!sanitizedData.title || sanitizedData.title.length < 1) {
      const response = NextResponse.json(
        {
          success: false,
          error: 'Title is required',
        },
        { status: 400 }
      );
      return setSecurityHeaders(response);
    }

    // Validate color format
    if (sanitizedData.color && !/^#[0-9A-Fa-f]{6}$/.test(sanitizedData.color)) {
      const response = NextResponse.json(
        {
          success: false,
          error: 'Invalid color format',
        },
        { status: 400 }
      );
      return setSecurityHeaders(response);
    }

    const task = await Task.create(sanitizedData);

    const response = NextResponse.json(
      { success: true, data: task },
      { status: 201 }
    );
    return setSecurityHeaders(response);
  } catch (error) {
    console.error('POST /api/tasks error:', error);
    const response = NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
    return setSecurityHeaders(response);
  }
}
