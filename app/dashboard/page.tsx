"use client"
import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/redux/store'
import { useMeQuery } from '@/redux/api/authApi'
import { setUser } from '@/redux/slices/authSlice'
export default function DashboardPage() {
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.auth.user)
    const {data} = useMeQuery(undefined)
    useEffect(() => {
        if(data?.user?.name){
            dispatch(setUser(data.user))
        }
    }, [data, dispatch])
    console.log("User in Dashboard:", user)
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r hidden md:flex flex-col">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-blue-600">Console</h2>
                </div>
                <nav className="flex-1 px-4 space-y-2">
                    <Link href="/dashboard" className="block p-3 bg-blue-50 text-blue-700 rounded-lg font-medium">Dashboard</Link>
                    <Link href="/projects" className="block p-3 text-gray-600 hover:bg-gray-50 rounded-lg">Projects</Link>
                    <Link href="/team" className="block p-3 text-gray-600 hover:bg-gray-50 rounded-lg">Team</Link>
                    <Link href="/settings" className="block p-3 text-gray-600 hover:bg-gray-50 rounded-lg">Settings</Link>
                </nav>
                <div className="p-4 border-t">
                    <button className="w-full text-left p-2 text-red-500 font-medium hover:bg-red-50 rounded">Logout</button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {/* Top Header */}
                <header className="bg-white border-b h-16 flex items-center justify-between px-8">
                    <h1 className="text-xl font-semibold text-gray-800">Welcome back, {user?.name}</h1>
                    <div className="flex items-center gap-4">
                        {/* <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                            AA
                        </div> */}
                        <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                            {user?.name ? user.name.split(' ').map((word) => word[0].toUpperCase()): 'N:A'}
                        </div>

                    <div className="text-sm">
                        <p className="font-medium">{user?.name}</p>
                        <p className="text-gray-400 text-xs">Developer</p>   {/* LATER ON it will come dynamic after api changes */}
                    </div>
                </div>
                    </div>
                </header>

                <div className="p-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-xl border shadow-sm">
                            <p className="text-sm text-gray-500 uppercase font-bold">Total Users</p>
                            <h3 className="text-3xl font-bold mt-1">2,543</h3>
                            <p className="text-xs text-green-500 mt-2">↑ 12% from last month</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border shadow-sm">
                            <p className="text-sm text-gray-500 uppercase font-bold">Active Sessions</p>
                            <h3 className="text-3xl font-bold mt-1">432</h3>
                            <p className="text-xs text-blue-500 mt-2">Live currently</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border shadow-sm">
                            <p className="text-sm text-gray-500 uppercase font-bold">Server Load</p>
                            <h3 className="text-3xl font-bold mt-1">18%</h3>
                            <p className="text-xs text-gray-400 mt-2">Healthy status</p>
                        </div>
                    </div>

                    {/* Recent Activity Table */}
                    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                        <div className="p-6 border-b">
                            <h2 className="font-bold text-gray-800">Recent Activity</h2>
                        </div>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">Project</th>
                                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                <tr>
                                    <td className="p-4 text-sm font-medium">JiraChat Architecture</td>
                                    <td className="p-4"><span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Completed</span></td>
                                    <td className="p-4 text-sm text-gray-500">2026-05-01</td>
                                </tr>
                                <tr>
                                    <td className="p-4 text-sm font-medium">Legal Connect UI</td>
                                    <td className="p-4"><span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">In Progress</span></td>
                                    <td className="p-4 text-sm text-gray-500">2026-05-07</td>
                                </tr>
                                <tr>
                                    <td className="p-4 text-sm font-medium">Vehicle Challan API</td>
                                    <td className="p-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Review</span></td>
                                    <td className="p-4 text-sm text-gray-500">2026-05-08</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}