'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import formatTimeDifference from '@/hooks/formatTimeDifference';

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

  return (

    <div className="w-full">
      <Separator className="mb-6" />

      <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-6 text-sm">
        <div>
          <h3 className="text-xs font-medium text-muted-foreground/70">Email</h3>
          <p className="text-foreground break-all">{user.email}</p>
        </div>
        <div>
          <h3 className="text-xs font-medium text-muted-foreground/70">Joined</h3>
          <p className="text-foreground">
            {formatTimeDifference(user.createdAt).split("ago").join("before")}
          </p>
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

      <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-6 text-sm">
        <Button variant="outline" className="rounded-lg text-sm" title="Username">
          @{user.username}
        </Button>
        <Button variant="outline" className="rounded-lg text-sm" title="Export your tasks">
          Export Tasks
        </Button>
      </div>
    </div>
  );
};

export default ProfileInfo;
