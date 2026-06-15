"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import { useMeQuery, useLogoutMutation } from '@/redux/api/authApi';
import { setUser } from '@/redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import { useGetSavedJobsQuery } from '@/redux/api/savedJobsApi';
import BookmarkedJobs from '@/components/BookmarkedJobs';
import ApplicationTracking from '@/components/ApplicationTracking';
import { useGetTrackingJobsQuery } from '@/redux/api/trackingJobApi';
export default function DashboardPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const { data, isLoading, refetch } = useMeQuery(undefined);
  const [logout] = useLogoutMutation();
  const [activeTab, setActiveTab] = useState<'overview' | 'bookmarks' | 'applications' | 'profile'>('overview');
  const {data:savedJobs = []} = useGetSavedJobsQuery(
    undefined,
    {
      skip: !data?.user?._id, // This skips the query if the user is not logged in
    }
  );
  useEffect(() => {
    if (data?.user) {
      dispatch(setUser(data.user));
    }
  }, [data, dispatch]);
  const { data: applications } = useGetTrackingJobsQuery(
    undefined,
    {
      skip: !data?.user?._id, // This skips the query if the user is not logged in
    }
  );

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      router.push('/signin');
      router.refresh();
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:flex flex-col">
        <div className="p-6">
          <Link href="/" className="text-2xl font-bold text-orange-500">
            Job<span className="text-gray-800">Finder</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full text-left p-3 rounded-lg font-medium transition-colors ${
              activeTab === 'overview' 
                ? 'bg-orange-50 text-orange-700' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            📊 Dashboard Overview
          </button>
          
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`w-full text-left p-3 rounded-lg font-medium transition-colors ${
              activeTab === 'bookmarks' 
                ? 'bg-orange-50 text-orange-700' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            🔖 Bookmarked Jobs
            {/* <span className="ml-2 text-xs text-gray-400">(Coming Soon)</span> */}
          </button>
          
          <button
            onClick={() => setActiveTab('applications')}
            className={`w-full text-left p-3 rounded-lg font-medium transition-colors ${
              activeTab === 'applications' 
                ? 'bg-orange-50 text-orange-700' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            📝 My Applications
        
          </button>
          
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left p-3 rounded-lg font-medium transition-colors ${
              activeTab === 'profile' 
                ? 'bg-orange-50 text-orange-700' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            👤 Profile Settings
          </button>
        </nav>
        
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full text-left p-3 text-red-500 font-medium hover:bg-red-50 rounded-lg transition-colors"
          >
            🚪 Logout
          </button>
        </div>
       
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white border-b h-16 flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-xl font-semibold text-gray-800">
            {activeTab === 'overview' && 'Dashboard Overview'}
            {activeTab === 'bookmarks' && 'Bookmarked Jobs'}
            {activeTab === 'applications' && 'My Applications'}
            {activeTab === 'profile' && 'Profile Settings'}
          </h1>
          
        
        </header>

        <div className="p-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Welcome Section */}
              <div className="bg-linear-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-2">
                  Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋
                </h2>
                <p className="opacity-90">
                  Ready to find your next job opportunity? Start exploring new positions today.
                </p>
                <Link
                  href="/jobs"
                  className="inline-block mt-4 px-6 py-2 bg-white text-orange-600 rounded-lg font-semibold hover:shadow-lg transition-shadow"
                >
                  Browse Jobs →
                </Link>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
                      🔖
                    </div>
                    {/* <span className="text-xs text-gray-400">Coming Soon</span> */}
                    {savedJobs.length === 0 && (
                      <span className="text-xs text-gray-400">No saved jobs</span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{savedJobs.length}</h3>
                  <p className="text-gray-600 text-sm mt-1">Saved Jobs</p>
                  <p className="text-xs text-gray-400 mt-2">Jobs you've bookmarked</p>
                </div>

                <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
                      📝
                    </div>
                    {/* <span className="text-xs text-gray-400">Coming Soon</span> */}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{applications?.data?.length || 0}</h3>
                  <p className="text-gray-600 text-sm mt-1">Applications Sent</p>
                  <p className="text-xs text-gray-400 mt-2">Track your applications</p>
                </div>

                <div className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl">
                      📄
                    </div>
                    <span className="text-xs text-gray-400">Coming Soon</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">0</h3>
                  <p className="text-gray-600 text-sm mt-1">Resume Views</p>
                  <p className="text-xs text-gray-400 mt-2">Employers who viewed your resume</p>
                </div>
              </div>

              {/* Recent Activity Placeholder */}
              <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="font-bold text-gray-800">Recent Activity</h2>
                  <p className="text-sm text-gray-500 mt-1">Your job search activity will appear here</p>
                </div>
                <div className="p-8 text-center text-gray-500">
                  <p className="text-4xl mb-2">🔍</p>
                  <p>No recent activity yet</p>
                  <p className="text-sm mt-1">Start applying to jobs to see your activity here</p>
                  <Link
                    href="/jobs"
                    className="inline-block mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Browse Jobs
                  </Link>
                </div>
              </div>

              {/* Recommended Jobs Placeholder */}
              <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="font-bold text-gray-800">Recommended For You</h2>
                  <p className="text-sm text-gray-500 mt-1">Jobs tailored to your profile</p>
                </div>
                <div className="p-8 text-center text-gray-500">
                  <p className="text-4xl mb-2">💼</p>
                  <p>Job recommendations will appear here</p>
                  <p className="text-sm mt-1">Complete your profile to get personalized recommendations</p>
                </div>
              </div>
            </div>
          )}

          {/* Bookmarks Tab */}
          {activeTab === "bookmarks" && (
          <BookmarkedJobs />)}

          {/* Applications Tab (Coming Soon) */}
          {activeTab === 'applications' && (
            <ApplicationTracking />
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Profile Card */}
              <div className="bg-white rounded-xl border shadow-sm p-8">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-24 h-24 bg-linear-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{user?.name || 'User Name'}</h2>
                    <p className="text-gray-600">{user?.email || 'user@example.com'}</p>
                    <p className="text-sm text-gray-500 mt-1">Member since {new Date().getFullYear()}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <p className="text-gray-900">{user?.name || 'Not set'}</p>
                  </div>
                  
                  <div className="border-b pb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <p className="text-gray-900">{user?.email || 'Not set'}</p>
                  </div>
                  
                  <div className="border-b pb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Account Status</label>
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Active</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t">
                  <p className="text-sm text-gray-500 text-center">
                    More profile settings (resume upload, skills, experience) coming soon!
                  </p>
                </div>
              </div>

              {/* Placeholder for Resume Upload */}
              <div className="bg-white rounded-xl border shadow-sm p-8 text-center">
                <div className="text-4xl mb-3">📄</div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Resume Upload (Coming Soon)</h3>
                <p className="text-gray-600 text-sm">
                  You'll be able to upload and manage your resume here.
                </p>
                <div className="mt-4 p-3 bg-gray-50 rounded-lg inline-block">
                  <p className="text-xs text-gray-500">Supported formats: PDF, DOC, DOCX</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}