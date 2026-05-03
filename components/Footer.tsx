"use client"
import Link from "next/link";
export default function Footer(){
    return (
         <footer className="border-t mt-12">
      <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center text-sm text-gray-600">
        
        <p>© {new Date().getFullYear()} Job Finder</p>

        <div className="flex gap-6">
          <Link href="/about" className="hover:text-black transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-black transition">
            Contact
          </Link>
        </div>

      </div>
    </footer>
    )
}