import dbConnect from '@/lib/mongodb';
import Task from '@/models/Task';
import { NextResponse } from 'next/server';
import { rateLimit } from '@/lib/simpleRateLimit';

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
    const ip =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1';

    const rateLimitResult = rateLimit(ip);
    if (!rateLimitResult.success) {
      const response = NextResponse.json(rateLimitResult, { status: 429 });
      return setSecurityHeaders(response);
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
    
    // If MongoDB is not available, return sample data for development
    if (error.message?.includes('ECONNREFUSED') || error.message?.includes('connect')) {
      console.log('MongoDB not available, using sample data for development');
      const sampleTasks = [
        {
          _id: '1',
          title: 'Estudar React',
          description: 'Aprender hooks e context API',
          color: '#ff9800',
          isFavorite: true,
          createdAt: new Date('2024-01-15'),
        },
        {
          _id: '2',
          title: 'Implementar autenticação',
          description: 'Adicionar login e registro de usuários',
          color: '#2196f3',
          isFavorite: false,
          createdAt: new Date('2024-01-14'),
        },
        {
          _id: '3',
          title: 'Otimizar performance',
          description: 'Melhorar tempo de carregamento das páginas',
          color: '#4caf50',
          isFavorite: true,
          createdAt: new Date('2024-01-13'),
        },
        {
          _id: '4',
          title: 'Documentar API',
          description: 'Criar documentação completa da API REST',
          color: '#9c27b0',
          isFavorite: false,
          createdAt: new Date('2024-01-12'),
        },
        {
          _id: '5',
          title: 'Implementar testes',
          description: 'Adicionar testes unitários e de integração',
          color: '#f44336',
          isFavorite: false,
          createdAt: new Date('2024-01-11'),
        },
      ];

      // Apply filters to sample data
      let filteredTasks = [...sampleTasks];
      
      if (filter === 'favorites') {
        filteredTasks = filteredTasks.filter(task => task.isFavorite);
      }
      
      if (color && color !== 'all') {
        filteredTasks = filteredTasks.filter(task => task.color === color);
      }

      const response = NextResponse.json(
        { success: true, data: filteredTasks },
        { status: 200 }
      );
      return setSecurityHeaders(response);
    }

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
    const ip =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1';

    const rateLimitResult = rateLimit(ip);
    if (!rateLimitResult.success) {
      const response = NextResponse.json(rateLimitResult, { status: 429 });
      return setSecurityHeaders(response);
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
