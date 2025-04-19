'use client';

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
} from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Define the types
type Task = {
  id: string;
  title: string;
  description?: string | null;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  dueDate?: Date | null;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  category: "WORK" | "PERSONAL" | "LEARNING" | "OTHERS"
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
};

type Streaks = {
  current: Number;
  longest: Number;
  lastUpdated: Date;
}

type AuthContextType = {
  userData: {
    id: string;
    username: string;
    name: string;
    email: string;
    emailVerified: boolean;
    firebaseId: string;
    tasks: Task[];
    streaks: Streaks[];
    createdAt: string;
    updatedAt: string
  } | null;
  loading: boolean;
  error: string | null;
  tasks: Task[];
  streaks: Streaks | null;
  refreshUserData: () => Promise<void>;
  setUpdatedTask: React.Dispatch<React.SetStateAction<Task | undefined>>;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<AuthContextType["userData"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [streaks, setStreaks] = useState<Streaks | null>(null);
  const [updatedTask, setUpdatedTask] = useState<Task | undefined>(); // Initialized as undefined
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!updatedTask) return;

    setTasks(prev =>
      prev.some(task => task.id === updatedTask.id)
        ? prev.map(task => task.id === updatedTask.id ? updatedTask : task)
        : [...prev, updatedTask]
    );
  }, [updatedTask]);


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
              firebaseId: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              ...dbUserData
            };
            setUserData(combinedUserData);
            setTasks(combinedUserData.tasks || []);
            setStreaks(combinedUserData.streaks || []);

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
  }, []);

  const refreshUserData = async () => {
    if (!userData?.firebaseId) return;
    try {
      const res = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firebaseId: userData.firebaseId })
      });
      const dbUserData = await res.json();
      if (res.ok) {
        const combinedUserData = {
          firebaseId: userData.firebaseId,
          email: userData.email,
          emailVerified: userData.emailVerified,
          ...dbUserData
        };
        setUserData(combinedUserData);
        setTasks(combinedUserData.tasks || []);
        setStreaks(combinedUserData.streaks || []);
      }
    } catch (err) {
      console.error('Failed to refresh user', err);
    }
  };



  const contextValue = {
    userData,
    loading,
    error,
    tasks,
    streaks,
    setUpdatedTask,
    refreshUserData,
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