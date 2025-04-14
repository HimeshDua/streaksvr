'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ListChecks, Loader2, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function AddTaskModal({ authorId }: { authorId: string }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("WORK");
    const [priority, setPriority] = useState("MEDIUM");
    const [dueDate, setDueDate] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const { refetchTasks } = useAuth();
    const titleInputRef = useRef<HTMLInputElement>(null);
    const status = "PENDING";
    const isCompleted = false;

    useEffect(() => {
        if (open && titleInputRef.current) {
            titleInputRef.current.focus();
        } else {
            setTitle("");
            setDescription("");
            setCategory("WORK");
            setPriority("MEDIUM");
            setDueDate("");
        }
    }, [open]);

    async function handleTaskSubmit(e: any) {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch("/api/tasks/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    description,
                    status,
                    isCompleted,
                    category,
                    priority,
                    dueDate,
                    authorId,
                }),

            });

            if (!res.ok) throw new Error("Failed to submit task");

            await refetchTasks();
            setOpen(false);
        } catch (error) {
            console.error("Error submitting task:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <span className="flex flex-row justify-between items-center gap-1 pr-1 font-medium cursor-pointer text-base" >
                    <Plus className="h-4 w-4" />
                    Add Task
                </span>
            </DialogTrigger>

            <DialogContent className="bg-card text-card-foreground p-6 rounded-xl border border-border">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-foreground">
                        Create a new task
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleTaskSubmit} className="space-y-4">
                    <input
                        ref={titleInputRef}
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

                    <div className="flex gap-4">
                        <select
                            className="flex-1 rounded-md border border-border bg-input p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="WORK">Work</option>
                            <option value="PERSONAL">Personal</option>
                            <option value="LEARNING">Learning</option>
                            <option value="HEALTH">Health</option>
                            <option value="HABIT">Habit</option>
                            <option value="PROJECT">Project</option>
                        </select>

                        <select
                            className="flex-1 rounded-md border border-border bg-input p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="LOW">Low</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HIGH">High</option>
                        </select>
                    </div>

                    <input
                        type="date"
                        className="w-full rounded-md border border-border bg-input p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
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
