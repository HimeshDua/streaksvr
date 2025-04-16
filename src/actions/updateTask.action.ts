'use server';
import {prisma} from '@/lib/prisma';

type TaskForm = {
  title: string;
  description: string;
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
        description: combinedData.description
      }
    });

    return updatedTask;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
}
