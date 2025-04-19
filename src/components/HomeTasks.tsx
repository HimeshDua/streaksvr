'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from './ui/skeleton';
import formatTimeDifference from '@/hooks/formatTimeDifference';
import AddTaskModal from './AddTaskModel';
import { Edit, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import UpperCaseFirstChar from '@/hooks/upperCaseFirstChar';
import updateTask from '@/actions/updateTask.action';
import { set } from 'date-fns';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';

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

type StatusOptions = 'COMPLETED' | 'PENDING' | 'FAILED' | null;



export default function HomeTasksSection() {
  const { userData, tasks, setUpdatedTask } = useAuth();
  const [editingMode, setEditingMode] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  // initial inputs
  const [initialTitle, setInitialTitle] = useState<string | null | undefined>(null)
  const [initialDescription, setInitialDescription] = useState<string | undefined | null>(null)
  const [initialStatus, setInitialStatus] = useState<StatusOptions>(null)

  // edited inputs
  const [editedTitle, setEditedTitle] = useState<string | null | undefined>(null)
  const [editedDescription, setEditedDescription] = useState<string | undefined | null>(null)
  const [editedStatus, setEditedStatus] = useState<StatusOptions>(null)

  if (!userData) {
    return (
      <div className="text-muted-foreground">
        Please sign in to view your tasks. From Home Tasks
      </div>
    );
  }

  useEffect(() => {
    const thatTask = tasks.find((task) => task.id === editingTaskId);
    if (thatTask) {
      setInitialTitle(thatTask.title);
      setInitialDescription(thatTask.description);
      setInitialStatus(thatTask.status);
    }
  }, [editingTaskId, tasks.length]);


  // const pendingTasks = tasks?.filter((task) => task.status === 'PENDING');


  async function handleEditingMode() {

    if (!editingTaskId) return;

    if ((initialTitle ?? '') === (editedTitle ?? '') &&
      (initialDescription ?? '') === (editedDescription ?? '') &&
      (initialStatus ?? "") === (editedStatus ?? "")) {
      setEditingMode(!editingMode);
      setEditingTaskId(null);
      setEditedTitle(null);
      setEditedDescription(null);
      return;
    }


    const combinedData = {
      title: editedTitle || '',
      description: editedDescription || '',
      status: editedStatus ?? "PENDING"
    }


    if (editingMode && editingTaskId) {
      try {
        const updatedTaskFromServer = await updateTask(editingTaskId, combinedData);
        setUpdatedTask(updatedTaskFromServer)
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
    setEditingMode(!editingMode);
    setEditingTaskId(null);
    setEditedTitle(null);
    setEditedDescription(null);
  }

  function enableTaskEdit(taskId: string) {
    setEditingTaskId(taskId);

    const selectedTask = tasks.find(task => task.id === taskId);
    setEditedTitle(selectedTask?.title);
    setEditedDescription(selectedTask?.description);

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
          {/* Add */}
          <AddTaskModal authorId={userData.firebaseId} />
          {/* Editing */}
          <Button
            className="flex flex-row justify-between items-center gap-1 font-medium cursor-pointer text-base transition-colors duration-200"
            variant="ghost"
            onClick={editingMode && editingTaskId ? handleEditingMode : () => setEditingMode(!editingMode)}
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
            <div
              role='button'
              className={`group flex flex-col gap-1 border backdrop-blur-md px-3 py-2 transition-all hover:shadow-sm w-full
              ${task.status === 'PENDING' && 'border-l border-l-yellow-400'}
              ${task.status === 'COMPLETED' && ' border-l border-l-green-500'}
              ${task.status === 'FAILED' && ' border-l border-l-red-500'}

              ${index === 0 && 'rounded-t-md'}
              ${index === tasks.length - 1 && 'rounded-b-md'}
              ${editingMode && editingTaskId === task.id && 'bg-green-300'}
              ${editingMode && 'bg-green-50 border-green-200 hover:bg-green-200'}
              ${editingMode && editingTaskId !== task.id ? 'hover:bg-gray-100 cursor-pointer' : ''}`}
              key={task.id} onClick={() => editingMode && enableTaskEdit(task.id)}>

              {editingMode ? (
                editingTaskId === task.id ?
                  <article className="grid grid-cols-7 text-[12px] justify-center items-center gap-2">
                    <input autoFocus className="col-span-3 text-sm font-medium text-foreground text-center" onChange={e => setEditedTitle(e.target.value)} value={editedTitle || task.title} />

                    <input className="col-span-3 truncate px-2 text-center" onChange={e => setEditedDescription(e.target.value)} value={editedDescription ?? task.description ?? ''} />

                    <Select value={editedStatus || task.status} onValueChange={(value: string) => setEditedStatus(value as StatusOptions)}>
                      <SelectTrigger className="col-span-1 border-accent-foreground/30 rounded-sm flex gap-1 items-center text-center justify-center">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Task Status</SelectLabel>
                          <SelectItem value="COMPLETED">Completed</SelectItem>
                          <SelectItem value="PENDING">Pending</SelectItem>
                          <SelectItem value="FAILED">Failed</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                  </article> :
                  <article className="grid grid-cols-2 text-[12px] justify-center items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{task.title}</span>
                    <div className="truncate px-2">{task.description}</div>
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
                  <article className='flex flex-row gap-2 items-center'>

                    <span className={`text-xs italic font-medium
                  ${task.status === 'PENDING' && 'text-yellow-600'}
                  ${task.status === 'COMPLETED' && 'text-green-600'}
                  ${task.status === 'FAILED' && 'text-red-600'}`}>
                      {UpperCaseFirstChar(task.status)}
                    </span>
                    <span className="text-red-500 italic">
                      {UpperCaseFirstChar(task.category)}
                    </span>
                  </article>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div >
  );
}
