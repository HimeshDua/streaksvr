'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ListChecks, Loader2 } from "lucide-react";
import { useState } from "react";
import { useTasks } from "@/contexts/TasksProvider";

export default function AddTaskModal({ authorId }: { authorId: string }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { refetch } = useTasks();

    async function handleTaskSubmit(e: any) {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch("/api/tasks/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, description, authorId }),
            });

            if (!res.ok) throw new Error("Failed to submit task");

            setTitle("");
            setDescription("");
            await refetch();
            setOpen(false);
        } catch (error: any) {
            console.error("Error submitting task:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary" className="flex items-center gap-2">
                    <ListChecks className="h-4 w-4" />
                    Add Task
                </Button>
            </DialogTrigger>

            <DialogContent className="bg-card text-card-foreground p-6 rounded-xl border border-border">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-foreground">Create a new task</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleTaskSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Task title"
                        className="w-full rounded-md border border-border bg-input p-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Description (optional)"
                        className="w-full rounded-md border border-border bg-input p-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                    />
                    <Button type="submit" disabled={isLoading} className="w-full">
                        {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Saving...
                            </span>
                        ) : (
                            "Save Task"
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
