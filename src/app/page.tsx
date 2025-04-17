'use client';

import { useAuth } from '@/contexts/AuthContext';
import HomeTasksSection from '@/components/HomeTasks';
import HomeProfileMenu from '@/components/HomeProfileMenu';
import UnauthenticatedHomePage from '@/components/UnAuthenticatedHomePage';
import ProfileInfo from '@/components/ProfileInfo';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LogOutIcon, UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function HomePage() {
  const { isAuthenticated, userData, streaks } = useAuth();
  if (!isAuthenticated) return <UnauthenticatedHomePage />;
  const streakData = streaks[0]



  return (
    <div className="min-h-screen bg-background py-0">
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4" />
                  <span>{userData.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link
                    href={`/profile/${userData.username}`}
                    className="flex items-center gap-2"
                  >
                    <UserIcon className="w-4 h-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={async () => {
                    await signOut(auth);
                    window.location.href = '/';
                  }}
                >
                  <LogOutIcon className="w-4 h-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-primary drop-shadow-md">
              Streaksvr
            </h1>
            <p className="mt-2 text-muted-foreground text-base sm:text-lg">
              Build streaks. Crush goals. Stay consistent.
            </p>
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
