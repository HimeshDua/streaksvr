import {prisma} from '@/lib/prisma';
import {NextResponse} from 'next/server';

async function POST(req: Request) {
  try {
    const body = await req.json();

    const {authorId} = body;

    if (!authorId) {
      return NextResponse.json(
        {error: `User with ID "${authorId}" not found`},
        {status: 404}
      );
    }

    const userAllTasks = await prisma.task.findMany({where: {authorId}});

    return NextResponse.json(userAllTasks, {status: 201});
  } catch (error: any) {
    console.error('Error fetching task:', error);
    return NextResponse.json(
      {error: 'Failed to fetch task', details: error.message},
      {status: 500}
    );
  }
}

export {POST};
