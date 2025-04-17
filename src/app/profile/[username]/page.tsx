'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProfileInfo from '@/components/ProfileInfo';
import { useAuth } from '@/contexts/AuthContext';

export default function UserProfile() {
  const { userData, tasks, error, streaks } = useAuth();
  const { username: usernameFromParams } = useParams();
  const router = useRouter();
  const streakData = streaks[0];

  useEffect(() => {
    if (userData && userData.username !== usernameFromParams) {
      router.push('/not-found');
    }
  }, [userData, usernameFromParams, router]);

  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!userData || userData.username !== usernameFromParams) return null;

  const { name, username, email, createdAt, emailVerified } = userData;

  return (
    <div className="flex justify-center relative p-8">
      <ProfileInfo
        user={{
          name: userData.name,
          username: userData.username,
          email: userData.email,
          createdAt: userData.createdAt,
          tasksCount: userData.tasks?.length || 0,
        }}
        streak={{
          current: Number(streakData.current),
          longest: Number(streakData.longest),
          lastUpdated: streakData.lastUpdated ? new Date(streakData.lastUpdated) : null,
        }}
      />
    </div>
  );
}
