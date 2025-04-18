'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import { useAuth } from '@/contexts/AuthContext';
import SSRLoadingPage from './SSRLoadingPage';



export default function PageShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const homePaths = ['/', '/signup', '/signin', '/not-found'];
  const isHome = homePaths.includes(pathname);
  const { loading, isAuthenticated } = useAuth();

  if (loading) return <SSRLoadingPage />;

  return (
    <div >
      {isAuthenticated ? (
        <div className="flex overflow-hidden">
          <main className={`mx-auto w-full ${isHome ? 'mx-auto' : 'flex-1'}`}>
            {<Navbar />}
            {children}
          </main>
        </div>
      ) : (
        <div className="flex overflow-hidden">
          <main className={`mx-auto w-full ${isHome ? 'mx-auto' : 'flex-1'}`}>
            {children}
          </main>
        </div>
      )}
    </div>
  );
}
