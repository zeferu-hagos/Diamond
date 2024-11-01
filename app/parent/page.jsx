'use client'

import { useState, useEffect } from 'react'

export default function ParentDashboard() {
    const [childrenData, setChildrenData] = useState([])
    const [notifications, setNotifications] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [childrenResponse, notificationsResponse] = await Promise.all([
                    fetch('/api/parent/children'),
                    fetch('/api/parent/notifications')
                ])

                const childrenData = await childrenResponse.json()
                const notificationsData = await notificationsResponse.json()

                setChildrenData(childrenData)
                setNotifications(notificationsData)
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
            <h1 className="text-2xl font-bold mb-6">Parent Dashboard</h1>

            {/* Children Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {loading ? (
                    <p>Loading children data...</p>
                ) : childrenData.map((child) => (
                    <div key={child.id} className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-blue-600 text-xl font-bold">
                                    {child.name.charAt(0)}
                                </span>
                            </div>
                            <div className="ml-4">
                                <h3 className="font-medium">{child.name}</h3>
                                <p className="text-sm text-gray-500">Grade {child.grade}</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Attendance:</span>
                                <span className="font-medium">{child.attendance}%</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Current Grade:</span>
                                <span className="font-medium">{child.currentGrade}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Recent Notifications</h2>
                    {loading ? (
                        <p>Loading notifications...</p>
                    ) : notifications.length > 0 ? (
                        <div className="space-y-4">
                            {notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className="flex items-center justify-between border-b pb-4"
                                >
                                    <div>
                                        <p className="font-medium">{notification.title}</p>
                                        <p className="text-sm text-gray-600">{notification.message}</p>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        {new Date(notification.date).toLocaleDateString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No new notifications</p>
                    )}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        Message Teacher
                    </button>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                        View Calendar
                    </button>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                        View Reports
                    </button>
                </div>
            </div>
        </div>
    )
}
