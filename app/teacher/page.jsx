'use client'

import { useState, useEffect } from 'react'

export default function TeacherDashboard() {
    const [classData, setClassData] = useState([])
    const [upcomingTasks, setUpcomingTasks] = useState([])
    const [recentSubmissions, setRecentSubmissions] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchDashboardData()
    }, [])

    const fetchDashboardData = async () => {
        try {
            const [classResponse, tasksResponse, submissionsResponse] = await Promise.all([
                fetch('/api/teacher/classes'),
                fetch('/api/teacher/upcoming-tasks'),
                fetch('/api/teacher/recent-submissions')
            ])

            const classData = await classResponse.json()
            const tasksData = await tasksResponse.json()
            const submissionsData = await submissionsResponse.json()

            setClassData(classData)
            setUpcomingTasks(tasksData)
            setRecentSubmissions(submissionsData)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching dashboard data:', error)
            setLoading(false)
        }
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Teacher Dashboard</h1>

            {/* Class Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {loading ? (
                    <p>Loading class data...</p>
                ) : classData.map((classItem) => (
                    <div key={classItem.id} className="bg-white rounded-lg shadow p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-semibold">{classItem.name}</h3>
                                <p className="text-sm text-gray-500">Grade {classItem.grade}</p>
                            </div>
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                {classItem.students} Students
                            </span>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Average Performance:</span>
                                <span className="font-medium">{classItem.averagePerformance}%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Attendance Today:</span>
                                <span className="font-medium">{classItem.attendance}%</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upcoming Tasks */}
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold mb-4">Upcoming Tasks</h2>
                        {loading ? (
                            <p>Loading tasks...</p>
                        ) : upcomingTasks.length > 0 ? (
                            <div className="space-y-4">
                                {upcomingTasks.map((task) => (
                                    <div key={task.id} className="flex items-center justify-between border-b pb-4">
                                        <div>
                                            <h3 className="font-medium">{task.title}</h3>
                                            <p className="text-sm text-gray-500">{task.class}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-gray-900">
                                                Due: {new Date(task.dueDate).toLocaleDateString()}
                                            </p>
                                            <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${task.priority === 'high'
                                                    ? 'bg-red-100 text-red-800'
                                                    : task.priority === 'medium'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-blue-100 text-blue-800'
                                                }`}>
                                                {task.priority} priority
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No upcoming tasks</p>
                        )}
                    </div>
                </div>

                {/* Recent Submissions */}
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold mb-4">Recent Submissions</h2>
                        {loading ? (
                            <p>Loading submissions...</p>
                        ) : recentSubmissions.length > 0 ? (
                            <div className="space-y-4">
                                {recentSubmissions.map((submission) => (
                                    <div key={submission.id} className="flex items-center justify-between border-b pb-4">
                                        <div>
                                            <h3 className="font-medium">{submission.studentName}</h3>
                                            <p className="text-sm text-gray-500">{submission.assignment}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500">
                                                Submitted: {new Date(submission.submittedAt).toLocaleString()}
                                            </p>
                                            <button className="text-sm text-green-600 hover:text-green-800">
                                                Grade Now
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No recent submissions</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                        Create Assignment
                    </button>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        Take Attendance
                    </button>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                        Grade Submissions
                    </button>
                    <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700">
                        Send Message
                    </button>
                </div>
            </div>
        </div>
    )
}
