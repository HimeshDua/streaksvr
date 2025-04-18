'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import latestTaskDisplay from '@/actions/latestTaskDisplay';

export default function AddTaskModal({ authorId }: { authorId: string }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('WORK');
  const [priority, setPriority] = useState('MEDIUM');
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { refreshUserData } = useAuth();
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (authorId === "") {
      console.error('Author ID is not provided');
      return;
    }

    if (open && titleInputRef.current) {
      titleInputRef.current.focus();
    } else {
      setTitle('');
      setDescription('');
      setCategory('WORK');
      setPriority('MEDIUM');
    }
  }, [open]);

  async function handleTaskSubmit(e: any) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/tasks/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          category,
          priority,
          authorId
        })
      });

      if (!res.ok) throw new Error('Failed to submit task');
      // const data = await res.json();
      // latestTaskDisplay(data);
      refreshUserData()
      // console.log('Task created successfully:', data);


      // await setUpdatedTask(data);
      setOpen(false);
    } catch (error) {
      console.error('Error submitting task:', error);
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="flex items-center gap-1 text-base font-medium"
          variant="ghost"
        >
          <Plus className="h-4 w-4" />
          New Task
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-card p-6 rounded-2xl border border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Create New Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleTaskSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Title</label>
            <input
              ref={titleInputRef}
              type="text"
              placeholder="Write something productive..."
              className="w-full rounded-lg border border-border bg-input p-3 text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Description</label>
            <textarea
              placeholder="Optional details"
              className="w-full rounded-lg border border-border bg-input p-3 text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Category</label>
              <select
                className="w-full rounded-lg border border-border bg-input p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="WORK">Work</option>
                <option value="PERSONAL">Personal</option>
                <option value="LEARNING">Learning</option>
                <option value="OTHERS">Others</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Priority</label>
              <select
                className="w-full rounded-lg border border-border bg-input p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 text-sm font-semibold"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </span>
            ) : (
              'Save Task'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );

}
