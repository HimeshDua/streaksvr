'use client';
import useTasks from "@/contexts/TasksContext";
import { Skeleton } from "./ui/skeleton";
import formatTimeDifference from "@/hooks/formatTimeDifference";

export default function HomeTasksSection() {
    const { tasks, loading: tasksLoading } = useTasks();

    const pendingTasks = tasks?.filter((task) => task.status === "PENDING");

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
                    className="group grid grid-cols-2 border backdrop-blur-md px-3 py-2 rounded-md transition-all"
                >
                    <div className="text-sm font-medium text-foreground">{task.title}</div>

                    <div className="text-xs text-muted-foreground mt-2">
                        Since: {formatTimeDifferencecha(task.updatedAt)}
                    </div>

                    {/* <div className="text-xs text-muted-foreground mt-1">
                        {task.status}
                    </div> */}

                    <div className={"mt-1 text-xs text-muted-foreground max-h-0 opacity-0 overflow-hidden group-hover:max-h-40 group-hover:opacity-100 transition-all duration-300 ease-in-out"}>
                        {task.description || <span className="text-red-600">no description</span>
                        }
                    </div>

                </div>
            ))}


        </div>
    );
}
