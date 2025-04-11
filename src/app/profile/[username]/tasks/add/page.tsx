'use client';

import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';

type FormData = {
  title: string;
  description: string;
  authorId: string;
};

function AddTask() {
  const { userData } = useAuth();
  console.log('hello hello \n', userData.uid);

  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    if (userData.uid) {
      handleTaskSubmit({ ...data, authorId: userData.id });
    }
  };

  async function handleTaskSubmit(data: FormData) {
    try {
      const res = await fetch('/api/tasks/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data) // Correctly send form data
      });
      const responseData = await res.json(); // Correctly parse JSON response
      console.log('Task added successfully:', responseData); // Consider adding user feedback here
    } catch (error) {
      console.error('Error adding task:', error); // Consider adding user feedback here
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          {...register('title', { required: true })}
          placeholder="Enter task title"
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          {...register('description', { required: true })}
          placeholder="Enter task description"
        />
      </div>
      <Button type="submit">Add Task</Button>
    </form>
  );
}

export default AddTask;
