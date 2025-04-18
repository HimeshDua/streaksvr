'use server';
import {prisma} from '@/lib/prisma';

type TaskForm = {
  title: string;
  description: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
};

export default async function updateTask(
  taskId: string,
  combinedData: TaskForm
) {
  try {
    const updatedTask = await prisma.task.update({
      where: {id: taskId},
      data: {
        title: combinedData.title,
        description: combinedData.description,
        status: combinedData.status
      }
    });

    return updatedTask;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
}
