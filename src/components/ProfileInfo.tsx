'use client'; // Add 'use client' at the top

import React from 'react'; // Import React, since it's now a Client Component
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';

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

const ProfileInfo = ({user}: ProfileInfoProps) => {
  // Make it a regular function component
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const joinDate = new Date(user.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-background border border-border rounded-lg p-6 w-full max-w-md">
      <div className="flex items-center space-x-4 mb-6">
        <Avatar className="h-16 w-16">
          <AvatarImage src={undefined} alt={user.name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold text-foreground">{user.name}</h2>
          <p className="text-sm text-muted-foreground">@{user.username}</p>
        </div>
      </div>

      <Separator className="mb-6" />

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-6 text-sm">
        <div>
          <h3 className="font-medium text-muted-foreground">Email</h3>
          <p className="text-foreground break-all">{user.email}</p>
        </div>
        <div>
          <h3 className="font-medium text-muted-foreground">Joined</h3>
          <p className="text-foreground">{joinDate}</p>
        </div>
        <div>
          <h3 className="font-medium text-muted-foreground">Tasks</h3>
          <p className="text-foreground">{user.tasksCount}</p>
        </div>
        <div>
          <h3 className="font-medium text-muted-foreground">Email Verified</h3>
          <p className="text-foreground">{user.emailVerified ? 'Yes' : 'No'}</p>
        </div>
      </div>

      <Separator className="mb-6" />

      <div className="flex justify-end">
        <Button variant="outline">Export Tasks</Button>
      </div>
    </div>
  );
};

export default ProfileInfo;
