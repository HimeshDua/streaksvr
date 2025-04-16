'use client';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { LogOutIcon, UserIcon } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

function HomeProfileMenu() {
    const { userData } = useAuth();
    const { username, name } = userData;

    return (
        <div>
            {userData ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-2">
                            <UserIcon className="w-4 h-4" />
                            <span>{name}</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                            <Link
                                href={`/profile/${username}`}
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
                <Link
                    href="/signin"
                    className="text-sm text-muted-foreground hover:underline"
                >
                    Sign In
                </Link>
            )}
        </div>
    );
}

export default HomeProfileMenu;
