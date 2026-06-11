"use client";
import JobCard from "./JobCard";
import { useGetJobsQuery } from "@/redux/api/jobApi";

export default function HomePage() {
  const {data, isLoading} = useGetJobsQuery({page: 1,limit:6});

 if(isLoading) return <div className="text-center py-4">Loading...</div>

const jobs = data?.jobs || [];
  return (
    <div className="relative overflow-hidden">
      <div className="absolute top-0 right-0 w-150 h-150 rounded-full -z-10 blur-3xl pointer-events-none"
        style={{ background: "oklch(70.2% 0.126 42.6 / 0.05)" }} />

      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-16 items-center">

        {/* left side */}
        <div>  
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight leading-none mb-6"
            style={{ fontFamily: "var(--font-syne)" }}>
            Land your{" "}
            <span className="relative inline-block" style={{ color: "oklch(70.2% 0.126 42.6)" }}>
              Dream Gig.
              <span className="absolute bottom-0 left-0 right-0 h-0.75 rounded-sm"
                style={{ background: "oklch(70.2% 0.126 42.6 / 0.25)" }} />
            </span>
          </h1>

          <p className="text-xl text-gray-500 leading-relaxed mb-8 max-w-md">
            The ultimate workspace for developers. No fluff — just high-paying roles matched to your skills.
          </p>

       
          <div className="flex gap-4 flex-wrap mb-10">
            <button className="px-8 py-4 text-white rounded-2xl font-black text-base uppercase tracking-tight border-none cursor-pointer transition-all hover:scale-105 hover:shadow-2xl active:scale-95"
              style={{
                background: "oklch(70.2% 0.126 42.6)",
                fontFamily: "var(--font-inconsolata)",
                boxShadow: "0 8px 24px oklch(70.2% 0.126 42.6 / 0.4)",
              }}>
              Start browsing jobs 🚀
            </button>
            <button className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-200 rounded-2xl font-black text-base uppercase tracking-tight cursor-pointer transition-all hover:border-[oklch(70.2%_0.126_42.6)] hover:text-[oklch(70.2%_0.126_42.6)]"
              style={{ fontFamily: "var(--font-inconsolata)" }}>
              Post a Vacancy
            </button>
          </div>

          {/* status */}
          <div className="flex gap-8">
            {[
              { num: "4,200+", label: "Active Jobs" },
              { num: "830+", label: "Companies" },
              { num: "$120k+", label: "Avg Salary" },
            ].map((s) => (
              <div key={s.label} className="pl-3 border-l-[3px]"
                style={{ borderColor: "oklch(70.2% 0.126 42.6)" }}>
                <div className="font-extrabold text-2xl" style={{ fontFamily: "var(--font-syne)" }}>{s.num}</div>
                <div className="text-[12px] text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right – live ticker */}
        <div className="bg-white border border-[oklch(80%_0.02_42.6)] rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-center pb-4 mb-2 border-b border-[oklch(80%_0.02_42.6)]">
            <span className="font-bold text-[14px]" style={{ fontFamily: "var(--font-syne)" }}>
              Recently Posted
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest"
              style={{ color: "oklch(70.2% 0.126 42.6)" }}>
              <span className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "oklch(70.2% 0.126 42.6)" }} />
              Live
            </span>
          </div>
        {data?.jobs.map((j) => (
  <div
    key={j._id}
    className="flex items-center gap-3 py-3 border-b border-[oklch(80%_0.02_42.6)] last:border-none"
  >
    <div
      className="w-9 h-9 rounded-[10px] flex items-center justify-center font-black text-[12px] shrink-0 bg-orange-100 text-orange-600"
      style={{ fontFamily: "var(--font-syne)" }}
    >
      {j.company.slice(0, 2).toUpperCase()}
    </div>

    <div className="flex-1 min-w-0">
      <div className="text-[13px] font-bold">{j.title}</div>
      <div className="text-[12px] text-gray-400">
        {j.company} · {j.location}
      </div>
    </div>

    <span
      className="text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0"
      style={{
        background: "oklch(70.2% 0.126 42.6 / 0.08)",
        color: "oklch(70.2% 0.126 42.6)",
        border: "1px solid oklch(70.2% 0.126 42.6 / 0.2)",
      }}
    >
      ${j.salary}
    </span>
  </div>
))}
        </div>
      </section>

      {/* brands */}
      <div className="max-w-6xl mx-auto px-6 py-6 border-t border-[oklch(80%_0.02_42.6)] flex gap-12 justify-center flex-wrap group">
        {["TECHCORP", "DEVSTREAM", "STACKED", "CODEBASE", "BUILDIT"].map((b) => (
          <span key={b}
            className="font-black text-base tracking-tighter text-gray-200 transition-colors duration-300 group-hover:text-gray-400 hover:text-gray-900 cursor-default"
            style={{ fontFamily: "var(--font-syne)" }}>
            {b}
          </span>
        ))}
      </div>
      {/* jobs grid */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-[13px] font-bold uppercase tracking-widest text-gray-400">
            Latest Opportunities
          </span>
          <div className="flex-1 h-px bg-[oklch(80%_0.02_42.6)]" />
          <span className="text-[12px] text-gray-400">{jobs.length} roles</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}