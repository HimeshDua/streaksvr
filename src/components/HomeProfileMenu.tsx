"use client"
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

function HomeProfileMenu() {
    const { userData } = useAuth();
    const username = userData?.username;
    const name = userData?.name;

    return (
        <div>{userData.username ? (
            <Link href={`/profile/${username}`} className="text-sm text-muted-foreground hover:underline">
                {name}
            </Link>
        ) :
            <Link href="/signin" className="text-sm text-muted-foreground hover:underline">
                Sign In
            </Link>
        }
        </div>
    )
}

export default HomeProfileMenu