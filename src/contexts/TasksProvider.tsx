'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode
} from 'react';
import { useAuth } from './AuthContext';
import Link from 'next/link';

type Task = {
  id: string;
  title: string;
  description?: string | null;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  isCompleted: boolean;
  dueDate?: string | null;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  category:
  | 'WORK'
  | 'PERSONAL'
  | 'LEARNING'
  | 'HEALTH'
  | 'FITNESS'
  | 'SOCIAL'
  | 'FAMILY'
  | 'STUDY'
  | 'PROJECT'
  | 'SIDE_HUSTLE'
  | 'FREELANCE'
  | 'CODING'
  | 'WRITING'
  | 'READING'
  | 'WATCHLIST'
  | 'SHOPPING'
  | 'GOALS'
  | 'HABITS'
  | 'SPIRITUAL'
  | 'JOURNAL'
  | 'BILLS'
  | 'TRAVEL'
  | 'EVENTS'
  | 'MEETINGS'
  | 'DEADLINES'
  | 'OTHERS';
  createdAt: string;
  updatedAt: string;
  authorId: string;
  comments: any[]; // Assuming Comment type is available
};

type TasksContextType = {
  tasks: Task[];
  loading: boolean;
  refetch: () => Promise<void>;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};


const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: ReactNode }) {
  const { userData } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    if (!userData?.id) return;

    setLoading(true);
    try {
      const res = await fetch('/api/tasks/get', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authorId: userData.id })
      });

      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  }, [userData?.id]);

  useEffect(() => {
    if (userData?.id) {
      fetchTasks();
    }
  }, [fetchTasks, userData?.id]);

  if (!userData) {
    return <div>Please <Link href={"/signin"}>sign in</Link> to view your tasks.</div>;
  }

  return (
    <TasksContext.Provider value={{ tasks, loading, refetch: fetchTasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  );
}


export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
};
