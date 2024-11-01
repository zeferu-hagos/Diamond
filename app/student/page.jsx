'use client'

import { useState, useEffect } from 'react'

export default function StudentDashboard() {
    const [studentData, setStudentData] = useState(null)
    const [assignments, setAssignments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchStudentData()
    }, [])

    const fetchStudentData = async () => {
        try {
            // Fetch student data and assignments
            const [studentResponse, assignmentsResponse] = await Promise.all([
                fetch('/api/student/info'),
                fetch('/api/student/assignments')
            ])

            const studentInfo = await studentResponse.json()
            const assignmentsData = await assignmentsResponse.json()

            setStudentData(studentInfo)
            setAssignments(assignmentsData)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching student data:', error)
            setLoading(false)
        }
    }

    const getAssignmentStatus = (status) => {
        const statusColors = {
            completed: 'bg-green-100 text-green-800',
            pending: 'bg-yellow-100 text-yellow-800',
            overdue: 'bg-red-100 text-red-800',
            graded: 'bg-blue-100 text-blue-800'
        }
        return statusColors[status] || 'bg-gray-100 text-gray-800'
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>

            {loading ? (
                <p>Loading student information...</p>
            ) : (
                <>
                    {/* Student Profile Summary */}
                    <div className="bg-white rounded-lg shadow p-6 mb-6">
                        <div className="flex items-center">
                            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-3xl font-bold text-blue-600">
                                    {studentData?.name?.charAt(0)}
                                </span>
                            </div>
                            <div className="ml-6">
                                <h2 className="text-xl font-semibold">{studentData?.name}</h2>
                                <p className="text-gray-600">Grade {studentData?.grade}</p>
                                <p className="text-gray-600">Student ID: {studentData?.studentId}</p>
                            </div>
                        </div>
                    </div>

                    {/* Academic Progress */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold mb-2">Current GPA</h3>
                            <p className="text-3xl font-bold text-blue-600">{studentData?.gpa || 'N/A'}</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold mb-2">Attendance Rate</h3>
                            <p className="text-3xl font-bold text-green-600">{studentData?.attendance || '0'}%</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold mb-2">Credits Earned</h3>
                            <p className="text-3xl font-bold text-purple-600">{studentData?.credits || '0'}</p>
                        </div>
                    </div>

                    {/* Current Assignments */}
                    <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-4">Current Assignments</h2>
                            {assignments.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                    Subject
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                    Assignment
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                    Due Date
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                    Status
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {assignments.map((assignment) => (
                                                <tr key={assignment.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {assignment.subject}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {assignment.title}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {new Date(assignment.dueDate).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getAssignmentStatus(assignment.status)}`}>
                                                            {assignment.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-gray-500">No current assignments</p>
                            )}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                View Schedule
                            </button>
                            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                                Submit Assignment
                            </button>
                            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                                Contact Teacher
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
