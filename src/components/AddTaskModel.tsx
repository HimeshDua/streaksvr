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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';

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
          variant="ghost"
          className="flex items-center gap-1 text-base font-medium hover:bg-accent/40 transition"
        >
          <Plus className="h-4 w-4" />
          New Task
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-background p-6 rounded-2xl border border-border max-w-md transition-all duration-300">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Create New Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleTaskSubmit} className="grid gap-4 mt-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              className="bg-input/10 placeholder-muted-foreground"
              ref={titleInputRef}
              placeholder="e.g. Finish dashboard UI"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              className="bg-input/10 placeholder-muted-foreground"
              placeholder="Add details (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className='w-full bg-input/10'>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent >
                  <SelectItem value="WORK">Work</SelectItem>
                  <SelectItem value="PERSONAL">Personal</SelectItem>
                  <SelectItem value="LEARNING">Learning</SelectItem>
                  <SelectItem value="OTHERS">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Priority</label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className='w-full bg-input/10'>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LOW">Low</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="HIGH">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 text-sm font-semibold transition active:scale-[0.98]"
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
