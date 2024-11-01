'use client'

import { useState, useEffect } from 'react'

export default function AttendancePage() {
    const [attendanceData, setAttendanceData] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedChild, setSelectedChild] = useState('all')
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
    const [children, setChildren] = useState([])

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]

    useEffect(() => {
        fetchAttendanceData()
    }, [selectedChild, selectedMonth])

    const fetchAttendanceData = async () => {
        try {
            // Fetch children list
            const childrenResponse = await fetch('/api/parent/children')
            const childrenData = await childrenResponse.json()
            setChildren(childrenData)

            // Fetch attendance data
            const response = await fetch(
                `/api/parent/attendance?childId=${selectedChild}&month=${selectedMonth}`
            )
            const data = await response.json()
            setAttendanceData(data)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching attendance data:', error)
            setLoading(false)
        }
    }

    const getAttendanceStatus = (status) => {
        const statusColors = {
            present: 'bg-green-100 text-green-800',
            absent: 'bg-red-100 text-red-800',
            late: 'bg-yellow-100 text-yellow-800',
            excused: 'bg-blue-100 text-blue-800'
        }
        return statusColors[status] || 'bg-gray-100 text-gray-800'
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Attendance Records</h1>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Child
                        </label>
                        <select
                            value={selectedChild}
                            onChange={(e) => setSelectedChild(e.target.value)}
                            className="w-full border rounded-lg p-2"
                        >
                            <option value="all">All Children</option>
                            {children.map((child) => (
                                <option key={child.id} value={child.id}>
                                    {child.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Month
                        </label>
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                            className="w-full border rounded-lg p-2"
                        >
                            {months.map((month, index) => (
                                <option key={index} value={index}>
                                    {month}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Attendance Summary */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">Monthly Summary</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-green-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600">Present Days</p>
                        <p className="text-2xl font-bold text-green-600">
                            {attendanceData.summary?.presentDays || 0}
                        </p>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600">Absent Days</p>
                        <p className="text-2xl font-bold text-red-600">
                            {attendanceData.summary?.absentDays || 0}
                        </p>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600">Late Days</p>
                        <p className="text-2xl font-bold text-yellow-600">
                            {attendanceData.summary?.lateDays || 0}
                        </p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600">Attendance Rate</p>
                        <p className="text-2xl font-bold text-blue-600">
                            {attendanceData.summary?.attendanceRate || 0}%
                        </p>
                    </div>
                </div>
            </div>

            {/* Detailed Records */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Daily Records</h2>
                    {loading ? (
                        <p>Loading attendance records...</p>
                    ) : attendanceData.records?.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Student
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Notes
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {attendanceData.records.map((record) => (
                                        <tr key={record.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {new Date(record.date).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {record.studentName}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getAttendanceStatus(record.status)}`}>
                                                    {record.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {record.notes}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-500">No attendance records found for the selected period.</p>
                    )}
                </div>
            </div>
        </div>
    )
}
