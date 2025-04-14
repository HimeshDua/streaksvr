'use client';

import { useAuth } from '@/contexts/AuthContext';
import HomeTasksSection from '@/components/HomeTasks';
import HomeProfileMenu from '@/components/HomeProfileMenu';
import HomeButtons from '@/components/HomeButtons';
import UserProfile from './profile/[username]/page';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import UnauthenticatedHomePage from '@/components/UnAuthenticatedHomePage';

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const pathsForUnAuthUser = ["/", "/signup", "/signin"];

  useEffect(() => {
    if (!isAuthenticated && !pathsForUnAuthUser.includes(pathname)) {
      router.push('/');
    }
    // if (isAuthenticated && pathname === '/') {
    //   router.push('/tasks');
    // }
  }, [isAuthenticated, pathname, router]);

  if (!isAuthenticated) return <UnauthenticatedHomePage />

  return (
    <div className="min-h-screen bg-background py-10">
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className='flex justify-end'>
            <HomeProfileMenu />
          </div>

          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-primary drop-shadow-md">
              Streaksvr
            </h1>
            <p className="mt-2 text-muted-foreground text-base sm:text-lg">
              Build streaks. Crush goals. Stay consistent.
            </p>
            <UserProfile />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Track Your Progress
          </h1>
          <div>
            {/* <HomeButtons /> */}
            <HomeTasksSection />
          </div>
        </div>
      </main>
      <footer className="px-4 sm:px-6 lg:px-8 py-4 text-center text-muted-foreground text-sm">
        <Link href="/signup" className="hover:underline mr-4">Sign up</Link>
        <Link href="/signin" className="hover:underline">Login</Link>
      </footer>
    </div>
  );
}