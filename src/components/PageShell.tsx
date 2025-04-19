'use client';

import React, { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import UnauthenticatedNavbar from './UnAuthNavbar';
import { useAuth } from '@/contexts/AuthContext';
import Footer from './Footer';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import LoadingPage from './LoadingPage'; // Corrected import
import NotFoundPage from './NotFound';

// Constants for allowed paths.  Using constants improves performance and readability
const UNAUTHENTICATED_PATHS = ['/', '/login', '/register'];
const AUTHENTICATED_PATHS = [
  '/',
  "/profile/",
  '/login',
  '/register',
];

export default function PageShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { userData, loading, isAuthenticated } = useAuth();
  const username = userData?.username;

  const is404 = useMemo(() => {
    if (loading) return false;

    if (isAuthenticated) {
      return !AUTHENTICATED_PATHS.some(authPath =>
        pathname === authPath ||
        (username && pathname.startsWith('/profile/'))
      );
    } else {
      return !UNAUTHENTICATED_PATHS.includes(pathname);
    }
  }, [pathname, isAuthenticated, username, loading]);

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

