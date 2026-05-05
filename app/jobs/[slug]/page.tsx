import Link from "next/link";

interface Job {
  title: string;
  company: string;
  location: string;
  description: string;
  salary: number;
  skills: string[];
  createdAt: string;
}

async function getJobBySlug(slug: string) {
  const res = await fetch(`http://localhost:8000/api/jobs/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.job as Job;
}

export default async function JobDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  /* ── Not found ── */
  if (!job) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-6">
        <div
          className="text-center p-10 bg-white border rounded-2xl max-w-sm w-full"
          style={{ borderColor: "oklch(80% 0.02 42.6)" }}
        >
          <div className="text-4xl mb-4">🕵️</div>
          <h1
            className="text-2xl font-extrabold mb-2"
            style={{
              fontFamily: "var(--font-syne)",
              color: "oklch(70.2% 0.126 42.6)",
            }}
          >
            Role Not Found
          </h1>
          <p className="text-gray-500 mb-6 text-[15px]">
            This position may have been filled or removed.
          </p>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-black text-[13px] uppercase tracking-wide no-underline"
            style={{
              background: "oklch(70.2% 0.126 42.6)",
              fontFamily: "var(--font-inconsolata)",
            }}
          >
            ← Browse All Jobs
          </Link>
        </div>
      </div>
    );
  }

  const initials = job.company
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Back link */}
      <Link
        href="/jobs"
        className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-wide text-gray-400 hover:text-gray-900 transition-colors no-underline mb-8"
        style={{ fontFamily: "var(--font-inconsolata)" }}
      >
        ← All Jobs
      </Link>

      <div
        className="bg-white border rounded-2xl overflow-hidden"
        style={{ borderColor: "oklch(80% 0.02 42.6)" }}
      >
        {/* ── Header ── */}
        <div
          className="p-8 border-b relative overflow-hidden"
          style={{ borderColor: "oklch(80% 0.02 42.6)" }}
        >
          {/* Decorative blob */}
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -z-0 pointer-events-none"
            style={{ background: "oklch(70.2% 0.126 42.6 / 0.06)" }}
          />

          <div className="relative flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex items-start gap-4">
              {/* Company avatar */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center font-black text-lg flex-shrink-0 border"
                style={{
                  background: "oklch(70.2% 0.126 42.6 / 0.1)",
                  color: "oklch(70.2% 0.126 42.6)",
                  borderColor: "oklch(70.2% 0.126 42.6 / 0.2)",
                  fontFamily: "var(--font-syne)",
                }}
              >
                {initials}
              </div>

              <div>
                <h1
                  className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-3"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {job.title}
                </h1>
                <div className="flex flex-wrap gap-3">
                  {/* Company */}
                  <span className="flex items-center gap-1.5 text-[13px] font-semibold text-gray-500">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                    {job.company}
                  </span>
                  {/* Location */}
                  <span className="flex items-center gap-1.5 text-[13px] font-semibold text-gray-500">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                    {job.location}
                  </span>
                  {/* Salary */}
                  <span
                    className="flex items-center gap-1.5 text-[13px] font-black px-3 py-1 rounded-full"
                    style={{
                      background: "oklch(70.2% 0.126 42.6 / 0.08)",
                      color: "oklch(70.2% 0.126 42.6)",
                      border: "1px solid oklch(70.2% 0.126 42.6 / 0.2)",
                      fontFamily: "var(--font-inconsolata)",
                    }}
                  >
                    ${job.salary.toLocaleString()} / yr
                  </span>
                </div>
              </div>
            </div>

            {/* Apply CTA */}
            <button
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-white rounded-xl font-black text-[14px] uppercase tracking-wide border-none cursor-pointer transition-all hover:scale-105 active:scale-95 flex-shrink-0"
              style={{
                background: "oklch(70.2% 0.126 42.6)",
                fontFamily: "var(--font-inconsolata)",
                boxShadow: "0 6px 20px oklch(70.2% 0.126 42.6 / 0.4)",
              }}
            >
              Apply Now →
            </button>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="p-8 space-y-10">
          {/* Description */}
          <section>
            <h2
              className="text-[11px] font-black uppercase tracking-[0.15em] text-gray-400 mb-4"
              style={{ fontFamily: "var(--font-inconsolata)" }}
            >
              About the Role
            </h2>
            <p className="text-gray-600 leading-[1.8] text-[16px]">{job.description}</p>
          </section>

          {/* Divider */}
          <div className="h-px bg-[oklch(80%_0.02_42.6)]" />

          {/* Skills */}
          <section>
            <h2
              className="text-[11px] font-black uppercase tracking-[0.15em] text-gray-400 mb-4"
              style={{ fontFamily: "var(--font-inconsolata)" }}
            >
              Required Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-full text-[13px] font-bold border transition-colors hover:border-[oklch(70.2%_0.126_42.6)] hover:text-[oklch(70.2%_0.126_42.6)] hover:bg-[oklch(70.2%_0.126_42.6/0.05)] cursor-default"
                  style={{
                    background: "oklch(97% 0.005 42.6)",
                    borderColor: "oklch(80% 0.02 42.6)",
                    color: "oklch(40% 0.02 42.6)",
                    fontFamily: "var(--font-inconsolata)",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* ── Footer ── */}
        <div
          className="px-8 py-4 border-t flex justify-between items-center"
          style={{
            background: "oklch(98% 0.005 42.6)",
            borderColor: "oklch(80% 0.02 42.6)",
          }}
        >
          <span className="text-[12px] text-gray-400 font-medium">
            Posted{" "}
            {new Date(job.createdAt).toLocaleDateString(undefined, { dateStyle: "long" })}
          </span>
          <Link
            href="/jobs"
            className="text-[12px] font-bold uppercase tracking-wide text-gray-400 hover:text-gray-900 transition-colors no-underline"
            style={{ fontFamily: "var(--font-inconsolata)" }}
          >
            ← Back to Jobs
          </Link>
        </div>
      </div>
    </div>
  );
}