'use client';

import {
  HomeIcon,
  ListTodo,
  LogOutIcon,
  MenuIcon,
  UserIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import Link from 'next/link';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { useAuth } from '@/contexts/AuthContext';

function Navbar() {
  const { userData } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  return (
    <header className="backdrop-blur-2xl mx-auto border-b border-border sticky top-0 z-50">
      <div className="container flex items-center justify-between h-16 px-4">
        {/* Logo / Title */}
        <Link href="/" className="font-bold text-lg">
          Streaksvr
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/" className="flex items-center gap-2">
              <HomeIcon className="w-4 h-4" />
              <span>Home</span>
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <UserIcon className="w-4 h-4" />
                <span>{userData?.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/" className="flex items-center gap-2">
                  <HomeIcon className="w-4 h-4" />
                  Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/profile/${userData?.username}`} className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/profile/${userData?.username}/tasks`} className="flex items-center gap-2">
                  <ListTodo className="w-4 h-4" />
                  Tasks
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <button
                  onClick={async () => {
                    await signOut(auth);
                    window.location.href = '/';
                  }}
                  className="flex items-center gap-2 w-full text-left"
                >
                  <LogOutIcon className="w-4 h-4" />
                  Log out
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
            <Button variant="ghost" asChild className="justify-start gap-3">
              <Link href="/">
                <HomeIcon className="w-4 h-4" />
                Home
              </Link>
            </Button>

            <Button variant="ghost" asChild className="justify-start gap-3">
              <Link href={`/profile/${userData?.username}`}>
                <UserIcon className="w-4 h-4" />
                Profile
              </Link>
            </Button>

            <Button variant="ghost" asChild className="justify-start gap-3">
              <Link href={`/profile/${userData?.username}/tasks`}>
                <ListTodo className="w-4 h-4" />
                Tasks
              </Link>
            </Button>

            <Button
              variant="ghost"
              className="justify-start gap-3"
              onClick={async () => {
                await signOut(auth);
                setIsMobileMenuOpen(false);
                window.location.href = '/';
              }}
            >
              <LogOutIcon className="w-4 h-4" />
              Log out
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}

export default Navbar;
