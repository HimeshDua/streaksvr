'use client';
import { useTasks } from "@/contexts/TasksProvider";
import { Skeleton } from "./ui/skeleton";
import formatTimeDifference from "@/hooks/formatTimeDifference";

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

export default function HomeTasksSection() {
    const { tasks, loading: tasksLoading } = useTasks();
    const pendingTasks: Task[] = tasks?.filter((task) => task.status === "PENDING");

    const TaskSkeleton = () => (
        <div className="space-y-4 w-full relative">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
                Your Pending Tasks
            </h2>
            <div className="text-muted-foreground">
                Loading your tasks...
            </div>
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-full border backdrop-blur-2xl rounded-md p-3 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <Skeleton className="h-5.5 w-2/3" />
                        <Skeleton className="h-5.5 w-10" />
                    </div>
                </div>
            ))}
        </div>
    );

    if (tasksLoading) return <TaskSkeleton />;

    return (
        <div className="space-y-2">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
                Your Pending Tasks
            </h2>

            {pendingTasks?.length === 0 && (
                <div className="text-muted-foreground">
                    No pending tasks yet. Add one above!
                </div>
            )}

            {pendingTasks?.map((task) => (
                <div
                    key={task.id}
                    className="group flex flex-col gap-1 border backdrop-blur-md px-3 py-2 rounded-md transition-all hover:shadow-sm"
                >
                    <div className="flex justify-between items-center">
                        <div className="text-sm font-medium text-foreground">{task.title}</div>
                        <div className="text-[10px] text-muted-foreground">
                            {formatTimeDifference(task.updatedAt)}
                        </div>
                    </div>

                    <div
                        className="text-xs text-muted-foreground max-h-0 opacity-0 overflow-hidden group-hover:max-h-40 group-hover:opacity-100 transition-all duration-300 ease-in-out"
                    >
                        {task.description || (
                            <span className="text-red-500 italic">No description provided.</span>
                        )}
                        <br />
                        {task.category || (
                            <span className="text-red-500 italic">No category provided.</span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
