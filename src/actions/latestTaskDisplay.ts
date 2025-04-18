'use client';
import {useAuth} from '@/contexts/AuthContext';

const {setUpdatedTask} = useAuth();

type Task = {
  id: string;
  title: string;
  description?: string | null;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  dueDate?: Date | null;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  category: 'WORK' | 'PERSONAL' | 'LEARNING' | 'OTHERS';
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
};

export default function latestTaskDisplay(newTask: Task) {
  try {
    setUpdatedTask(newTask);
  } catch (error) {
    console.error('Failed To Get Latest task:', error);
  }
}
