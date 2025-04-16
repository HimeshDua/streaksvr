'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Navbar from './Navbar';
import { AuthProvider, useAuth } from '@/contexts/AuthContext'; // Import the useAuth hook
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
        // <AuthProvider>
        <div className="flex overflow-hidden">
          {!isHome && <Sidebar />}
          <main className={`mx-auto w-full ${isHome ? 'mx-auto' : 'flex-1'}`}>
            {/* {isHome && <Navbar />} */}
            {children}
          </main>
        </div>
        // </AuthProvider>
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
