"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[oklch(80%_0.02_42.6)]">
      <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
        <p className="text-[13px] text-gray-500">
          © {new Date().getFullYear()} JobFinder — Built for developers, by developers.
        </p>
        <div className="flex gap-6">
          {["About", "Contact", "Privacy"].map((link) => (
            <Link
              key={link}
              href={`/${link.toLowerCase()}`}
              className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors no-underline"
            >
              {link}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}