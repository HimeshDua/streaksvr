'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import formatTimeDifference from '@/hooks/formatTimeDifference';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ProfileInfoProps {
  user: {
    name: string;
    username: string;
    email: string;
    createdAt: string;
    tasksCount: number;
  };
  streak: {
    current: number;
    longest: number;
    lastUpdated: Date | null;
  } | null
}

const ProfileInfo = ({ user, streak }: ProfileInfoProps) => {

  const pathname = usePathname();
  const isDisabled = pathname === `/profile/${user.username}`;


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
            {formatTimeDifference(new Date(user.createdAt)).split("ago").join("before")}
          </p>
        </div>
        <div>
          <h3 className="text-xs font-medium text-muted-foreground/70">Tasks</h3>
          <p className="text-foreground">{user.tasksCount}</p>
        </div>
        <div>
          <h3 className="text-xs font-medium text-muted-foreground/70">Highest Streak {Number(streak?.longest) || 0}</h3>
          <p className="text-foreground">Current Count {Number(streak?.current) || 0}</p>
          <p className="text-foreground">{streak?.lastUpdated ? formatTimeDifference(streak.lastUpdated) : 'No data available'}
          </p>
        </div>
      </div>

      <Separator className="mb-6" />

      <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-6 text-sm">
        <Button variant="outline" className="rounded-lg text-sm" title="User Profile" asChild>
          {isDisabled ?
            <span>@{user.username}</span> :
            <Link href={`profile/${user.username}`}>
              @{user.username}
            </Link>
          }
        </Button>
        <Button variant="outline" className="rounded-lg text-sm" title="Export your tasks">
          Export Tasks
        </Button>
      </div>
    </div>
  );
};

export default ProfileInfo;
