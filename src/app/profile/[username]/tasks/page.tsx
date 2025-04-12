'use client';

import Tasks from '@/components/Tasks';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useTasks } from '@/contexts/TasksProvider';

const TaskSkeleton = () => (
  <div className="space-y-4 w-full relative">

    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="w-full border backdrop-blur-2xl rounded-md p-3 shadow-sm">
        <div className="flex justify-between items-start mb-2">
          <Skeleton className="h-5.5 w-2/3" />
          <Skeleton className="h-5.5 w-10" />
        </div>
        <div className="space-y-2 mt-2">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-5 w-3/4" />
        </div>
      </div>
    ))}
  </div>
);

export default function TasksPage() {
  const { userData, loading: authLoading, error: authError } = useAuth();
  const { tasks, loading: tasksLoading } = useTasks();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !authError && !userData?.id) {
      router.push('/signin');
    }
  }, [authLoading, authError, userData, router]);

  if (authLoading) {
    return <div>Loading authentication...</div>;
  }

  if (authError) {
    return <div className="text-red-500">Authentication Error: {authError}</div>;
  }

  if (tasksLoading) {
    return (<div className='p-4'><TaskSkeleton /></div>);
  }

  return (
    <div className='p-4 relative'>
      <Tasks tasks={tasks} /></div>
  );
}