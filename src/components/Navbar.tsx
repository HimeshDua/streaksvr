'use client';

import {
  BellIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
  UserIcon
} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {useEffect, useState} from 'react';
import Link from 'next/link';
import {useTheme} from 'next-themes';
import {signOut} from 'firebase/auth';
import {auth} from '@/lib/firebase';
import {Sheet, SheetContent, SheetHeader, SheetTitle} from './ui/sheet';
import {useAuth} from '@/contexts/AuthContext';

// interface UserData {
//   username: string;
//   firebaseId: string;
//   email: string;
//   name: string;
// }

function Navbar() {
  const {theme, setTheme} = useTheme();
  const {userData} = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-background mx-auto border-b border-border sticky top-0 z-50">
      <div className="container flex items-center mx-auto justify-between h-16 px-4">
        {/* Logo / Title */}
        <Link href="/" className="font-bold text-lg">
          Streaksvr
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center space-x-4">
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link href="/">
              <HomeIcon className="w-4 h-4" />
              <span>Home</span>
            </Link>
          </Button>

          {userData ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4" />
                  <span>{userData.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link
                    href={`/profile/${userData.username}`}
                    className="flex items-center gap-2"
                  >
                    <UserIcon className="w-4 h-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={async () => {
                    await signOut(auth);
                    window.location.href = '/';
                  }}
                >
                  <LogOutIcon className="w-4 h-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="default" asChild>
              <Link href="/signup">Sign In</Link>
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </nav>

        {/* Mobile Navigation Button */}
        <Button
          variant="ghost"
          size="icon"
          className="sm:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle mobile menu</span>
        </Button>
      </div>

      {/* Mobile Menu (Sheet) */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-full sm:w-64">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col space-y-4 mt-6">
            <Button
              variant="ghost"
              className="flex items-center gap-3 justify-start"
              asChild
            >
              <Link href="/">
                <HomeIcon className="w-4 h-4" />
                Home
              </Link>
            </Button>

            {userData ? (
              <>
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 justify-start"
                  asChild
                >
                  <Link href={`/profile/${userData.username}`}>
                    <UserIcon className="w-4 h-4" />
                    Profile
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 justify-start"
                  onClick={async () => {
                    await signOut(auth);
                    setIsMobileMenuOpen(false);
                    window.location.href = '/';
                  }}
                >
                  <LogOutIcon className="w-4 h-4" />
                  Log out
                </Button>
              </>
            ) : (
              <Button variant="default" className="w-full" asChild>
                <Link href="/signup">Sign In</Link>
              </Button>
            )}

            <Button
              variant="ghost"
              className="flex items-center gap-3 justify-start"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? (
                <SunIcon className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
              )}
              Theme
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}

export default Navbar;
