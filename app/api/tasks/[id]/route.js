import dbConnect from '@/lib/mongodb';
import Task from '@/models/Task';
import { NextResponse } from 'next/server';

// GET - Fetch a single task
export async function GET(request, { params }) {
  try {
    await dbConnect();

    const { id } = await params; // Await params for Next.js 15+
    const task = await Task.findById(id);

    if (!task) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: task }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// PUT - Update a task
export async function PUT(request, { params }) {
  try {
    await dbConnect();

    const { id } = await params; // Await params for Next.js 15+
    const body = await request.json();
    const task = await Task.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: task }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// DELETE - Delete a task
export async function DELETE(request, { params }) {
  try {
    await dbConnect();

    const { id } = await params;
    const deletedTask = await Task.deleteOne({ _id: id });

    if (!deletedTask.deletedCount) {
      return NextResponse.json(
        { success: false, error: 'Task not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
