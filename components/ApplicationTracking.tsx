"use client"
        import Link from "next/link"
        import {useGetTrackingJobsQuery} from "@/redux/api/trackingJobApi"
        // import type { TrackingApplication } from "@/redux/api/trackingJobApi"
        import { useMeQuery } from "@/redux/api/authApi"
        import { useState } from "react"
        export default function ApplicationTracking() {
            const { data: me } = useMeQuery(undefined)
            const { data: applications } = useGetTrackingJobsQuery(
                undefined,{
                   skip: !me?.user?._id, // This skips the query if the user is not logged in
                }
            );
            const [activeTab, setActiveTab] = useState<'overview' | 'bookmarks' | 'applications' | 'profile'>('overview');
         return (
          <>
            {applications?.data?.length === 0 ?(
            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
              <div className="p-12 text-center">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Track Applications Coming Soon!</h3>
                <p className="text-gray-600 mb-6">
                  Monitor the status of all your job applications in one place.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 max-w-md mx-auto">
                  <p className="text-sm text-gray-500">✨ Future Features:</p>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1">
                    <li>• Track application status (Applied, Interview, Offer, Rejected)</li>
                    <li>• Add interview notes and reminders</li>
                    <li>• View application history and analytics</li>
                    <li>• Receive status update notifications</li>
                  </ul>
                </div>
                <Link
                  href="/jobs"
                  className="inline-block mt-6 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Start Applying to Jobs
                </Link>
              </div>
            </div>
          
          ) : (
            <div>
              {applications?.data?.map((app) => (
              <div key={app._id} className="border-b py-4">
                <h4 className="font-semibold">{app.job.title}</h4>
                <p className="text-sm text-gray-600">{app.job.company}</p>
                <p className="text-xs text-gray-400">{app.status}</p>
              </div>
            ))}
          </div>
        
        )}
       </>
         )
      }
      