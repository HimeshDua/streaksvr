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
  } | null;
}

const InfoItem = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div>
    <h3 className="text-xs truncate font-medium text-muted-foreground/70">{label}</h3>
    <p className="text-foreground break-words">{value}</p>
  </div>
);

const ProfileInfo = ({ user, streak }: ProfileInfoProps) => {
  const pathname = usePathname();
  const isUserProfilePage = pathname === `/profile/${user.username}`;

  return (
    <div className={`w-full ${isUserProfilePage ? "px-6 py-4" : ""}`}>

      {isUserProfilePage && (
        <h1 className={`text-3xl font-bold tracking-tight text-foreground sm:text-4xl ${isUserProfilePage ? "mb-6" : ""}`}>
          {user.name}
        </h1>
      )}

      <Separator className="mb-6" />

      <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-6 text-sm">
        <InfoItem label="Email" value={user.email} />
        <InfoItem label="Member Since" value={formatTimeDifference(new Date(user.createdAt)).replace("ago", "ago")} />
        <InfoItem label="Total Tasks" value={user.tasksCount} />
        <InfoItem label="Longest Streak" value={Number(streak?.longest) || 0} />
        <InfoItem label="Current Streak" value={Number(streak?.current) || 0} />
        <InfoItem
          label="Last Streak Update"
          value={streak?.lastUpdated ? formatTimeDifference(streak.lastUpdated) : 'Not yet started'}
        />
      </div>

      <Separator className="mb-6" />

      <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-6 text-sm">
        <Button variant="outline" className="rounded-lg text-sm" title="User Profile" asChild>
          {isUserProfilePage ? <span>@{user.username}</span> : <Link href={`/profile/${user.username}`}>@{user.username}</Link>}
        </Button>
        <Button variant="outline" className="rounded-lg text-sm" title="Export your tasks">
          Export Tasks
        </Button>
      </div>
    </div>
  );
};

export default ProfileInfo;
