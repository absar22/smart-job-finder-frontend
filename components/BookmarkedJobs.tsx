"use client";

import { useGetSavedJobsQuery } from "@/redux/api/savedJobsApi";
import JobCard from "./JobCard";
import Link from 'next/link';
import { useMeQuery } from '@/redux/api/authApi';
export default function BookmarkedJobs() {
  const {data:me} = useMeQuery(undefined);
  const { data: savedJobs = [] } = useGetSavedJobsQuery(
    undefined,{
      skip: !me?.user?._id, // This skips the query if the user is not logged in
    }
  );

  if (savedJobs.length === 0) {
    return (
  
              <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
              <div className="p-12 text-center">
                <div className="text-6xl mb-4">🔖</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Bookmarks Coming Soon!</h3>
                <p className="text-gray-600 mb-6">
                  You'll be able to save and manage your favorite jobs here.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 max-w-md mx-auto">
                  <p className="text-sm text-gray-500">✨ Future Features:</p>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1">
                    <li>• Save jobs to apply later</li>
                    <li>• Organize jobs by categories</li>
                    <li>• Get alerts for saved job updates</li>
                    <li>• Share saved jobs with friends</li>
                  </ul>
                </div>
                <Link
                  href="/jobs"
                  className="inline-block mt-6 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Browse Jobs to Bookmark
                </Link>
              </div>
            </div>
    );
  }

  return (
    <div className="space-y-4">
      {savedJobs.map((savedJob) => (
        <Link href={`/jobs/${savedJob.job.slug}`} key={savedJob._id} className="block">
        <JobCard
          job={{
            ...savedJob.job,
            isBookmarked: true, // without this prop clicking the bookmark inside the Bookmarked Jobs page tries to save again instead of removing.
            salary:
              typeof savedJob.job.salary === "number"
                ? `$${savedJob.job.salary.toLocaleString()}`
                : undefined,
          }}
        />
        </Link>
      ))}
    </div>
  );
}