'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from './ui/skeleton';
import formatTimeDifference from '@/hooks/formatTimeDifference';
import AddTaskModal from './AddTaskModel';
import { Edit, Check } from 'lucide-react';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import UpperCaseFirstChar from '@/hooks/upperCaseFirstChar';
import updateTask from '@/actions/updateTask.action';

type Task = {
  id: string;
  title: string;
  description?: string | null;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  isCompleted: boolean;
  dueDate?: string | null;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  category: "WORK" | "PERSONAL" | "LEARNING" | "OTHERS"
  createdAt: string;
  updatedAt: string;
  authorId: string;
};

export default function HomeTasksSection() {
  const { userData, loading, tasks } = useAuth();
  const authorId = userData?.id;
  const [editingMode, setEditingMode] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  // edited inputs
  const [editedTitle, setEditedTitle] = useState<string | null | undefined>(null)
  const [editedDescription, setEditedDescription] = useState<string | undefined | null>(null)
  const [editedCategory, setEditedCategory] = useState<Task['category'] | null>(null);
  const [editedStatus, setEditedStatus] = useState<Task['status'] | null>(null);


  if (!userData) {
    return (
      <div className="text-muted-foreground">
        Please sign in to view your tasks. From Home Tasks
      </div>
    );
  }

  if (loading) return <TaskSkeleton />;

  // const pendingTasks = tasks?.filter((task) => task.status === 'PENDING');


  function handleEditingMode() {

    const combinedData = {
      title: editedTitle || '',
      description: editedDescription || '',
      category: editedCategory || 'OTHERS',
      status: editedStatus || 'PENDING'
    }

    if (editingMode) {
      if (editingTaskId && combinedData) {
        updateTask(editingTaskId, combinedData);
        console.log(editingTaskId, combinedData)
      }

    }
    setEditingMode(!editingMode);
  }

  function enableTaskEdit(taskId: string) {
    setEditingTaskId(taskId);

    const selectedTask = tasks.find(task => task.id === taskId);
    setEditedTitle(selectedTask?.title);
    setEditedDescription(selectedTask?.description);

    console.log("Setting editingTaskId to:", taskId);
  }

  useEffect(() => {
    if (!editingMode) {
      setEditingTaskId(null);
      setEditedTitle(null);
      setEditedDescription(null);
    }
  }, [editingMode]);


  return (
    <div className="space-y-0 ">
      <article className="flex pb-0.5 flex-row justify-between items-center">
        {' '}
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          {editingMode ? "Editing Task Mode" : "Your Pending Tasks"}
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
              ${editingMode && editingTaskId === task.id && 'bg-green-300'}
              ${editingMode && 'bg-green-50 border-green-200 hover:bg-green-200'}
              ${editingMode && editingTaskId !== task.id ? 'hover:bg-gray-100 cursor-pointer' : ''}`}
              key={task.id} onClick={() => editingMode && enableTaskEdit(task.id)}>

              {editingMode ? (
                editingTaskId === task.id ?
                  <article className="grid grid-cols-4 text-[12px] justify-center items-center gap-2">
                    <input className="text-sm font-medium text-foreground text-center" onChange={e => setEditedTitle(e.target.value)} value={editedTitle || task.title} />
                    <input className="truncate px-2 text-center" onChange={e => setEditedDescription(e.target.value)} value={editedDescription ?? task.description ?? ''} />

                    <select
                      className="border rounded text-center"
                      value={editedCategory || task.category}
                      onChange={e => setEditedCategory(e.target.value as Task['category'])}
                    >
                      <option value="WORK">WORK</option>
                      <option value="PERSONAL">PERSONAL</option>
                      <option value="LEARNING">LEARNING</option>
                      <option value="OTHERS">OTHERS</option>
                    </select>
                    <select
                      className="border rounded text-center"
                      value={editedStatus || task.status}
                      onChange={e => setEditedStatus(e.target.value as Task['status'])}
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="FAILED">FAILED</option>
                    </select>

                  </article> :
                  <article className="grid grid-cols-4 text-[12px] justify-center items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{task.title}</span>
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

              {/* Hover extended sections */}
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
    </div >
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
