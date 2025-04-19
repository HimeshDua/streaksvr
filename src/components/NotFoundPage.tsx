"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function NotFoundPage() {
    const router = useRouter()

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="h-[80vh] flex flex-col items-center justify-center text-center px-4"
        >
            <h1 className="text-4xl font-bold text-foreground">404 – Page Not Found</h1>
            <p className="text-muted-foreground mt-2 max-w-md">
                Oops. This page doesn’t exist or might have been moved. Let’s get you back on track.
            </p>

            <div className="mt-6 flex gap-3">
                <Button onClick={() => router.back()} variant="outline">
                    Go Back
                </Button>
                <Button onClick={() => router.push("/")}>
                    Go Home
                </Button>
            </div>
        </motion.div>
    )
}
