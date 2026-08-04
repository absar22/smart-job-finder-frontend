"use client";

import JobCard from "./JobCard";
import { useGetJobsQuery } from "@/redux/api/jobApi";
import JobCardSkeleton from "./JobCardSkeleton";
import Link from "next/link";
import { useMeQuery } from "@/redux/api/authApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const THEME = {
  primary: "oklch(55% 0.15 25)",
  primaryLight: "oklch(97% 0.01 25)",
  primaryMuted: "oklch(70% 0.08 25)",
  text: "oklch(25% 0.01 260)",
  textMuted: "oklch(55% 0.02 260)",
  border: "oklch(90% 0.01 260)",
  surface: "oklch(100% 0 0)",
  surfaceAlt: "oklch(98% 0.005 260)",
} as const;

function EmptyState() {
  return (
    <div className="text-center py-20">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center text-2xl">
        🔍
      </div>
      <h3 className="text-lg font-semibold text-gray-900">No jobs found</h3>
      <p className="text-gray-500 mt-1">Check back later or browse all categories</p>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-red-50 flex items-center justify-center text-2xl">
          ⚠️
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h3>
        <p className="text-gray-500 mb-6 leading-relaxed">{message}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2.5 bg-gray-900 text-white rounded-xl font-medium text-sm hover:bg-gray-800 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const { data: me } = useMeQuery(undefined);
  const { data, isLoading, isError, error } = useGetJobsQuery({ page: 1, limit: 6 });

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <JobCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return <ErrorState message={error?.data?.message || "Failed to load jobs"} />;
  }

  if (!data?.jobs?.length) {
    return <EmptyState />;
  }

  const handlePostVacancy = () => {
    if (me?.user?.role !== "admin") {
      toast.error("Admin access required");
      return;
    }
    router.push("/admin/createjobs");
  };

  const jobs = data.jobs;

  return (
    <div className="relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${THEME.text} 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] -z-10 opacity-30"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${THEME.primaryLight}, transparent 70%)`,
        }}
      />

      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-16 items-center">
        {/* Left side */}
        <div>
          <h1
            className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
            style={{ fontFamily: "var(--font-syne)", color: THEME.text }}
          >
            Land your{" "}
            <span className="relative inline-block" style={{ color: THEME.primary }}>
              Dream Gig
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="8"
                viewBox="0 0 200 8"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 6 Q50 0 100 6 T200 6"
                  stroke={THEME.primary}
                  strokeWidth="3"
                  fill="none"
                  opacity="0.3"
                />
              </svg>
            </span>
          </h1>

          <p className="text-xl text-gray-500 leading-relaxed mb-8 max-w-md">
            The ultimate workspace for developers. No fluff — just high-paying roles
            matched to your skills.
          </p>

          <div className="flex gap-4 flex-wrap mb-10">
            <Link
              href="/jobs"
              className="px-8 py-4 text-white rounded-2xl font-bold text-base uppercase tracking-tight border-none cursor-pointer transition-all hover:scale-105 hover:shadow-2xl active:scale-95"
              style={{
                background: THEME.primary,
                boxShadow: `0 8px 24px ${THEME.primary.replace(")", " / 0.4)")}`,
              }}
            >
              Start browsing jobs 🚀
            </Link>
            <button
              onClick={handlePostVacancy}
              className="px-8 py-4 bg-white text-gray-900 border-2 rounded-2xl font-bold text-base uppercase tracking-tight cursor-pointer transition-all hover:shadow-md active:scale-95"
              style={{
                borderColor: THEME.border,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = THEME.primary;
                e.currentTarget.style.color = THEME.primary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = THEME.border;
                e.currentTarget.style.color = "";
              }}
            >
              Post a Vacancy
            </button>
          </div>

          {/* Trust bar */}
          <div
            className="flex items-center gap-6 pt-8 border-t"
            style={{ borderColor: THEME.border }}
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white bg-gray-200"
                />
              ))}
            </div>
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-900">2,400+ developers</span> found
              jobs this month
            </p>
          </div>
        </div>

        {/* Right – live ticker */}
        <div
          className="bg-white border rounded-2xl p-6 shadow-sm"
          style={{ borderColor: THEME.border }}
        >
          <div
            className="flex justify-between items-center pb-4 mb-2 border-b"
            style={{ borderColor: THEME.border }}
          >
            <span className="font-semibold text-sm" style={{ fontFamily: "var(--font-syne)" }}>
              Recently Posted
            </span>
            <span
              className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider"
              style={{ color: THEME.primary }}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ background: THEME.primary }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ background: THEME.primary }}
                />
              </span>
              Live feed
            </span>
          </div>

          <div className="space-y-1 max-h-[320px] overflow-hidden relative">
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />

            {jobs.slice(0, 5).map((j) => (
              <Link
                href={`/jobs/${j._id}`}
                key={j._id}
                className="flex items-center gap-3 py-3 px-2 -mx-2 rounded-lg transition-colors hover:bg-gray-50 group"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs shrink-0"
                  style={{
                    background: THEME.primaryLight,
                    color: THEME.primary,
                    fontFamily: "var(--font-syne)",
                  }}
                >
                  {j.company?.slice(0, 2).toUpperCase() || "CO"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900 truncate group-hover:opacity-70 transition-opacity">
                    {j.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {j.company} · {j.location}
                  </div>
                </div>
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 tabular-nums"
                  style={{
                    background: THEME.primaryLight,
                    color: THEME.primary,
                  }}
                >
                  ${j.salary?.toLocaleString()}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted by */}
      <div
        className="max-w-6xl mx-auto px-6 py-12 border-t"
        style={{ borderColor: THEME.border }}
      >
        <p className="text-center text-xs font-medium text-gray-400 uppercase tracking-widest mb-8">
          Trusted by teams at
        </p>
        <div className="flex gap-12 justify-center items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          {["Vercel", "Linear", "Notion", "Figma", "Raycast"].map((name) => (
            <span
              key={name}
              className="text-xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Jobs grid */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2
              className="text-2xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-syne)", color: THEME.text }}
            >
              Latest Opportunities
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Hand-picked roles for senior developers
            </p>
          </div>
          <Link
            href="/jobs"
            className="text-sm font-semibold hover:underline transition-all"
            style={{ color: THEME.primary }}
          >
            View all roles →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {jobs.map((job, index) => (
            <div
              key={job._id}
              className="opacity-0 animate-fade-in-up"
              style={{
                animationDelay: `${index * 75}ms`,
                animationFillMode: "forwards",
              }}
            >
              <JobCard job={job} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}