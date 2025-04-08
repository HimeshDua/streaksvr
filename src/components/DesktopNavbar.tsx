'use client';
import {BellIcon, HomeIcon, UserIcon} from 'lucide-react';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import ModeToggle from './ModeToggle';
import {useEffect, useState} from 'react';
import {auth} from '@/lib/firebase';
import {prisma} from '@/lib/prisma';

interface UserData {
  username: string;
  firebaseId: string;
  email: string;
  name: string;
}

function DesktopNavbar() {
  const [userData, setUserData] = useState<UserData | null>(null); // user data state

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;

      if (user) {
        const userFromDb: any = await prisma.user.findUnique({
          where: {firebaseId: user.uid}
        });

        console.log('dbuser', userFromDb);

        if (userFromDb) {
          setUserData(userFromDb);
        } else {
          console.error('User not found in database.');
        }
      }
    };

    fetchUserData();
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

      <Button variant="default">Sign In</Button>
    </div>
  );
}

export default DesktopNavbar;
