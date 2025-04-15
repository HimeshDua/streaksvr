'use server';
import {prisma} from '@/lib/prisma';

type TaskForm = {
  title: string;
  description: string;
  category: 'WORK' | 'PERSONAL' | 'LEARNING' | 'OTHERS';
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
        category: combinedData.category,
        status: combinedData.status
      }
    });

    return updatedTask;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
}
