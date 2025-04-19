import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';

function UnauthenticatedNavbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="backdrop-blur-2xl mx-auto border-b border-border sticky top-0 z-50">
            <div className="container flex items-center justify-between h-16 px-4 mx-auto">
                <Link href="/" className="font-bold text-lg">
                    Streaksvr
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden sm:flex items-center space-x-4">
                    <Button variant="ghost" asChild>
                        <Link href="/" className="hover:text-primary transition-colors">
                            Home
                        </Link>
                    </Button>
                    <Button variant="ghost" asChild>
                        <Link href="/login" className="hover:text-primary transition-colors">
                            Login
                        </Link>
                    </Button>
                    <Button variant="ghost" asChild>
                        <Link href="/register" className="hover:text-primary transition-colors">
                            Register
                        </Link>
                    </Button>
                </nav>

                {/* Mobile Navigation Button */}
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                    <SheetTrigger asChild className="sm:hidden">
                        <Button variant="ghost" size="icon">
                            <MenuIcon className="h-5 w-5" />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-56 sm:w-64">
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>
                        </SheetHeader>
                        <nav className="flex flex-col space-y-4 mt-6">
                            <Button variant="ghost" asChild className="justify-start">
                                <Link href="/" className="w-full">
                                    Home
                                </Link>
                            </Button>
                            <Button variant="ghost" asChild className="justify-start">
                                <Link href="/login" className="w-full">
                                    Login
                                </Link>
                            </Button>
                            <Button variant="ghost" asChild className="justify-start">
                                <Link href="/register" className="w-full">
                                    Register
                                </Link>
                            </Button>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}

export default UnauthenticatedNavbar;
