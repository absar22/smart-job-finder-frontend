"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useMeQuery, useLogoutMutation, useUploadProfileMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";

export default function Header() {
  const { data: user } = useMeQuery(undefined);
  const [logout] = useLogoutMutation();
  const router = useRouter();
  const [uploadProfile] = useUploadProfileMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      // router.refresh();
      router.push('/');
      setIsMenuOpen(false);
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[oklch(98%_0.008_42.6/0.88)] backdrop-blur-md border-b border-[oklch(80%_0.02_42.6)]">
      <div className="max-w-6xl mx-auto px-6 h-17 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline" onClick={closeMenu}>
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

        {/* Nav - Desktop */}
        <nav className="hidden md:flex gap-8">
          {["Browse", "Companies", "Post Job"].map((item) => (
            <Link
              key={item}
              href={item === "Browse" ? "/jobs" : item === "Post Job" ? "/admin/createjobs" : "/companies"}
              className="text-[13px] font-bold uppercase tracking-[0.12em] text-gray-500 hover:text-gray-900 transition-colors no-underline"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Auth buttons - Desktop */}
        <div className="hidden md:flex gap-2">
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
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

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
                  onClick={closeMenu}
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

        {/* Mobile Menu Button - Hamburger */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-gray-700 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu - Dropdown */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-white border-t border-gray-200 px-6 py-4 space-y-3">
          {/* Mobile Navigation Links */}
          <div className="flex flex-col space-y-3">
            {["Browse", "Companies", "Post Job"].map((item) => (
              <Link
                key={item}
                href={item === "Browse" ? "/jobs" : item === "Post Job" ? "/admin/createjobs" : "/companies"}
                className="text-[13px] font-bold uppercase tracking-[0.12em] text-gray-500 hover:text-gray-900 transition-colors no-underline py-2"
                onClick={closeMenu}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Mobile Auth Buttons */}
          <div className="border-t border-gray-200 pt-3 flex flex-col space-y-2">
            {!user && (
              <>
                <Link
                  href="/signin"
                  className="px-5 py-2.5 text-white rounded-full font-black text-[13px] uppercase tracking-wider cursor-pointer transition-all hover:scale-105 active:scale-95 text-center"
                  style={{
                    background: "oklch(70.2% 0.126 42.6)",
                    fontFamily: "var(--font-inconsolata)",
                    boxShadow: "0 4px 16px oklch(70.2% 0.126 42.6 / 0.4)",
                  }}
                  onClick={closeMenu}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-5 py-2.5 text-white rounded-full font-black text-[13px] uppercase tracking-wider cursor-pointer transition-all hover:scale-105 active:scale-95 text-center"
                  style={{
                    background: "oklch(70.2% 0.126 42.6)",
                    fontFamily: "var(--font-inconsolata)",
                    boxShadow: "0 4px 16px oklch(70.2% 0.126 42.6 / 0.4)",
                  }}
                  onClick={closeMenu}
                >
                  Register
                </Link>
              </>
            )}

            {user && (
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200 shrink-0">
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
                  <div>
                    <p className="font-semibold text-sm">
                      {user?.user?.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate max-w-[150px]">
                      {user?.user?.email}
                    </p>
                  </div>
                </div>
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-lg"
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}