import Link from "next/link";
import Image from "next/image";
export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b-2 border-main-orange/10">
      <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
        
        <div className="flex items-center gap-2">
        
            <Image src="/image/appLogo.png" alt="Logo" width={50} height={40} className="rotate-3" />
          
          <span className="text-2xl font-black tracking-tighter text-gray-900">
            <Link href="/">JOB<span className="text-main-orange uppercase">Finder</span></Link>
          </span>
        </div>
        
        <nav className="hidden md:flex gap-8 font-bold text-sm uppercase tracking-widest text-gray-500">
          <Link href="/jobs" className="hover:text-main-orange transition-colors">Browse</Link>
          <Link href="/post" className="hover:text-main-orange transition-colors">Post Job</Link>
        </nav>

        <div className="flex gap-4">
          <button className="px-6 py-2.5 bg-main-orange text-white rounded-full font-black text-sm uppercase tracking-wider shadow-xl shadow-main-orange/30 hover:scale-105 active:scale-95 transition-all">
            Join Now
          </button>
        </div>

      </div>
    </header>
  );
}