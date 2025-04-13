'use client';

import { usePathname, useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Navbar from './Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';

export default function PageShell({ children }: { children: React.ReactNode }) {
  const { userData, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const homePaths = ['/', '/signup', '/signin'];
  const isHome = homePaths.includes(pathname);

  useEffect(() => {
    if (!loading && !userData && !isHome) {
      router.push('/signup');
    }
  }, [loading, userData, isHome, router]);

  if (loading) return <div>Loading...</div>;

  // Only proceed if userData is available or it's a public home page
  if (!userData && !isHome) return null;

  return (
    <div className="flex overflow-hidden">
      {!isHome && <Sidebar />}
      <main className={`mx-auto w-full ${isHome ? 'mx-auto' : 'flex-1'}`}>
        {isHome && <Navbar />}
        {children}
      </main>
    </div>
  );
}