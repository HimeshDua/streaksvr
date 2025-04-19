import {prisma} from '@/lib/prisma';
import {NextResponse} from 'next/server';

async function POST(req: Request) {
  try {
    const body = await req.json();

    const {title, description, category, priority, authorId} = body;

    if (!title || !authorId) {
      return NextResponse.json(
        {error: 'Missing title or authorId'},
        {status: 400}
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {firebaseId: authorId}
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
        authorId: existingUser.id,
        status: 'PENDING',
        category: category || 'WORK',
        priority: priority || 'MEDIUM'
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
