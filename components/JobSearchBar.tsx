"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"

interface JobSearchBarProps {
  onLocationChange: (location: string) => void;
}

export default function JobSearchBar({ onLocationChange }: JobSearchBarProps) {
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLocationChange(location.trim());
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex items-center gap-3 p-2 rounded-xl border w-full max-w-xl transition-all shadow-sm focus-within:ring-2"
      style={{
        background: "oklch(98% 0.01 42.6 / 0.6)",
        borderColor: "oklch(80% 0.02 42.6)",
      }}
    >

      <div className="flex items-center pl-2">
        <MapPin 
          size={20} 
          style={{ color: "oklch(70.2% 0.126 42.6)" }} 
          className="flex-shrink-0"
        />
      </div>
      <input
        type="text"
        placeholder="Search by city or country..."
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full bg-transparent border-none outline-none text-sm placeholder:text-gray-400 font-medium py-1.5"
        style={{ color: "oklch(20% 0.02 42.6)" }}
      />
      <button
        type="submit"
        className="px-5 py-2 rounded-lg font-bold text-sm tracking-wide transition-all active:scale-[0.97]"
        style={{
          background: "oklch(70.2% 0.126 42.6)",
          color: "#fff",
        }}
      >
        Search
      </button>
    </form>
  )
}