// components/PageShell.tsx
'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Navbar from './Navbar';
import { useAuth } from '@/contexts/AuthContext';

export default function PageShell({ children }: { children: React.ReactNode }) {
  const { userData } = useAuth()
  const homePaths = ['/', '/signup', '/signin', `/profile/d/${userData.username}`];
  const pathname = usePathname();
  const isHome = homePaths.includes(pathname);

  return (
    <div className="flex">
      {!isHome && <Sidebar />}
      <main className={`mx-auto w-full ${isHome ? 'mx-auto' : 'flex-1'}`}>
        {isHome && <Navbar />}
        {children}
      </main>
    </div>
  );
}
