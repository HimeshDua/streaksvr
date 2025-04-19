'use client';

import React, { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import UnauthenticatedNavbar from './UnAuthNavbar';
import { useAuth } from '@/contexts/AuthContext';
import Footer from './Footer';
import LoadingPage from './LoadingPage';
import NotFoundPage from './NotFoundPage';

const UNAUTHENTICATED_PATHS = ['/', '/login', '/register'];
const AUTHENTICATED_PATHS = ['/', "/profile/", '/login', '/register'];

export default function PageShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { loading, isAuthenticated } = useAuth();

  const is404 = useMemo(() => {
    if (loading) return false;

    if (isAuthenticated) {
      return !AUTHENTICATED_PATHS.some(authPath =>
        pathname === authPath || (pathname.startsWith('/profile/'))
      );
    } else {
      return !UNAUTHENTICATED_PATHS.includes(pathname);
    }
  }, [pathname, isAuthenticated, loading]);

  if (is404) {
    return (
      <div>
        {isAuthenticated ? <Navbar /> : <UnauthenticatedNavbar />}
        <NotFoundPage />
      </div>
    );
  }

  if (loading) return <LoadingPage />;

  return (
    <div>
      {isAuthenticated ? (
        <div className="flex overflow-hidden">
          <main className="mx-auto w-full flex-1">
            <Navbar />
            {children}
            <Footer />
          </main>
        </div>
      ) : (
        <div className="flex overflow-hidden">
          <main className="mx-auto w-full flex-1">
            <UnauthenticatedNavbar />
            {children}
          </main>
        </div>
      )}
    </div>
  );
}

