"use client";

import Link from "next/link";
import JobCard from "@/components/JobCard";
import { useGetJobsQuery } from "@/redux/api/jobApi";

const LIMIT = 5;

export default function JobsClient({ page }: { page: number }) {
  const { data, isLoading, isError } = useGetJobsQuery({ page, limit: LIMIT });

  if (isLoading) {
    return (
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-gray-500">Loading jobs…</div>
      </main>
    );
  }

  if (isError || !data) {
    return (
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-red-600">Failed to load jobs.</div>
      </main>
    );
  }

  const jobs = data.jobs.map((job) => ({
    slug: job.slug,
    cardJob: {
      _id: job._id,
      title: job.title,
      company: job.company,
      location: job.location,
      description: job.description,
      salary:
        typeof job.salary === "number"
          ? `$${job.salary.toLocaleString()}`
          : undefined,
    },
  }));

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      {/* Page Header */}
      <div className="mb-10">
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-4 text-[12px] font-black uppercase tracking-[0.15em]"
          style={{
            background: "oklch(70.2% 0.126 42.6 / 0.08)",
            borderColor: "oklch(70.2% 0.126 42.6 / 0.2)",
            color: "oklch(70.2% 0.126 42.6)",
            fontFamily: "var(--font-inconsolata)",
          }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: "oklch(70.2% 0.126 42.6)" }}
          />
          {data.totalJobs ?? jobs.length} Open Roles
        </div>
        <h1
          className="text-5xl font-extrabold tracking-tight leading-none"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Browse Jobs
        </h1>
        <p className="text-gray-500 mt-3 text-lg">
          Find your next opportunity from top companies worldwide.
        </p>
      </div>

      {/* Divider label */}
      <div className="flex items-center gap-4 mb-6">
        <span
          className="text-[13px] font-bold uppercase tracking-widest text-gray-400"
          style={{ fontFamily: "var(--font-inconsolata)" }}
        >
          Page {page} of {data.totalPages}
        </span>
        <div className="flex-1 h-px bg-[oklch(80%_0.02_42.6)]" />
      </div>

      {/* Job List */}
      <div className="flex flex-col gap-4">
        {jobs.map((job, i) => (
          <Link
            key={job.cardJob._id}
            href={`/jobs/${job.slug}`}
            className="block no-underline"
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <JobCard job={job.cardJob} />
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-12">
        {page > 1 ? (
          <Link
            href={`/jobs?page=${page - 1}`}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-full border-[1.5px] font-bold text-[13px] uppercase tracking-wide no-underline transition-all hover:border-[oklch(70.2%_0.126_42.6)] hover:text-[oklch(70.2%_0.126_42.6)]"
            style={{
              borderColor: "oklch(80% 0.02 42.6)",
              color: "oklch(40% 0.02 42.6)",
              fontFamily: "var(--font-inconsolata)",
            }}
          >
            ← Prev
          </Link>
        ) : (
          <span
            className="px-5 py-2.5 rounded-full border-[1.5px] font-bold text-[13px] uppercase tracking-wide opacity-30 cursor-not-allowed select-none"
            style={{
              borderColor: "oklch(80% 0.02 42.6)",
              fontFamily: "var(--font-inconsolata)",
            }}
          >
            ← Prev
          </span>
        )}

        {/* Page pills */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: data.totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/jobs?page=${p}`}
              className="w-9 h-9 flex items-center justify-center rounded-full font-black text-[13px] no-underline transition-all"
              style={{
                fontFamily: "var(--font-inconsolata)",
                background: p === page ? "oklch(70.2% 0.126 42.6)" : "transparent",
                color: p === page ? "#fff" : "oklch(55% 0.02 42.6)",
                border: p === page ? "none" : "1.5px solid oklch(80% 0.02 42.6)",
              }}
            >
              {p}
            </Link>
          ))}
        </div>

        {page < data.totalPages ? (
          <Link
            href={`/jobs?page=${page + 1}`}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-full border-[1.5px] font-bold text-[13px] uppercase tracking-wide no-underline transition-all hover:border-[oklch(70.2%_0.126_42.6)] hover:text-[oklch(70.2%_0.126_42.6)]"
            style={{
              borderColor: "oklch(80% 0.02 42.6)",
              color: "oklch(40% 0.02 42.6)",
              fontFamily: "var(--font-inconsolata)",
            }}
          >
            Next →
          </Link>
        ) : (
          <span
            className="px-5 py-2.5 rounded-full border-[1.5px] font-bold text-[13px] uppercase tracking-wide opacity-30 cursor-not-allowed select-none"
            style={{
              borderColor: "oklch(80% 0.02 42.6)",
              fontFamily: "var(--font-inconsolata)",
            }}
          >
            Next →
          </span>
        )}
      </div>
    </main>
  );
}
