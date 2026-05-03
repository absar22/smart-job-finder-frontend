export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-main-orange/5 rounded-full blur-3xl -z-10" />

      <main className="max-w-5xl mx-auto px-6 py-16 md:py-24 text-center">
        
        {/* Small Highlight Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-main-orange/10 border border-main-orange/20 mb-10">
          <span className="w-2 h-2 rounded-full bg-main-orange animate-pulse" />
          <span className="text-xs font-black text-main-orange uppercase tracking-[0.2em]">
            Hiring Developers Worldwide
          </span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-gray-900 mb-8 leading-[0.9]">
          Land your <br />
          <span className="text-main-orange underline decoration-8 decoration-main-orange/20 underline-offset-8">
            Dream Gig
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
          The ultimate workspace for developers. <br className="hidden md:block" />
          No fluff. Just high-paying roles for top talent.
        </p>

        {/* Primary CTA Block */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="group relative px-10 py-5 bg-main-orange text-white rounded-2xl font-black text-lg uppercase tracking-tighter overflow-hidden transition-all hover:shadow-2xl hover:shadow-main-orange/40 active:scale-95">
            <span className="relative z-10 flex items-center gap-2">
              Start Searching 🚀
            </span>
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
          </button>

          <button className="px-10 py-5 bg-white text-gray-900 border-2 border-gray-200 rounded-2xl font-black text-lg uppercase tracking-tighter hover:border-main-orange hover:text-main-orange transition-all">
            Post a Vacancy
          </button>
        </div>

        {/* Minimal Social Proof */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
           <div className="font-black text-2xl italic tracking-tighter">TECHCORP</div>
           <div className="font-black text-2xl italic tracking-tighter">DEVSTREAM</div>
           <div className="font-black text-2xl italic tracking-tighter">STACKED</div>
           <div className="font-black text-2xl italic tracking-tighter">CODEBASE</div>
        </div>

      </main>
    </div>
  );
}