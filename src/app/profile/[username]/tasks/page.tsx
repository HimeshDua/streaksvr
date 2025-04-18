'use client';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/contexts/AuthContext';
import formatTimeDifference from '@/hooks/formatTimeDifference';

type Task = {
  id: string;
  title: string;
  description?: string | null;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  dueDate?: string | null;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  category: "WORK" | "PERSONAL" | "LEARNING" | "OTHERS"
  createdAt: string;
  updatedAt: string;
  authorId: string;
};

const priorityColorMap: Record<Task['priority'], string> = {
  LOW: 'bg-green-500 text-green-50',
  MEDIUM: 'bg-yellow-500 text-yellow-50',
  HIGH: 'bg-red-500 text-red-50',
};

const categoryLabelMap: Record<Task['category'], string> = {
  WORK: 'Work',
  PERSONAL: 'Personal',
  LEARNING: 'Learning',
  OTHERS: 'Others',
};

const statusLabelMap: Record<Task['status'], string> = {
  COMPLETED: 'Completed',
  PENDING: 'Pending',
  FAILED: 'Failed',
};

const statusColorMap: Record<Task['status'], string> = {
  COMPLETED: 'bg-primary text-primary-foreground',
  PENDING: 'bg-secondary text-secondary-foreground',
  FAILED: 'bg-destructive text-destructive-foreground',
};

export default function TaskDetailsPage() {
  const { tasks, loading: tasksLoading } = useAuth();

  if (tasksLoading) {
    return (
      <div className="container mx-auto p-6 space-y-4">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">All Tasks</h1>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="border rounded-md p-4 shadow-sm" style={{ borderColor: 'var(--border)' }}>
              <Skeleton className="h-6 w-3/4 mb-2" />
              <div className="grid grid-cols-2 gap-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // i think ui is good
  return (
    <div className="w-full overflow-x-auto max-w-7xl mx-auto p-12">
      <h1 className="text-2xl font-bold tracking-tight text-foreground mb-4" style={{ color: 'var(--foreground)' }}>
        All Tasks
      </h1>

      <div className="overflow-y-auto border rounded-md p-4">
        <div className="min-w-[900px] grid grid-cols-[200px_100px_100px_150px_150px_200px_80px_1fr] gap-4 text-xs font-medium text-muted-foreground uppercase border-b w-fit pb-2">
          <span>Title</span>
          <span>Status</span>
          <span>Priority</span>
          <span>Category</span>
          <span>Updated</span>
          {/* <span>Done</span> */}
          <span>Description</span>
        </div>
        {tasks?.length === 0 && (
          <div className="text-muted-foreground">No tasks available.</div>
        )}


        {tasks?.map((task) => (

          <div
            key={task.id}
            className="grid items-center min-w-[900px] grid-cols-[200px_100px_100px_150px_150px_200px_80px_1fr] gap-4 py-2 border-b text-sm w-fit"

          >
            <span className="text-sm font-medium text-foreground w-[200px]">{task.title}</span>
            <Badge className={statusColorMap[task.status]}>{statusLabelMap[task.status]}</Badge>
            <Badge className={priorityColorMap[task.priority]}>{task.priority}</Badge>
            <span className="text-sm text-muted-foreground">{categoryLabelMap[task.category]}</span>
            <span className="text-sm text-muted-foreground">{formatTimeDifference(task.updatedAt)}</span>
            <p className={`text-sm ${task.description ? "text-muted-foreground" : "text-red-500 italic"} whitespace-nowrap`}>{task.description || "No description provided"}</p>
          </div>
        ))}
      </div>

    </div >
  );
}