'use server';
import {updateStreakOnTaskComplete} from '@/actions/updateStreak.action';
import {prisma} from '@/lib/prisma';
import {NextResponse} from 'next/server';

type TaskForm = {
  taskId: string;
  title: string;
  description: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
};

async function POST(req: Request) {
  const body = await req.json();
  const {taskId, title, description, status}: TaskForm = body;
  if (!taskId) {
    return new NextResponse('Task ID is required', {status: 400});
  }

  try {
    const updatedTask = await prisma.task.update({
      where: {id: taskId},
      data: {
        title,
        description,
        status
      }
    });

    if (status === 'COMPLETED') {
      await updateStreakOnTaskComplete(updatedTask.authorId);
    }

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    return new NextResponse('Failed to update task', {status: 500});
  }
}

export {POST};
