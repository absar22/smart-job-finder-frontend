"use client";
import Link from "next/link";
import React, { useRef } from "react";
import { useMeQuery, useLogoutMutation, useUploadProfileMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";

export default function Header() {
  const { data: user, isLoading, error } = useMeQuery(undefined);
  const [logout] = useLogoutMutation();
  const router = useRouter();
  const [uploadProfile] = useUploadProfileMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      router.refresh();
      router.push('/signin');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Optional: Add file validation
    if (!file.type.startsWith('image/')) {
      console.error('Please upload an image file');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      console.error('File too large (max 5MB)');
      return;
    }
    
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const result = await uploadProfile(formData).unwrap();
          console.log('Upload response:', result); 
   
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
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
              <Link
                href="/signin"
                className="px-5 py-2.5 text-white rounded-full font-black text-[13px] uppercase tracking-wider cursor-pointer transition-all hover:scale-105 active:scale-95 inline-block"
                style={{
                  background: "oklch(70.2% 0.126 42.6)",
                  fontFamily: "var(--font-inconsolata)",
                  boxShadow: "0 4px 16px oklch(70.2% 0.126 42.6 / 0.4)",
                }}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-5 py-2.5 text-white rounded-full font-black text-[13px] uppercase tracking-wider cursor-pointer transition-all hover:scale-105 active:scale-95 inline-block"
                style={{
                  background: "oklch(70.2% 0.126 42.6)",
                  fontFamily: "var(--font-inconsolata)",
                  boxShadow: "0 4px 16px oklch(70.2% 0.126 42.6 / 0.4)",
                }}
              >
                Register
              </Link>
            </>
          )}

          {user && (
            <div className="relative group">
              {/* Avatar with upload capability */}
             <div
            className="relative w-10 h-10 rounded-full overflow-hidden cursor-pointer bg-gray-200"
            onClick={() => fileInputRef.current?.click()}
          >
            {user?.user?.profileImage ? (
              <img
                src={user.user.profileImage}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sm font-bold text-white bg-blue-500">
                {user?.user?.name
                  ?.split(" ")
                  .map((word: string) => word[0])
                  .join("")
                  .toUpperCase()}
              </div>
            )}
          </div>
              
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-3 border-b">
                  <p className="font-semibold text-sm">
                    {user?.user?.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user?.user?.email}
                  </p>
                </div>

                <Link
                  href="/dashboard"
                  className="block px-4 py-3 text-sm hover:bg-gray-100"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}