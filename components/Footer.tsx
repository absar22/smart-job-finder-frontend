"use client"
export default function Footer(){
    return (
        <footer className="text-center py-4 border-t text-sm text-gray-500">
            <h1 className="text-2xl font-bold">Job Finder</h1>
            <p>© {new Date().getFullYear()} Smart Job Finder. All rights reserved.</p>
        </footer>
    )
}