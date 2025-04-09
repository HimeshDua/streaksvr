'use client';
import {BellIcon, HomeIcon, UserIcon} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {onAuthStateChanged, signOut} from 'firebase/auth';
import Link from 'next/link';
import ModeToggle from './ModeToggle';
import {useEffect, useState} from 'react';
import {auth} from '@/lib/firebase';
import GithubIcon from './GithubIcon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu';
import {Avatar, AvatarFallback, AvatarImage} from './ui/avatar';
import {Router} from 'next/router';

interface UserData {
  username: string;
  firebaseId: string;
  email: string;
  name: string;
}

function DesktopNavbar() {
  const router = Router;
  const [userData, setUserData] = useState<UserData | null>(null);

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
          console.error('Error fetching user:', data.error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="hidden md:flex items-center space-x-4">
      {userData ? (
        <>
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link href="/">
              <HomeIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Home</span>
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{userData.name}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link
                  href={`/profile/${userData.username}`}
                  className="flex items-center gap-2"
                >
                  <UserIcon className="w-4 h-4" />
                  <span className="hidden lg:inline">Profile</span>
                </Link>
              </DropdownMenuItem>{' '}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={async () => {
                  await signOut(auth);
                  setUserData(null);
                  window.location.href = '/';
                }}
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <Button variant="default" className="flex items-center gap-2" asChild>
          <Link href="/signup">Sign In</Link>
        </Button>
        // <Button variant="default">Sign In</Button>
      )}
      <ModeToggle />
      <Button variant="ghost" asChild>
        <Link href="https://github.com/HimeshDua/streaksvr">
          <GithubIcon className="h-[1.2rem]  w-[1.2rem]" />
        </Link>
      </Button>
    </div>
  );
}

export default DesktopNavbar;
