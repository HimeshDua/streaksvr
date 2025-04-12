'use client';

import { Calendar, CheckCircle, Flag, FolderKanban, ListChecks, Tag, Trash2, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

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

type TasksProps = {
  tasks: Task[];
  // onUpdateTaskStatus: (taskId: string, newStatus: Task['status']) => void;
};

const Tasks: React.FC<TasksProps> = ({ tasks }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="w-full p-4 mx-2 rounded-md border border-dashed bg-muted/20">
        <h3 className="text-sm font-medium">No Tasks</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Create a new task or wait for one to be added.
        </p>
      </div>
    );
  }

  const handleStatusUpdate = (taskId: string, newStatus: Task['status']) => {
    // onUpdateTaskStatus(taskId, newStatus);
  };

  return (
    <ScrollArea className="w-full space-y-3 pr-2">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="w-full p-3 rounded-md border bg-muted/10 space-y-2"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-foreground">{task.title}</h3>
            <Badge
              variant={
                task.status === 'COMPLETED'
                  ? 'default'
                  : task.status === 'FAILED'
                    ? 'destructive'
                    : 'secondary'
              }
              className="text-[10px] px-2 py-0.5 uppercase tracking-wide rounded-sm"
            >
              {task.status}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Flag className="h-3 w-3" />
              <span>{task.priority} Priority</span>
            </div>
            <div className="flex items-center gap-1">
              <FolderKanban className="h-3 w-3" />
              {/* <span>{task.category.toLowerCase().replace('_', ' ')}</span> */}
            </div>
            <div className="flex items-center gap-1">
              <ListChecks className="h-3 w-3" />
              <span>{task.isCompleted ? 'Completed' : 'Not Completed'}</span>
            </div>
          </div>

          <div className="text-xs text-muted-foreground whitespace-pre-wrap">
            {task.description || <span className="italic text-red-500">No description</span>}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Update Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <DropdownMenuItem onClick={() => handleStatusUpdate(task.id, 'PENDING')}>
                <ListChecks className="mr-2 h-4 w-4" /> Pending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusUpdate(task.id, 'COMPLETED')}>
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Completed
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusUpdate(task.id, 'FAILED')}>
                <XCircle className="mr-2 h-4 w-4 text-red-500" /> Failed
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </ScrollArea>
  );
};

export default Tasks;