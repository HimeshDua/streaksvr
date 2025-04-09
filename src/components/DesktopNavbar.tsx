'use client';
import {BellIcon, HomeIcon, UserIcon} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {onAuthStateChanged} from 'firebase/auth';
import Link from 'next/link';
import ModeToggle from './ModeToggle';
import {useEffect, useState} from 'react';
import {auth} from '@/lib/firebase';

interface UserData {
  username: string;
  firebaseId: string;
  email: string;
  name: string;
}

function DesktopNavbar() {
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
      <ModeToggle />

      <Button variant="ghost" className="flex items-center gap-2" asChild>
        <Link href="/">
          <HomeIcon className="w-4 h-4" />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>

      {userData ? (
        <>
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link href="/notifications">
              <BellIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Notifications</span>
            </Link>
          </Button>

          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link href={`/profile/${userData.username}`}>
              <UserIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Profile</span>
            </Link>
          </Button>
        </>
      ) : (
        <Button variant="ghost" className="flex items-center gap-2" asChild>
          <Link href="/signup">
            <UserIcon className="w-4 h-4" />
            <span className="hidden lg:inline">Sign Up</span>
          </Link>
        </Button>
      )}

      {/* <Button variant="default">Sign In</Button> */}
    </div>
  );
}

export default DesktopNavbar;
