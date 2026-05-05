"use client";
import { useState } from "react";
import JobCard, { Job } from "./JobCard";

const SAMPLE_JOBS: Job[] = [
  {
    _id: "1",
    title: "Senior Frontend Engineer",
    company: "Vercel",
    location: "Remote",
    type: "Remote",
    salary: "$150k",
    description:
      "Build the future of web tooling. Work on cutting-edge React and Next.js infrastructure used by millions of developers globally.",
    color: "oklch(70.2% 0.126 42.6)",
    initials: "VC",
  },
  {
    _id: "2",
    title: "Full-Stack Engineer",
    company: "Linear",
    location: "San Francisco",
    type: "Full-time",
    salary: "$145k",
    description:
      "Shape the product engineering team at a design-first SaaS company. TypeScript, Node, Postgres. Small team, massive impact.",
    color: "#5e6ad2",
    initials: "LN",
  },
  {
    _id: "3",
    title: "Backend Engineer – Infra",
    company: "PlanetScale",
    location: "Remote",
    type: "Remote",
    salary: "$160k",
    description:
      "Scale distributed database infrastructure serving billions of queries. Deep expertise in Go and distributed systems required.",
    color: "#3ecf8e",
    initials: "PS",
  },
  {
    _id: "4",
    title: "React Native Developer",
    company: "Expo",
    location: "Remote",
    type: "Remote",
    salary: "$130k",
    description:
      "Join the core team building the most popular React Native toolchain. Help millions of mobile developers ship faster.",
    color: "#000",
    initials: "EX",
  },
  {
    _id: "5",
    title: "Staff Software Engineer",
    company: "Loom",
    location: "New York",
    type: "Full-time",
    salary: "$195k",
    description:
      "Lead complex multi-team projects. Extensive experience with video streaming, WebRTC, and real-time collaboration required.",
    color: "#625DF5",
    initials: "LM",
  },
  {
    _id: "6",
    title: "Contract Backend Dev",
    company: "Stripe",
    location: "Hybrid",
    type: "Contract",
    salary: "$200/hr",
    description:
      "6-month contract to migrate core payments APIs. Expert knowledge of Ruby on Rails and high-throughput financial systems.",
    color: "#6772e5",
    initials: "ST",
  },
];

const FILTERS = ["All", "Remote", "Full-time", "Contract"];

