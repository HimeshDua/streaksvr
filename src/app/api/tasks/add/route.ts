import {prisma} from '@/lib/prisma';
import {NextResponse} from 'next/server';
import {z} from 'zod';

async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Request Body:', body);

    const {
      title,
      description,
      authorId,
      status,
      isCompleted,
      dueDate,
      priority,
      category
    } = body;

    const existingUser = await prisma.user.findUnique({
      where: {id: authorId}
    });

    if (!existingUser) {
      return NextResponse.json(
        {error: `User with ID "${authorId}" not found`},
        {status: 404}
      );
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        authorId,
        status,
        isCompleted: isCompleted || false,
        dueDate: dueDate ? new Date(dueDate) : null,
        priority: priority || 'MEDIUM',
        category: category || 'WORK'
      }
    });

    return NextResponse.json(newTask, {status: 201});
  } catch (error: any) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      {error: 'Failed to create task', details: error.message},
      {status: 500}
    );
  }
}

export {POST};
