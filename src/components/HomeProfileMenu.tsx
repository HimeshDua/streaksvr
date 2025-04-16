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
                ""
            ) : (
                <Link
                    href="/signin"
                    className="text-sm text-muted-foreground hover:underline"
                >
                    Sign In
                </Link>
            )
            }
        </div >
    );
}

export default HomeProfileMenu;
