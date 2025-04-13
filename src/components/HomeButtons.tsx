"use client"
import { useAuth } from "@/contexts/AuthContext";
import { ListChecks, PlusCircle } from "lucide-react"
import Link from "next/link"
import AddTaskModal from "./AddTaskModel";
import { useEffect } from "react";
import { notFound, useRouter } from "next/navigation";

function HomeButtons() {
    const { userData, loading, error } = useAuth();
    const username = userData?.username;
    const authorId = userData?.id;
    const router = useRouter();

    useEffect(() => {
        if (!loading && !userData) {
            router.push('/signin');
        }

        if (!loading && userData && !userData.username) {
            notFound();
        }
    }, [loading, userData, router]);

    if (loading) {
        return <div>Loading profile...</div>;
    }

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }


    return (
        <div className="flex space-x-4">
            <Link
                href={`/profile/${username}/streaks/add`}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
                <PlusCircle className="mr-2 h-4 w-4" />
                Start New Streak
            </Link>
            <AddTaskModal authorId={authorId} />
            {/* <Link
                href={`/profile/${username}/tasks/add`}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/90 h-10 px-4 py-2"
            >
                <ListChecks className="mr-2 h-4 w-4" />
                Add New Task
            </Link> */}
        </div>
    )
}

export default HomeButtons