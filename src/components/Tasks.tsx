'use client';

import { Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
      <Card className="w-full border-dashed bg-muted/20">
        <CardHeader>
          <CardTitle className="text-lg">No Tasks</CardTitle>
          <CardDescription className="text-muted-foreground">
            There are no tasks to display.
          </CardDescription>
        </CardHeader>
        <CardContent>
          Create a new task or wait for one to be added.
        </CardContent>
      </Card>
    );
  }

  return (
    <ScrollArea className="h-full w-full space-y-4">
      {tasks.map((task) => {
        const createdDate = new Date(task.createdAt).toLocaleDateString();

        return (
          <Card key={task.id} className="w-full border bg-card shadow-sm">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-base font-semibold">
                  {task.title}
                </CardTitle>
                <Badge
                  variant={
                    task.status === 'COMPLETED'
                      ? 'default'
                      : task.status === 'FAILED'
                        ? 'destructive'
                        : 'secondary'
                  }
                  className="text-xs uppercase"
                >
                  {task.status}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-2">
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Created: {createdDate}</span>
              </div>

              {task.description && (
                <span>
                  {task.description}
                </span>
              )}
            </CardContent>
          </Card>
        );
      })}
    </ScrollArea>
  );
};

export default Tasks;