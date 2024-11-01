'use client'

import { useState, useEffect } from 'react'

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeUsers: 0,
        totalAnnouncements: 0,
        pendingRequests: 0
    })

    const [recentActivities, setRecentActivities] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Fetch dashboard data
        const fetchDashboardData = async () => {
            try {
                // Replace with your actual API endpoints
                const [statsResponse, activitiesResponse] = await Promise.all([
                    fetch('/api/admin/stats'),
                    fetch('/api/admin/activities')
                ])

                const statsData = await statsResponse.json()
                const activitiesData = await activitiesResponse.json()

                setStats(statsData)
                setRecentActivities(activitiesData)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching dashboard data:', error)
                setLoading(false)
            }
        }

        fetchDashboardData()
    }, [])

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-gray-500 text-sm font-medium">Active Users</h3>
                    <p className="text-3xl font-bold text-green-600">{stats.activeUsers}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-gray-500 text-sm font-medium">Total Announcements</h3>
                    <p className="text-3xl font-bold text-blue-600">{stats.totalAnnouncements}</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-gray-500 text-sm font-medium">Pending Requests</h3>
                    <p className="text-3xl font-bold text-orange-600">{stats.pendingRequests}</p>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                    {loading ? (
                        <p>Loading activities...</p>
                    ) : recentActivities.length > 0 ? (
                        <div className="space-y-4">
                            {recentActivities.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="flex items-center justify-between border-b pb-4"
                                >
                                    <div>
                                        <p className="font-medium">{activity.description}</p>
                                        <p className="text-sm text-gray-500">{activity.user}</p>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        {new Date(activity.timestamp).toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No recent activities</p>
                    )}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        Create Announcement
                    </button>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                        Add New User
                    </button>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                        View Reports
                    </button>
                </div>
            </div>
        </div>
    )
}
