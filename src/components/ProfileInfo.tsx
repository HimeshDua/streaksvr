'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface ProfileInfoProps {
  user: {
    name: string;
    username: string;
    email: string;
    createdAt: string;
    tasksCount: number;
    emailVerified: boolean;
  };
}

const ProfileInfo = ({ user }: ProfileInfoProps) => {
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const joinDate = new Date(user.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className=" border border-border backdrop-blur-md rounded-2xl bg-card/40 p-6 w-full max-w-md shadow-lg">
      <div className="flex items-center space-x-4 mb-6">
        <Avatar className="h-16 w-16 rounded-xl">
          <AvatarImage src={undefined} alt={user.name} />
          <AvatarFallback className="text-lg">{initials}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold text-foreground">{user.name}</h2>
          <p className="text-sm text-muted-foreground/80">@{user.username}</p>
        </div>
      </div>

      <Separator className="mb-6" />

      <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-6 text-sm">
        <div>
          <h3 className="text-xs font-medium text-muted-foreground/70">Email</h3>
          <p className="text-foreground break-all">{user.email}</p>
        </div>
        <div>
          <h3 className="text-xs font-medium text-muted-foreground/70">Joined</h3>
          <p className="text-foreground">{joinDate}</p>
        </div>
        <div>
          <h3 className="text-xs font-medium text-muted-foreground/70">Tasks</h3>
          <p className="text-foreground">{user.tasksCount}</p>
        </div>
        <div>
          <h3 className="text-xs font-medium text-muted-foreground/70">Email Verified</h3>
          <p className="text-foreground">{user.emailVerified ? 'Yes' : 'No'}</p>
        </div>
      </div>

      <Separator className="mb-6" />

      <div className="flex justify-end">
        <Button variant="outline" className="rounded-lg text-sm">
          Export Tasks
        </Button>
      </div>
    </div>
  );
};

export default ProfileInfo;
