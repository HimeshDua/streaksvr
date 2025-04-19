'use server';
import {updateStreakOnTaskComplete} from '@/actions/updateStreak.action';
import {prisma} from '@/lib/prisma';

type TaskForm = {
  taskId: string;
  title: string;
  description: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
};

export async function POST(req: Request) {
  const body = await req.json();
  const {taskId, title, description, status}: TaskForm = body;
  // Validate the input data
  if (!taskId) {
    throw new Error('Task ID is required');
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

    return updatedTask;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
}
