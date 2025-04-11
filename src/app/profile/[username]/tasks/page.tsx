'use client';

import Tasks from '@/components/Tasks';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';

type Task = {
  id: string;
  title: string;
  description?: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  createdAt: string;
};

export default function TasksPage() {
  const [tasksArr, setTasksArr] = useState<Task[]>([]);
  const { userData } = useAuth();
  const authorId = userData?.id;

  useEffect(() => {
    async function getAllTasks() {
      if (authorId) {
        const response = await fetch('/api/tasks/get', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ authorId }),
        });
        if (response.ok) {
          const tasks = await response.json();
          setTasksArr(tasks);
        } else {
          console.error('Failed to fetch tasks:', response.status);
        }
      }
    }

    getAllTasks();
  }, [authorId]);

  return (
    <div><Tasks tasks={tasksArr} /></div>
  );
}