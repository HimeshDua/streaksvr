// hooks/useTasks.ts
'use client';

import {useState, useEffect} from 'react';
import {useAuth} from '@/contexts/AuthContext';

type Task = {
  id: string;
  title: string;
  description?: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  createdAt: string;
};

function useTasks() {
  const {userData} = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTasks() {
      if (userData?.id) {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch('/api/tasks/get', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({authorId: userData.id})
          });
          if (response.ok) {
            const tasksData = await response.json();
            setTasks(tasksData);
          } else {
            setError(`Failed to fetch tasks: ${response.status}`);
          }
        } catch (err: any) {
          setError(`Error fetching tasks: ${err.message}`);
        } finally {
          setLoading(false);
        }
      } else {
        setTasks([]);
        setLoading(false);
      }
    }

    fetchTasks();
  }, [userData?.id]);

  return {tasks, loading, error, setTasks};
}

export default useTasks;
