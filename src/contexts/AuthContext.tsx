'use client';

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  ReactNode
} from 'react';
import {auth} from '@/lib/firebase';
import {onAuthStateChanged} from 'firebase/auth';
import {useRouter} from 'next/navigation';

// Define the types
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
  comments: any[];
};

type AuthContextType = {
  userData: any;
  loading: boolean;
  error: string | null;
  tasks: Task[];
  refetchTasks: () => Promise<void>;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: {children: React.ReactNode}) {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchTasks = useCallback(async () => {
    if (!userData?.id) return;

    setLoading(true);
    try {
      const res = await fetch('/api/tasks/get', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({authorId: userData.id})
      });
      const data = await res.json();
      setTasks(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  }, [userData?.id]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      setError(null);
      setLoading(true);
      if (authUser) {
        setIsAuthenticated(true);
        try {
          const res = await fetch('/api/user', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({firebaseId: authUser.uid})
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
            await fetchTasks();
          } else {
            setError(dbUserData?.message || 'Failed to fetch user');
            setUserData(null);
            setIsAuthenticated(false); // Also set isAuthenticated to false on error
            setLoading(false);
            return;
          }
        } catch (err: any) {
          setError(err.message || 'Unknown error');
          setUserData(null);
          setIsAuthenticated(false); // Also set isAuthenticated to false on error
          setLoading(false);
          console.error('Error fetching user data', err);
          return;
        }
      } else {
        setUserData(null);
        setTasks([]);
        setIsAuthenticated(false); // Set isAuthenticated to false when no user
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router, fetchTasks]);

  const contextValue = {
    userData,
    loading,
    error,
    tasks,
    refetchTasks: fetchTasks,
    setTasks,
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
