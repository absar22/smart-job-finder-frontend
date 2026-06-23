"use client"
import Link from "next/link"
import {useGetTrackingJobsQuery, useUpdateTrackingJobsMutation, useDeleteTrackingJobMutation} from "@/redux/api/trackingJobApi"
import { useMeQuery } from "@/redux/api/authApi"
import { useState } from "react"

export default function ApplicationTracking() {
    const { data: me, isLoading: meLoading } = useMeQuery(undefined)
    const { data: applications, isLoading: applicationsLoading, refetch } = useGetTrackingJobsQuery(
        undefined,
        {
            skip: !me?.user?._id, // This skips the query if the user is not logged in
        }
    );
    
    const [updateTrackingJob, { isLoading: updateLoading }] = useUpdateTrackingJobsMutation()
    const [deleteTrackingJob, { isLoading: deleteLoading }] = useDeleteTrackingJobMutation()
    const [activeTab, setActiveTab] = useState<'overview' | 'bookmarks' | 'applications' | 'profile'>('overview');
    const [selectedStatus, setSelectedStatus] = useState<{ [key: string]: string }>({})

    const handleStatusChange = (appId: string, newStatus: string) => {
        setSelectedStatus(prev => ({
            ...prev,
            [appId]: newStatus
        }))
    }

    const handleUpdateStatus = async (appId: string) => {
        const status = selectedStatus[appId]
        if (!status) return
        
        try {
            await updateTrackingJob({
                id: appId,
                updateJobStatus: {
                    status: status
                }
            }).unwrap()
            // Refetch to update the list
            refetch()
            // Clear the selected status for this app
            setSelectedStatus(prev => {
                const newState = { ...prev }
                delete newState[appId]
                return newState
            })
        } catch (error) {
            console.error('Failed to update status:', error)
        }
    }

    const handleDeleteApplication = async (appId: string) => {
        if (window.confirm('Are you sure you want to delete this application?')) {
            try {
                await deleteTrackingJob({
                    id: appId
                }).unwrap()
                // Refetch to update the list
                refetch()
            } catch (error) {
                console.error('Failed to delete application:', error)
            }
        }
    }

    // Show loading state
    if (meLoading || applicationsLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-gray-600">Loading your applications...</div>
            </div>
        )
    }

    return (
        <>
            {applications?.data?.length === 0 ? (
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
                <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                    <div className="p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Applications</h2>
                        <div className="space-y-4">
                            {applications?.data?.map((app) => (
                                <div key={app._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-800">{app.job.title}</h4>
                                            <p className="text-sm text-gray-600">{app.job.company}</p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                Status: <span className="font-medium capitalize">{app.status}</span>
                                            </p>
                                        </div>
                                        
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                            {/* Status Update Section */}
                                            <div className="flex items-center gap-2">
                                                <select
                                                    value={selectedStatus[app._id] || ''}
                                                    onChange={(e) => handleStatusChange(app._id, e.target.value)}
                                                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                >
                                                    <option value="">Update Status</option>
                                                    <option value="interviewing">Interviewing</option>
                                                    <option value="offered">Offered</option>
                                                    <option value="rejected">Rejected</option>
                                                </select>
                                                
                                                {selectedStatus[app._id] && (
                                                    <button
                                                        onClick={() => handleUpdateStatus(app._id)}
                                                        disabled={updateLoading}
                                                        className="px-3 py-2 bg-orange-500 text-white text-sm rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        {updateLoading ? 'Updating...' : 'Apply'}
                                                    </button>
                                                )}
                                            </div>
                                            
                                            {/* Delete Button */}
                                            <button 
                                                onClick={() => handleDeleteApplication(app._id)}
                                                disabled={deleteLoading}
                                                className="px-3 py-2 bg-red-50 text-red-600 text-sm rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}