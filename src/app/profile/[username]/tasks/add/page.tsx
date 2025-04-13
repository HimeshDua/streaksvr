'use client';

import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type FormData = {
  title: string;
  description: string;
};

function AddTask() {
  const { userData } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    if (!userData || !userData?.id) {
      toast("Authentication Error", {
        description: 'User not authenticated.'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/tasks/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, authorId: userData.id }),
      });

      if (response.ok) {
        toast("Task Added", {
          description: 'Your task has been added successfully.',
        });
        reset();
        router.refresh(); // Refresh the page to see the new task (if displayed elsewhere)
      } else {
        const errorData = await response.json();
        toast("Error Adding Task", {
          description: errorData?.error || 'Failed to add task.',
        });
      }
    } catch (error: any) {
      console.error('Error adding task:', error);
      toast("Unexpected Error", {
        description: 'An unexpected error occurred.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-background dark:bg-muted">
      <Card className="w-full max-w-md rounded-2xl p-6 shadow-lg border border-border bg-background">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-foreground">
            Add New Task
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-sm font-medium text-muted-foreground/80">
                Title
              </Label>
              <Input
                id="title"
                {...register('title', { required: 'Title is required' })}
                placeholder="Enter task title"
                className="rounded-lg border border-muted bg-background text-foreground"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-sm font-medium text-muted-foreground/80">
                Description
              </Label>
              <Input
                id="description"
                {...register('description')}
                placeholder="Enter task description (optional)"
                className="rounded-lg border border-muted bg-background text-foreground"
              />
            </div>
            <Button
              type="submit"
              className="w-full mt-4 rounded-lg text-sm"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Task'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>

  );
}

export default AddTask;