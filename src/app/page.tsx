'use client';

import {useAuth} from '@/contexts/AuthContext';
import HomeTasksSection from '@/components/HomeTasks';
import UnauthenticatedHomePage from '@/components/UnAuthenticatedHomePage';
import ProfileInfo from '@/components/ProfileInfo';

export default function HomePage() {
  const {isAuthenticated, userData, streaks} = useAuth();
  if (!isAuthenticated) return <UnauthenticatedHomePage />;

  const streakData =
    Array.isArray(streaks) && streaks.length > 0 ? streaks[0] : {};

  // chai pi lo friends
  return (
    <div className="min-h-screen bg-background py-0">
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-primary drop-shadow-md">
              Streaksvr
            </h1>
            <p className="mt-2 text-muted-foreground text-base sm:text-lg">
              Build streaks. Crush goals. Stay consistent.
            </p>
            <div className="flex justify-center relative p-8">
              {userData && (
                <ProfileInfo
                  user={{
                    name: userData.name,
                    username: userData.username,
                    email: userData.email,
                    createdAt: userData.createdAt,
                    tasksCount: userData.tasks?.length || 0
                  }}
                  streak={{
                    current: Number(streakData?.current || 0),
                    longest: Number(streakData?.longest || 0),
                    lastUpdated: streakData?.lastUpdated
                      ? new Date(streakData.lastUpdated || '')
                      : null
                  }}
                />
              )}
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Track Your Progress
          </h1>
          <HomeTasksSection />
        </div>
      </main>
    </div>
  );
}
