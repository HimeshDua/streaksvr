// components/UnauthenticatedHomePage.tsx
import Link from 'next/link';
import { Flame, Trophy, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';

const floatingCardVariants = {
    initial: { y: 20, opacity: 0 },
    animate: {
        y: [0, -12, 0],
        opacity: 1,
        transition: {
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse" as "reverse",
            ease: 'easeInOut'
        }
    }
};

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.4,
            ease: "easeOut",
        },
    }),
};

const floatAnim = {
    float: {
        y: [0, -5, 0], // up then back down
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
};

const mainTextVariants = {
    initial: { opacity: 0, y: -30 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: 'easeOut' }
    }
};

const backgroundBlob = {
    initial: { opacity: 0.1, scale: 1 },
    animate: {
        opacity: 0.2,
        scale: 1.1,
        transition: {
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse" as "reverse",
            ease: 'easeInOut'
        }
    }
};

const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
};

export default function UnauthenticatedHomePage() {
    return (
        <motion.div
            className="relative min-h-screen bg-background flex flex-col justify-between overflow-hidden"
            initial="initial"
            animate="animate"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Background glow blobs */}
            <motion.div
                className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
                variants={backgroundBlob}
                initial="initial"
                animate="animate"
                style={{
                    background: `radial-gradient(circle, var(--primary) 15%, transparent 70%)`
                }}
            />
            <motion.div
                className="absolute bottom-0 right-0 w-full h-full pointer-events-none z-0"
                variants={backgroundBlob}
                initial="initial"
                animate="animate"
                style={{
                    background: `radial-gradient(circle, var(--secondary) 10%, transparent 60%)`,
                    transform: 'scaleX(-1)'
                }}
            />

            {/* Floating Cards */}
            <motion.div
                className="hidden md:block absolute left-10 bottom-24 z-10"
                variants={floatingCardVariants}
                initial="initial"
                animate="animate"
            >
                <div className="bg-card/80 backdrop-blur-md border border-border rounded-xl p-4 w-52 shadow-lg">
                    <div className="text-sm font-semibold text-foreground">
                        Daily Meditation
                    </div>
                    <p className="text-xs mt-1 text-muted-foreground">
                        ✅ Completed • 7-day streak
                    </p>
                </div>
            </motion.div>

            <motion.div
                className="hidden md:block absolute right-12 bottom-20 z-10"
                variants={floatingCardVariants}
                initial="initial"
                animate="animate"
            >
                <div className="bg-card/80 backdrop-blur-md border border-border rounded-xl p-4 w-52 shadow-lg">
                    <div className="text-sm font-semibold text-foreground">
                        Read 5 Books
                    </div>
                    <p className="text-xs mt-1 text-muted-foreground">
                        📖 3/5 completed
                    </p>
                </div>
            </motion.div>

            {/* Heatmap */}
            <motion.div
                className="hidden md:block absolute left-1/7 top-28 -translate-x-1/2 z-10"
                custom={3}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    className="bg-card border border-border rounded-lg p-4 w-64 shadow-md"
                    variants={floatAnim}
                    animate="float"
                >
                    <div className="text-xs text-muted-foreground mb-2">
                        🔥 Weekly Streak Heatmap
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: 21 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className={`h-4 w-4 rounded-sm ${i % 5 === 0
                                    ? "bg-primary"
                                    : "bg-muted-foreground/20"
                                    }`}
                                variants={fadeUp}
                                custom={i * 0.05}
                                initial="hidden"
                                animate="visible"
                            />
                        ))}
                    </div>
                </motion.div>
            </motion.div>
            {/* Quote */}
            <motion.div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center w-full px-4"
                custom={4}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
            >
                <blockquote className="text-sm italic text-muted-foreground max-w-md mx-auto">
                    "Discipline is the bridge between goals and accomplishment."
                </blockquote>
            </motion.div>

            {/* Main Content */}
            <motion.main
                className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 z-10"
                variants={mainTextVariants}
                initial="initial"
                animate="animate"
            >
                <div className="max-w-xl w-full text-center space-y-8">
                    <motion.h1
                        className="text-5xl sm:text-6xl font-extrabold tracking-tight text-primary drop-shadow-glow"
                    >
                        Streaksvr
                    </motion.h1>
                    <motion.p
                        className="mt-3 text-muted-foreground text-base sm:text-lg"
                        variants={fadeUp}
                        custom={2}
                        initial="hidden"
                        animate="visible"
                    >
                        Unlock your potential. Sign up or log in to start building streaks and
                        achieving your goals.
                    </motion.p>

                    {/* Features */}
                    <motion.div
                        className="grid sm:grid-cols-3 gap-6 text-muted-foreground text-sm"
                        initial="hidden"
                        animate="visible"
                    >
                        {[Flame, Trophy, LayoutDashboard].map((Icon, idx) => (
                            <motion.div
                                key={idx}
                                className="flex flex-col items-center space-y-2"
                                variants={fadeUp}
                                custom={idx + 3}
                            >
                                <Icon className="w-6 h-6 text-primary" />
                                <span>
                                    {[
                                        'Daily Streak Tracking',
                                        'Goal-Based Rewards',
                                        'Clean, Minimal Dashboard'
                                    ][idx]}
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                        <motion.span
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <Link
                                href="/signup"
                                className="inline-flex items-center justify-center rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-button-hover-background active:bg-button-active-background px-5 py-2.5 shadow transition-colors duration-200"
                            >
                                Sign up
                            </Link>
                        </motion.span>

                        <motion.span
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <Link
                                href="/signin"
                                className="inline-flex items-center justify-center rounded-lg text-sm font-medium border border-border bg-background hover:bg-accent px-5 py-2.5 transition-colors duration-200"
                            >
                                Log in
                            </Link>
                        </motion.span>
                    </div>
                </div>
            </motion.main>
        </motion.div>
    );
}
