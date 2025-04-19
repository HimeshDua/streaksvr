import React from 'react'

function Footer() {
    return (
        <footer className="w-full border-t border-border py-6 px-4 md:px-8 mt-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">

                <a href='/' className="font-semibold text-foreground">Streaksvr</a>

                <a href="https://github.com/HimeshDua">Himesh Dua</a>
            </div>
        </footer>

    )
}

export default Footer