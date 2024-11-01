'use client'

import { useState, useEffect } from 'react'

export default function TeacherClasses() {
    const [classes, setClasses] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedClass, setSelectedClass] = useState(null)
    const [showAddModal, setShowAddModal] = useState(false)

    useEffect(() => {
        fetchClasses()
    }, [])

    const fetchClasses = async () => {
        try {
            const response = await fetch('/api/teacher/classes')
            const data = await response.json()
            setClasses(data)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching classes:', error)
            setLoading(false)
        }
    }

    const handleClassClick = (classItem) => {
        setSelectedClass(classItem)
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">My Classes</h1>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                    Add New Class
                </button>
            </div>

            {/* Classes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {loading ? (
                    <p>Loading classes...</p>
                ) : classes.map((classItem) => (
                    <div
                        key={classItem.id}
                        onClick={() => handleClassClick(classItem)}
                        className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
                    >
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
                                <span>Schedule:</span>
                                <span className="font-medium">{classItem.schedule}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Room:</span>
                                <span className="font-medium">{classItem.room}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Average Performance:</span>
                                <span className="font-medium">{classItem.averagePerformance}%</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Selected Class Details */}
            {selectedClass && (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">{selectedClass.name} Details</h2>
                            <div className="space-x-2">
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                    Take Attendance
                                </button>
                                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                                    Add Assignment
                                </button>
                            </div>
                        </div>

                        {/* Student List */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Student Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Attendance
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Performance
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {selectedClass.studentList?.map((student) => (
                                        <tr key={student.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {student.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">
                                                    {student.id}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${student.attendance >= 90
                                                        ? 'bg-green-100 text-green-800'
                                                        : student.attendance >= 80
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {student.attendance}%
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {student.performance}%
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button className="text-blue-600 hover:text-blue-900 mr-4">
                                                    View Details
                                                </button>
                                                <button className="text-green-600 hover:text-green-900">
                                                    Grade
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
