'use client';

import {
  HomeIcon,
  ListTodo,
  LogOutIcon,
  MenuIcon,
  UserIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';

function Navbar() {
  const { userData } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogoutButtonClick = () => {
    setShowLogoutDialog(true);
    setIsMobileMenuOpen(false); // Close mobile menu if open
  };

  const handleCloseLogoutDialog = () => {
    setShowLogoutDialog(false)
  };

  return (
    <header className="backdrop-blur-2xl mx-auto border-b border-border sticky top-0 z-50">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        {/* Logo / Title */}
        <Link href="/" className="font-bold text-lg">
          Streaksvr
        </Link>


        {/* Logout Dialog + Overlay */}
        {showLogoutDialog && (
          <div className='fixed overflow-hidden inset-0 z-50 h-screen w-screen flex items-center justify-center bg-black/50'
            onClick={handleCloseLogoutDialog}>

            <div
              className="bg-background border border-border text-foreground rounded-xl shadow-2xl w-full max-w-md p-6 mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold tracking-tight">Confirm Logout</h3>
              <p className="mt-2 text-sm text-muted-foreground">Are you sure you want to logout?</p>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  className="px-4 py-2 h-10 text-sm border border-input rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                  onClick={handleCloseLogoutDialog}
                >
                  Cancel
                </button>
                <SimpleLogoutDialogInternal onClose={handleCloseLogoutDialog} />
              </div>
            </div>
          </div>
        )}

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
              <DropdownMenuItem onClick={handleLogoutButtonClick}>
                <LogOutIcon className="mr-2 h-4 w-4" />
                Log out
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

      {/* Mobile Menu (Sheet - Modified) */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-56 sm:w-64">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col space-y-2 mt-6">
            <Button variant="ghost" asChild className="justify-start">
              <Link href="/" className="flex items-center gap-2 w-full">
                <HomeIcon className="w-4 h-4" />
                Home
              </Link>
            </Button>

            <Button variant="ghost" asChild className="justify-start">
              <Link href={`/profile/${userData?.username}`} className="flex items-center gap-2 w-full">
                <UserIcon className="w-4 h-4" />
                Profile
              </Link>
            </Button>

            <Button variant="ghost" asChild className="justify-start">
              <Link href={`/profile/${userData?.username}/tasks`} className="flex items-center gap-2 w-full">
                <ListTodo className="w-4 h-4" />
                Tasks
              </Link>
            </Button>

            <Button
              variant="ghost"
              className="justify-start w-full"
              onClick={handleLogoutButtonClick}
            >
              <LogOutIcon className="w-4 h-4 mr-2" />
              Log out
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}

// Internal component to handle the actual logout logic
const
  SimpleLogoutDialogInternal = ({ onClose }: { onClose: () => void }) => {
    const router = useRouter();

    const handleConfirmLogout = async () => {
      try {
        await signOut(auth);
        console.log('Successfully logged out.');
        onClose();
        router.push('/');
      } catch (error) {
        console.error('Error during logout:', error);
        alert('An error occurred during logout.');
      }
    };

    return (
      <button
        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-red-500 text-white hover:bg-red-600 h-10 px-4 py-2"
        onClick={handleConfirmLogout}
      >
        Logout
      </button>
    );
  };

export default Navbar;