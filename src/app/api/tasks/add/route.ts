import {prisma} from '@/lib/prisma';
import {NextResponse} from 'next/server';

interface taskBody {
  title: string;
  description: string;
  authorId: string;
}
async function POST(req: Request) {
  const body: taskBody = await req.json();
  const {title, description, authorId} = body;

  if (!authorId) {
    return NextResponse.json(
      {error: 'User not authenticated or server error'},
      {status: 501}
    );
  }
  if (!title || !description) {
    return NextResponse.json({error: 'both fields is required'}, {status: 400});
  }
  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        authorId,
        status: 'PENDING'
      }
    });

    return NextResponse.json(newTask, {status: 200});
  } catch (error) {
    console.error('Error creating task: ', error);
    return NextResponse.json({error: 'Failed to create task'}, {status: 500});
  }
}

export {POST};
