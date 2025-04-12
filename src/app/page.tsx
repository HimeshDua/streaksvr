'use client';

import Link from 'next/link';
import { PlusCircle, ListChecks } from 'lucide-react';
import HomeTasksSection from '@/components/HomeTasks';
import HomeProfileMenu from '@/components/HomeProfileMenu';
import HomeButtons from '@/components/HomeButtons';

export default function HomePage() {

  return (
    <div className="min-h-screen bg-background py-10">
      <header className="px-4 sm:px-6 lg:px-8 flex justify-end items-center py-4">
        <HomeProfileMenu />
      </header>
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* 💥 BRANDING */}
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-primary drop-shadow-md">
              Streaksvr
            </h1>
            <p className="mt-2 text-muted-foreground text-base sm:text-lg">
              Build streaks. Crush goals. Stay consistent.
            </p>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Track Your Progress
          </h1>

          <HomeButtons />

          {/* <div className="space-y-2">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              Your Active Streaks
            </h2>
            <div className="text-muted-foreground">No streaks started yet. Start one above!</div>
            {streaks.map((streak) => (
              <div key={streak.id} className="rounded-md border p-4 bg-card text-card-foreground">
                {streak.name} - Current Streak: {streak.count}
              </div>
            ))} 
          </div> */}

          {/* Display Existing Tasks */}
          <HomeTasksSection />
        </div>
      </main>
      {/* Optional Bottom Navigation */}
      {/* <footer className="px-4 sm:px-6 lg:px-8 py-4 text-center text-muted-foreground text-sm">
        <Link href="/history" className="hover:underline mr-4">History</Link>
        <Link href="/settings" className="hover:underline">Settings</Link>
      </footer> */}
    </div>
  );
}