const TICKER = [
  { role: "TypeScript Lead", company: "Supabase", loc: "Remote", salary: "$165k", color: "#3ecf8e", initials: "SB" },
  { role: "DevOps Engineer", company: "Render", loc: "SF", salary: "$140k", color: "#46e3b7", initials: "RD" },
  { role: "React Developer", company: "Clerk", loc: "Remote", salary: "$125k", color: "#6c47ff", initials: "CK" },
  { role: "Go Engineer", company: "Fly.io", loc: "Remote", salary: "$155k", color: "#a855f7", initials: "FY" },
];

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? SAMPLE_JOBS
      : SAMPLE_JOBS.filter((j) => j.type === activeFilter);

  return (
    <div className="relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full -z-10 blur-3xl pointer-events-none"
        style={{ background: "oklch(70.2% 0.126 42.6 / 0.05)" }} />

      {/* ── HERO ── */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-16 items-center">

        {/* Left */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 text-[12px] font-black uppercase tracking-[0.15em]"
            style={{
              background: "oklch(70.2% 0.126 42.6 / 0.08)",
              borderColor: "oklch(70.2% 0.126 42.6 / 0.2)",
              color: "oklch(70.2% 0.126 42.6)",
            }}>
            <span className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: "oklch(70.2% 0.126 42.6)" }} />
            Hiring Developers Worldwide
          </div>

          {/* Headline */}
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.0] mb-6"
            style={{ fontFamily: "var(--font-syne)" }}>
            Land your{" "}
            <span className="relative inline-block" style={{ color: "oklch(70.2% 0.126 42.6)" }}>
              Dream Gig.
              <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded-sm"
                style={{ background: "oklch(70.2% 0.126 42.6 / 0.25)" }} />
            </span>
          </h1>

          <p className="text-xl text-gray-500 leading-relaxed mb-8 max-w-md">
            The ultimate workspace for developers. No fluff — just high-paying roles matched to your skills.
          </p>

          {/* CTAs */}
          <div className="flex gap-4 flex-wrap mb-10">
            <button className="px-8 py-4 text-white rounded-2xl font-black text-base uppercase tracking-tight border-none cursor-pointer transition-all hover:scale-105 hover:shadow-2xl active:scale-95"
              style={{
                background: "oklch(70.2% 0.126 42.6)",
                fontFamily: "var(--font-inconsolata)",
                boxShadow: "0 8px 24px oklch(70.2% 0.126 42.6 / 0.4)",
              }}>
              Start Searching 🚀
            </button>
            <button className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-200 rounded-2xl font-black text-base uppercase tracking-tight cursor-pointer transition-all hover:border-[oklch(70.2%_0.126_42.6)] hover:text-[oklch(70.2%_0.126_42.6)]"
              style={{ fontFamily: "var(--font-inconsolata)" }}>
              Post a Vacancy
            </button>
          </div>

          {/* Stats */}
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
          {TICKER.map((j) => (
            <div key={j.role} className="flex items-center gap-3 py-3 border-b border-[oklch(80%_0.02_42.6)] last:border-none">
              <div className="w-9 h-9 rounded-[10px] flex items-center justify-center font-black text-[12px] flex-shrink-0"
                style={{ background: `${j.color}22`, color: j.color, fontFamily: "var(--font-syne)" }}>
                {j.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-bold">{j.role}</div>
                <div className="text-[12px] text-gray-400">{j.company} · {j.loc}</div>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full flex-shrink-0"
                style={{
                  background: "oklch(70.2% 0.126 42.6 / 0.08)",
                  color: "oklch(70.2% 0.126 42.6)",
                  border: "1px solid oklch(70.2% 0.126 42.6 / 0.2)",
                }}>
                {j.salary}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── BRANDS ── */}
      <div className="max-w-6xl mx-auto px-6 py-6 border-t border-[oklch(80%_0.02_42.6)] flex gap-12 justify-center flex-wrap group">
        {["TECHCORP", "DEVSTREAM", "STACKED", "CODEBASE", "BUILDIT"].map((b) => (
          <span key={b}
            className="font-black text-base tracking-tighter text-gray-200 transition-colors duration-300 group-hover:text-gray-400 hover:!text-gray-900 cursor-default"
            style={{ fontFamily: "var(--font-syne)" }}>
            {b}
          </span>
        ))}
      </div>

      {/* ── FILTER BAR ── */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex gap-2.5 flex-wrap items-center bg-white border border-[oklch(80%_0.02_42.6)] rounded-2xl p-4">
          <div className="flex-1 min-w-[180px] flex items-center gap-2 border border-[oklch(80%_0.02_42.6)] rounded-xl px-3 py-2 bg-[oklch(98%_0.008_42.6)]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <span className="text-[13px] text-gray-400">Search roles, companies...</span>
          </div>
          {FILTERS.map((f) => (
            <button key={f}
              onClick={() => setActiveFilter(f)}
              className="px-4 py-1.5 rounded-full text-[12px] font-black uppercase tracking-wide border-[1.5px] cursor-pointer transition-all"
              style={{
                fontFamily: "var(--font-inconsolata)",
                background: activeFilter === f ? "oklch(70.2% 0.126 42.6)" : "transparent",
                color: activeFilter === f ? "#fff" : "oklch(55% 0.02 42.6)",
                borderColor: activeFilter === f ? "oklch(70.2% 0.126 42.6)" : "oklch(80% 0.02 42.6)",
              }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ── JOBS GRID ── */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-[13px] font-bold uppercase tracking-[0.1em] text-gray-400">
            Latest Opportunities
          </span>
          <div className="flex-1 h-px bg-[oklch(80%_0.02_42.6)]" />
          <span className="text-[12px] text-gray-400">{filtered.length} roles</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}