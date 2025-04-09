// components/PageShell.tsx
'use client';

import {usePathname} from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Navbar from './Navbar';

export default function PageShell({children}: {children: React.ReactNode}) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <div className="flex">
      {!isHome && <Sidebar />}
      <main className={` mx-auto ${isHome ? 'mx-auto' : 'flex-1'}`}>
        {isHome && <Navbar />}
        {children}
      </main>
    </div>
  );
}
