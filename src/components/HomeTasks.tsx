'use client';

import {useAuth} from '@/contexts/AuthContext';

import {Skeleton} from './ui/skeleton';

import formatTimeDifference from '@/hooks/formatTimeDifference';
import AddTaskModal from './AddTaskModel';

export default function HomeTasksSection() {
  const {userData, loading, tasks} = useAuth();
  const authorId = userData?.id;

  if (!userData) {
    return (
      <div className="text-muted-foreground">
        Please sign in to view your tasks. From Home Tasks
      </div>
    );
  }

  if (loading) return <TaskSkeleton />;

  // const pendingTasks = tasks?.filter((task) => task.status === 'PENDING');
  const pendingTasks = tasks;

  return (
    <div className="space-y-0">
      <article className="flex flex-row justify-between">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Your Pending Tasks
        </h2>
        <span className="flex justify-evenly">
          {/* <AddTaskModal authorId={authorId} /> */}
          <AddTaskModal authorId={authorId} />
        </span>
      </article>

      <div className="p-0">
        {pendingTasks?.length === 0 ? (
          <div className="text-muted-foreground">
            No pending tasks yet. Add one above!
          </div>
        ) : (
          pendingTasks.map((task, indx) => (
            <div
              key={task.id}
              className={`group flex flex-col gap-1 border backdrop-blur-md px-3 py-2 transition-all hover:shadow-sm
 

            ${indx === 0 && 'rounded-t-md'}
            

            ${indx === tasks.length - 1 && 'rounded-b-md'}
 
            
            `}
            >
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium text-foreground">
                  {task.title}
                </div>

                <div className="text-[10px] text-muted-foreground">
                  {formatTimeDifference(task.updatedAt)}
                </div>
              </div>

              {/*  occurs on hover */}
              <div className="text-xs text-muted-foreground max-h-0 opacity-0 overflow-hidden group-hover:max-h-40 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                {task.description || (
                  <span className="text-red-500 italic">
                    No description provided.
                  </span>
                )}
                <br />
                {task.category || (
                  <span className="text-red-500 italic">
                    No category provided.
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function TaskSkeleton() {
  return (
    <div className="space-y-4 w-full relative">
      <h2 className="text-lg font-semibold tracking-tight text-foreground">
        Your Pending Tasks
      </h2>

      <div className="text-muted-foreground">Loading your tasks...</div>

      {Array.from({length: 4}).map((_, i) => (
        <div
          key={i}
          className="w-full border backdrop-blur-2xl rounded-md p-3 shadow-sm"
        >
          <div className="flex justify-between items-start mb-2">
            <Skeleton className="h-5.5 w-2/3" />

            <Skeleton className="h-5.5 w-10" />
          </div>
        </div>
      ))}
    </div>
  );
}
