'use client';

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode
} from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';

// Define the types
type Task = {
  id: string;
  title: string;
  description?: string | null;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  isCompleted: boolean;
  dueDate?: Date | null;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  category: "WORK" | "PERSONAL" | "LEARNING" | "OTHERS"
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
};

type Streaks = {
  current: Number;
  lastUpdated: Date;
  longest: Number;

}

type AuthContextType = {
  userData: {
    id: string;
    username: string;
    name: string;
    email: string;
    emailVerified: boolean;
    tasks: Task[];
    streaks: Streaks | null;
    createdAt: string;
    updatedAt: string

  };
  loading: boolean;
  error: string | null;
  tasks: Task[];
  setUpdatedTask: React.Dispatch<React.SetStateAction<Task | undefined>>;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [UpdatedTask, setUpdatedTask] = useState<Task | undefined>(); // Initialized as undefined
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // This effect will run whenever 'setUpdatedTask' function reference changes, which is likely only on initial render.
    // You probably meant to run this when the 'UpdatedTask' state itself changes.
    setTasks((prevTasks) => {
      if (UpdatedTask) {
        // Find the index of the task to update
        const index = prevTasks.findIndex(task => task.id === UpdatedTask.id);
        if (index !== -1) {
          // Create a new array with the updated task
          const newTasks = [...prevTasks];
          newTasks[index] = UpdatedTask;
          return newTasks;
        } else {
          // If the updated task is not found in the existing tasks, you might want to add it
          return [...prevTasks, UpdatedTask];
        }
      }
      return prevTasks;
    });
  }, [UpdatedTask]); // Dependency should be the 'UpdatedTask' state itself

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      setError(null);
      setLoading(true);
      if (authUser) {
        setIsAuthenticated(true);
        try {
          const res = await fetch('/api/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firebaseId: authUser.uid })
          });
          const dbUserData = await res.json();

          if (res.ok) {
            const combinedUserData = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              ...dbUserData
            };
            setUserData(combinedUserData);
            setTasks(combinedUserData.tasks || []);
          } else {
            setError(dbUserData?.message || 'Failed to fetch user');
            setUserData(null);
            setIsAuthenticated(false);
            setLoading(false);
            return;
          }
        } catch (err: any) {
          setError(err.message || 'Unknown error');
          setUserData(null);
          setIsAuthenticated(false);
          setLoading(false);
          console.error('Error fetching user data', err);
          return;
        }
      } else {
        setUserData(null);
        setTasks([]);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const contextValue = {
    userData,
    loading,
    error,
    tasks,
    setUpdatedTask, // Correct: Expose the setter function
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}