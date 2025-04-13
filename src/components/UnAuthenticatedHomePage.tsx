import Link from 'next/link';

export default function UnauthenticatedHomePage() {
    return (
        <div className="min-h-screen bg-background py-10 flex flex-col justify-center items-center">
            <main className="px-4 sm:px-6 lg:px-8 py-8 text-center">
                <div className="max-w-md mx-auto space-y-6">
                    <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-primary drop-shadow-md">
                        Streaksvr
                    </h1>
                    <p className="mt-2 text-muted-foreground text-lg sm:text-xl">
                        Unlock your potential. Sign up or log in to start building streaks and achieving your goals.
                    </p>
                    <div className="space-x-4 mt-8">
                        <Link href="/signup" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2">
                            Sign up
                        </Link>
                        <Link href="/signin" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2">
                            Log in
                        </Link>
                    </div>
                    <p className="mt-6 text-muted-foreground text-sm">
                        Continue as a guest (limited features) - Coming Soon
                    </p>
                </div>
            </main>
            <footer className="px-4 sm:px-6 lg:px-8 py-4 text-center text-muted-foreground text-sm mt-8">
                © {new Date().getFullYear()} Streaksvr. All rights reserved.
            </footer>
        </div>
    );
}