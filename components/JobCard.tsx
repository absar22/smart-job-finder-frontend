"use client";
import Bookmark from '@/components/Bookmark'
import { useSaveJobMutation,useRemoveJobMutation } from '@/redux/api/savedJobsApi';
export interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  isBookmarked?: boolean;
  type?: "Remote" | "Full-time" | "Contract";
  salary?: string;
  color?: string;
  initials?: string;
}

const typeStyles: Record<string, string> = {
  Remote:
    "bg-[oklch(70.2%_0.126_42.6/0.08)] text-[oklch(70.2%_0.126_42.6)] border-[oklch(70.2%_0.126_42.6/0.2)]",
  "Full-time":
    "bg-[oklch(73.3%_0.091_199/0.1)] text-[oklch(62.6%_0.106_198.8)] border-[oklch(73.3%_0.091_199/0.25)]",
  Contract: "bg-gray-100 text-gray-500 border-gray-200",
};



export default function JobCard({ job }: { job: Job }) {
  const type = job.type ?? "Full-time";
  const color = job.color ?? "oklch(70.2% 0.126 42.6)";
  const initials =
    job.initials ??
    job.company
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

      const [saveJob] = useSaveJobMutation();
const [removeJob] = useRemoveJobMutation();

const handleBookmark = async (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();

  try {
    if (job.isBookmarked) {
      await removeJob({
        jobId: job._id
      }).unwrap();
    } else {
      await saveJob({
        jobId: job._id
      }).unwrap();
    }
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="group relative bg-white border border-[oklch(80%_0.02_42.6)] rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-[oklch(70.2%_0.126_42.6/0.35)] overflow-hidden">
      {/* Top accent bar on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-0.75 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-t-2xl"
        style={{ background: color }}
      />

      {/* Card Top */}
      <div className="flex justify-between items-start mb-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-[13px] border border-[oklch(80%_0.02_42.6)]"
          style={{
            background: `${color}18`,
            color,
            fontFamily: "var(--font-syne)",
          }}
        >
          {initials}
        </div>
        <span
          className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide border ${typeStyles[type]}`}
        >
          {type}
        </span>
      </div>

      {/* Title & Company */}
      <h2
        className="text-[17px] font-bold leading-tight mb-1"
        style={{ fontFamily: "var(--font-syne)" }}
      >
        {job.title}
      </h2>
      <p className="text-[13px] text-gray-500 mb-3">
        {job.company} · {job.location}
      </p>

      {/* Description */}
      <p className="text-[13px] text-gray-500 leading-relaxed mb-5 line-clamp-2">
        {job.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-[12px] text-gray-400">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {job.location}
        </div>
        <div className="flex items-center gap-2">
          {job.salary && (
            <span
              className="font-bold text-[15px]"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {job.salary}
            </span>
          )}
          <button
           disabled
            className="px-4 py-2 text-white rounded-full text-[12px] font-bold border-none cursor-pointer transition-transform hover:scale-105 active:scale-95"
            style={{
              background: "oklch(70.2% 0.126 42.6)",
              fontFamily: "var(--font-inconsolata)",
            }}
          >
            Apply →
          </button>
       <Bookmark isBookmarked={job.isBookmarked ?? false} onClick={handleBookmark} />
       <span>{job.isBookmarked ? "Saved" : "Save"}</span>
        </div>
      </div>
    </div>
  );
}