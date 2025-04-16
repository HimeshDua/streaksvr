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
    console.log('juice pila di jiye \n mosammbi kaa!');
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
