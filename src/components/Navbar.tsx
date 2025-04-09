'use client';

import {
  HomeIcon,
  UserIcon,
  LogOutIcon,
  ListChecksIcon,
  PlusIcon,
  EyeIcon,
  MenuIcon,
  XIcon
} from 'lucide-react';
import {ScrollArea} from '@/components/ui/scroll-area';
import {Separator} from '@/components/ui/separator';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {onAuthStateChanged, signOut} from 'firebase/auth';
import {auth} from '@/lib/firebase';
import {useEffect, useState} from 'react';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import GithubIcon from '@/components/GithubIcon';

interface UserData {
  username: string;
  name: string;
  // Add profileImageUrl if you have it
}

const Sidebar = () => {
  const pathname = usePathname();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const res = await fetch('/api/auth/get-username', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({firebaseId: user.uid})
        });
        const data = await res.json();
        if (res.ok) {
          setUserData(data);
        } else {
          console.error('Error fetching user data:', data.error);
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const navItems = [
    {
      label: 'Home',
      href: '/',
      icon: <HomeIcon className="h-4 w-4 mr-2" />
    },
    {
      label: 'Tasks',
      href: '/tasks',
      icon: <ListChecksIcon className="h-4 w-4 mr-2" />
    },
    {
      label: 'Add Task',
      href: '/tasks/add',
      icon: <PlusIcon className="h-4 w-4 mr-2" />
    },
    {
      label: 'Task Reviews',
      href: '/reviews',
      icon: <EyeIcon className="h-4 w-4 mr-2" />
    },
    {
      label: 'GitHub',
      href: 'YOUR_GITHUB_LINK', // Replace with your actual GitHub link
      icon: <GithubIcon className="h-4 w-4 mr-2" />,
      isExternal: true
    }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <XIcon className="h-5 w-5" />
        ) : (
          <MenuIcon className="h-5 w-5" />
        )}
      </Button>

      {/* Desktop Sidebar */}
      <div
        className={`hidden md:flex flex-col border-r border-border bg-secondary h-screen w-60 shrink-0 p-4`}
      >
        <ScrollArea className="flex-1 space-y-4">
          <div className="flex items-center justify-center py-2">
            {userData ? (
              <Link
                href={`/profile/${userData.username}`}
                className="flex flex-col items-center"
              >
                <Avatar>
                  <AvatarFallback>
                    {userData.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="mt-2 text-sm font-medium">
                  {userData.name}
                </span>
                <span className="mt-0.5 text-xs text-muted-foreground">
                  @{userData.username}
                </span>
              </Link>
            ) : (
              <div className="flex items-center justify-center">
                <Avatar>
                  <AvatarFallback>Guest</AvatarFallback>
                </Avatar>
                <span className="ml-2 text-sm font-medium">Guest</span>
              </div>
            )}
          </div>
          <Separator />
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                target={item.isExternal ? '_blank' : '_self'}
                rel={item.isExternal ? 'noopener noreferrer' : ''}
                className={`flex items-center text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md p-2 ${
                  pathname === item.href
                    ? 'bg-accent text-accent-foreground'
                    : ''
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
          <Separator />
          {userData && (
            <Button
              variant="outline"
              className="w-full mt-auto"
              onClick={async () => {
                await signOut(auth);
                setUserData(null);
                window.location.href = '/';
              }}
            >
              <LogOutIcon className="h-4 w-4 mr-2" />
              <span>Log Out</span>
            </Button>
          )}
        </ScrollArea>
      </div>

      {/* Mobile Sidebar (Drawer/Off-Canvas) */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-secondary border-r border-border z-40 transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <ScrollArea className="flex flex-col h-full p-4 space-y-4">
          <div className="flex items-center justify-between py-2">
            {userData ? (
              <Link
                href={`/profile/${userData.username}`}
                className="flex items-center"
              >
                <Avatar>
                  <AvatarFallback>
                    {userData.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-2">
                  <span className="text-sm font-medium">{userData.name}</span>
                  <span className="text-xs text-muted-foreground">
                    @{userData.username}
                  </span>
                </div>
              </Link>
            ) : (
              <div className="flex items-center">
                <Avatar>
                  <AvatarFallback>Guest</AvatarFallback>
                </Avatar>
                <span className="ml-2 text-sm font-medium">Guest</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <XIcon className="h-5 w-5" />
            </Button>
          </div>
          <Separator />
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                target={item.isExternal ? '_blank' : '_self'}
                rel={item.isExternal ? 'noopener noreferrer' : ''}
                className={`flex items-center text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md p-2 ${
                  pathname === item.href
                    ? 'bg-accent text-accent-foreground'
                    : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)} // Close menu on item click
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
          <Separator />
          {userData && (
            <Button
              variant="outline"
              className="w-full mt-auto"
              onClick={async () => {
                await signOut(auth);
                setUserData(null);
                setIsMobileMenuOpen(false); // Close menu after logout
                window.location.href = '/';
              }}
            >
              <LogOutIcon className="h-4 w-4 mr-2" />
              <span>Log Out</span>
            </Button>
          )}
        </ScrollArea>
      </div>
    </>
  );
};

export default Sidebar;
