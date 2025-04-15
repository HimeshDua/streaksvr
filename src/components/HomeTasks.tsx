'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from './ui/skeleton';
import formatTimeDifference from '@/hooks/formatTimeDifference';
import AddTaskModal from './AddTaskModel';
import { Edit, Eye, Check } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import UpperCaseFirstChar from '@/hooks/upperCaseFirstChar';

export default function HomeTasksSection() {
  const { userData, loading, tasks } = useAuth();
  const authorId = userData?.id;
  const [editingMode, setEditingMode] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState('');

  if (!userData) {
    return (
      <div className="text-muted-foreground">
        Please sign in to view your tasks. From Home Tasks
      </div>
    );
  }

  if (loading) return <TaskSkeleton />;

  const pendingTasks = tasks?.filter((task) => task.status === 'PENDING');

  function handleEditingMode() {
    setEditingMode(!editingMode);
  }

  function enableTaskEdit(taskId: string) {
    setEditingTaskId(taskId);
    console.log("Setting editingTaskId to:", taskId);
  }

  return (
    <div className="space-y-0 ">
      <article className="flex pb-0.5 flex-row justify-between items-center">
        {' '}
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Your Pending Tasks
        </h2>
        <article className="flex flex-row items-center gap-2">
          {' '}
          {/* Add */}
          <AddTaskModal authorId={authorId} />
          {/* Editing */}
          <Button
            className="flex flex-row justify-between items-center gap-1 font-medium cursor-pointer text-base transition-colors duration-200"
            variant="ghost"
            onClick={handleEditingMode}
          >
            {editingMode ? (
              <>
                <Check className="h-4 w-4" />
                Done
              </>
            ) : (
              <>
                <Edit className="h-4 w-4" />
                Edit
              </>
            )}
          </Button>
        </article>
      </article>

      <div className="">
        {tasks?.length === 0 ? (
          <div className="text-muted-foreground">
            No pending tasks yet. Add one above!
          </div>
        ) : (
          tasks.map((task, index) => (
            <button
              className={`group flex flex-col gap-1 border backdrop-blur-md px-3 py-2 transition-all hover:shadow-sm w-full
    ${index === 0 && 'rounded-t-md'}
    ${index === tasks.length - 1 && 'rounded-b-md'}
    ${editingMode && editingTaskId === task.id ? 'bg-green-50 border-green-200 hover:bg-green-200' : ''}
    ${editingMode && 'bg-green-50 border-green-200 hover:bg-green-200'}
    ${editingMode && editingTaskId !== task.id ? 'hover:bg-gray-100 cursor-pointer' : ''}
  `}
              key={task.id}
              onClick={() => editingMode && enableTaskEdit(task.id)}
            >
              {editingMode ? (
                <article className="grid grid-cols-4 text-[12px] justify-center items-center gap-2">
                  <div className="text-sm font-medium text-foreground">
                    {task.title}
                  </div>
                  <div className="truncate px-2">{task.description}</div>
                  <div>Category: {UpperCaseFirstChar(task.category)}</div>
                  <div>Status: {UpperCaseFirstChar(task.status)}</div>
                </article>
              ) : (
                <div className="flex justify-between items-center">
                  <div className="text-sm font-medium text-foreground">
                    {task.title}
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    {formatTimeDifference(task.updatedAt)}
                  </div>
                </div>
              )}
              {!editingMode && (
                <div className="text-xs flex flex-1/2 justify-between w-full text-muted-foreground max-h-0 opacity-0 overflow-hidden group-hover:max-h-40 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                  <span
                    className={`italic ${!task.description && 'text-red-500'}`}
                  >
                    {task.description || 'No description provided.'}
                  </span>
                  <span className="text-red-500 italic">
                    {UpperCaseFirstChar(task.category)}
                  </span>
                </div>
              )}
            </button>
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

      {Array.from({ length: 4 }).map((_, i) => (
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
