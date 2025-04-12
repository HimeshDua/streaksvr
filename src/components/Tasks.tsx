'use client';

import { Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

type Task = {
  id: string;
  title: string;
  description?: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  createdAt: string;
};

type TasksProps = {
  tasks: Task[];
};

const Tasks: React.FC<TasksProps> = ({ tasks }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="w-full p-4 mx-2 rounded-md border-dashed bg-muted/20">
        <h3 className="text-sm font-medium">No Tasks</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Create a new task or wait for one to be added.
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="w-full space-y-2 pr-2">
      {tasks.map((task) => {
        const createdDate = new Date(task.createdAt).toLocaleDateString();

        return (
          <div
            key={task.id}
            className="w-full rounded-sm p-4 mb-3 bg-card border border-border shadow-md transition-colors hover:bg-muted/40"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-sm font-semibold text-foreground">{task.title}</h3>

              <Badge
                variant={
                  task.status === 'COMPLETED'
                    ? 'default'
                    : task.status === 'FAILED'
                      ? 'destructive'
                      : 'secondary'
                }
                className="text-[10px] px-2 py-0.5 uppercase tracking-wide rounded-full"
              >
                {task.status}
              </Badge>
            </div>

            <div className="flex items-center gap-1 text-xs text-muted-foreground/80 mb-1">
              <Calendar className="h-3 w-3 opacity-80" />
              <span>{createdDate}</span>
            </div>

            {task.description && (
              <p className="text-xs text-muted-foreground/90 leading-snug">
                {task.description}
              </p>
            )}
          </div>

        );
      })}
    </ScrollArea>
  );
};

export default Tasks;
