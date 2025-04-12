// components/AddTaskModal.tsx
'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ListChecks } from "lucide-react";
import { useState } from "react";
import { NextResponse } from "next/server";
import useTasks from "@/contexts/TasksContext";

export default function AddTaskModal({ authorId }: { authorId: string }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [open, setOpen] = useState(false);
    const { refetch } = useTasks();

    async function handleTaskSubmit(e: any) {
        e.preventDefault();
        try {
            const res = await fetch("/api/tasks/add", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description, authorId }),
            });
            if (!res.ok) {
                throw new Error("Failed to submit task");
            };

            setTitle("");
            setDescription("");
            setOpen(false);
            await refetch();

        } catch (error: any) {
            console.error("Error submiting task on home page", error)
            NextResponse.json({ error: error.message }, { status: 500 })
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default" className="flex items-center gap-2" asChild>
                    <span className="inline-flex cursor-pointer items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/90 h-10 px-4 py-2"
                    >
                        <ListChecks className="mr-2 h-4 w-4" />
                        Add New Task
                    </span>
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Task</DialogTitle>
                </DialogHeader>

                <form className="space-y-4" onSubmit={handleTaskSubmit}>
                    <input type="text" placeholder="Title" onChange={e => (setTitle(e.target.value))} value={title} className="w-full p-2 border rounded-md" />
                    <input type="text" placeholder="Description" onChange={e => (setDescription(e.target.value))} value={description} className="w-full p-2 border rounded-md" />
                    <Button type="submit">Save Task</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
