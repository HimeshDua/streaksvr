'use client';

import {
  HomeIcon,
  UserIcon,
  LogOutIcon,
  ListChecksIcon,
  PlusIcon,
  EyeIcon,
  MenuIcon
} from 'lucide-react';
import {usePathname} from 'next/navigation';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {onAuthStateChanged, signOut} from 'firebase/auth';
import {auth} from '@/lib/firebase';

import {Sheet, SheetTrigger, SheetContent} from '@/components/ui/sheet';
import {ScrollArea} from '@/components/ui/scroll-area';
import {Separator} from '@/components/ui/separator';
import {Button} from '@/components/ui/button';
import GithubIcon from './GithubIcon';
import ModeToggleFull from './ModeToggleFull';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  external?: boolean;
}

interface UserData {
  username: string;
  name: string;
}

export default function Sidebar() {
  const pathname = usePathname();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const res = await fetch('/api/auth/get-username', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({firebaseId: user.uid})
        });
        const data = await res.json();
        if (res.ok) setUserData(data);
        else setUserData(null);
      } else {
        setUserData(null);
      }
    });
    return () => unsub();
  }, []);

  const navItems: NavItem[] = [
    {label: 'Home', href: '/', icon: <HomeIcon className="h-5 w-5" />},
    {
      label: 'Tasks',
      href: '/tasks',
      icon: <ListChecksIcon className="h-5 w-5" />
    },
    {
      label: 'Add Task',
      href: '/tasks/add',
      icon: <PlusIcon className="h-5 w-5" />
    },
    {label: 'Reviews', href: '/reviews', icon: <EyeIcon className="h-5 w-5" />},
    {
      label: 'GitHub',
      href: 'https://github.com/HimeshDua/streaksvr',
      icon: <GithubIcon className="h-5 w-5" />,
      external: true
    }
  ];

  const renderNav = () => (
    <nav className="flex flex-col space-y-1">
      {navItems.map(({label, href, icon, external}) => {
        const isActive = pathname === href;
        return (
          <Button
            key={label}
            variant="ghost"
            size="sm"
            asChild
            className={`justify-start w-full ${
              isActive
                ? 'bg-accent text-accent-foreground'
                : 'hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            <Link
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-2 w-full"
            >
              {icon}
              <span>{label}</span>
            </Link>
          </Button>
        );
      })}
    </nav>
  );

  const userSection = userData ? (
    <Link
      href={`/profile/${userData.username}`}
      className="flex flex-col items-center space-y-1"
    >
      <Button variant={'outline'} className="w-full">
        <span className="text-sm font-medium text-foreground">
          {userData.name}
        </span>
        <span className="text-xs text-muted-foreground">
          @{userData.username}
        </span>
      </Button>
    </Link>
  ) : (
    <Link href="/signin">
      <Button variant="outline" className="w-full">
        Sign In
      </Button>
    </Link>
  );

  return (
    <>
      {/* Mobile: Menu button + Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden fixed top-4 left-4 z-50"
          >
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-64 p-4 bg-background text-foreground"
        >
          <ScrollArea className="flex flex-col h-full">
            <div className="mb-4">{userSection}</div>
            <Separator />
            {renderNav()}
            <Separator className="mt-auto" />
            {userData && (
              <Button
                variant="ghost"
                className="w-full justify-start mt-4"
                onClick={async () => {
                  await signOut(auth);
                  window.location.href = '/';
                }}
              >
                <LogOutIcon className="h-5 w-5 mr-2" />
                Log Out
              </Button>
            )}
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Desktop: Static sidebar */}
      <aside className="hidden md:flex flex-col w-80 h-screen border-r border-border bg-background text-foreground">
        <ScrollArea className="flex-1 p-4 flex flex-col">
          <div className="mb-6">{userSection}</div>
          <Separator />
          <div className="mt-4">{renderNav()}</div>
        </ScrollArea>
        <div className="p-4 space-y-2">
          <ModeToggleFull />
          {userData && (
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={async () => {
                await signOut(auth);
                window.location.href = '/';
              }}
            >
              <LogOutIcon className="h-5 w-5 mr-2" />
              Log Out
            </Button>
          )}
        </div>
      </aside>
    </>
  );
}
