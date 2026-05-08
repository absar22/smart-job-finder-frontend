"use client";
import Link from "next/link";
import React from "react";
import { useMeQuery, useLogoutMutation } from "@/redux/api/authApi";
import {useRouter} from "next/navigation";
export default function Header() {
  const {data:user,isLoading,error} = useMeQuery(undefined)
  const [logout] = useLogoutMutation()
  const router = useRouter()

  const handleLogout = async() => {
    try{
      await logout().unwrap()
      router.refresh() // Refresh to update the UI immediately
      router.push('/signin')
    }catch(err){
      console.error(err)
    }
  }
   if(isLoading){
     return <div>Loading...</div>
   }
   
  return (
    <header className="sticky top-0 z-50 bg-[oklch(98%_0.008_42.6/0.88)] backdrop-blur-md border-b border-[oklch(80%_0.02_42.6)]">
      <div className="max-w-6xl mx-auto px-6 h-17 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <div
            className="w-9 h-9 rounded-[10px] flex items-center justify-center text-white font-black text-base -rotate-3"
            style={{
              background: "oklch(70.2% 0.126 42.6)",
              fontFamily: "var(--font-syne)",
              boxShadow: "0 4px 12px oklch(70.2% 0.126 42.6 / 0.35)",
            }}
          >
            JF
          </div>
          <span
            className="text-xl font-extrabold tracking-tight text-gray-900"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            JOB<span style={{ color: "oklch(70.2% 0.126 42.6)" }}>Finder</span>
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex gap-8">
          {["Browse", "Companies", "Post Job"].map((item) => (
            <Link
              key={item}
              href={item === "Browse" ? "/jobs" : item === "Post Job" ? "/post" : "/companies"}
              className="text-[13px] font-bold uppercase tracking-[0.12em] text-gray-500 hover:text-gray-900 transition-colors no-underline"
            >
              {item}
            </Link>
          ))}
        </nav>
          

          {/* Auth buttons */}
         <div className="flex gap-2">
          {!user && (
           <>
        <button
          className="px-5 py-2.5 text-white rounded-full font-black text-[13px] uppercase tracking-wider cursor-pointer border-none transition-all hover:scale-105 active:scale-95"
          style={{
            background: "oklch(70.2% 0.126 42.6)",
            fontFamily: "var(--font-inconsolata)",
            boxShadow: "0 4px 16px oklch(70.2% 0.126 42.6 / 0.4)",
          }}
        >
          <Link href="/signin">Login</Link>
        </button>
        <button
          className="px-5 py-2.5 text-white rounded-full font-black text-[13px] uppercase tracking-wider cursor-pointer border-none transition-all hover:scale-105 active:scale-95"
          style={{
            background: "oklch(70.2% 0.126 42.6)",
            fontFamily: "var(--font-inconsolata)",
            boxShadow: "0 4px 16px oklch(70.2% 0.126 42.6 / 0.4)",
          }}
        >
          <Link href="/signup">Register</Link>
        </button>
         </>
      )}

          {user && (
            <>
              <button className="px-5 py-2.5 text-white rounded-full font-black text-[13px] uppercase"
                style={{ background: "oklch(40% 0.1 42.6)" }}>
                  <Link href="/dashboard">Dashboard</Link>
              </button>

              <button
                onClick={handleLogout}
                className="px-5 py-2.5 text-white rounded-full font-black text-[13px] uppercase"
                style={{ background: "red" }}>
                <Link href="/signin">Logout</Link>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}