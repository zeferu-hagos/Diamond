'use client'

import { useState, useEffect } from 'react'

export default function AssignmentsPage() {
    const [assignments, setAssignments] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('all')
    const [selectedSubject, setSelectedSubject] = useState('all')

    const subjects = [
        { id: 'all', name: 'All Subjects' },
        { id: 'math', name: 'Mathematics' },
        { id: 'science', name: 'Science' },
        { id: 'english', name: 'English' },
        { id: 'history', name: 'History' }
    ]

    const filters = [
        { id: 'all', name: 'All' },
        { id: 'pending', name: 'Pending' },
        { id: 'submitted', name: 'Submitted' },
        { id: 'graded', name: 'Graded' }
    ]

    useEffect(() => {
        fetchAssignments()
    }, [filter, selectedSubject])

    const fetchAssignments = async () => {
        try {
            const response = await fetch(
                `/api/student/assignments?status=${filter}&subject=${selectedSubject}`
            )
            const data = await response.json()
            setAssignments(data)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching assignments:', error)
            setLoading(false)
        }
    }

    const getStatusBadgeColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            submitted: 'bg-blue-100 text-blue-800',
            graded: 'bg-green-100 text-green-800',
            late: 'bg-red-100 text-red-800'
        }
        return colors[status] || 'bg-gray-100 text-gray-800'
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Assignments</h1>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Subject
                        </label>
                        <select
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(e.target.value)}
                            className="w-full border rounded-lg p-2"
                        >
                            {subjects.map((subject) => (
                                <option key={subject.id} value={subject.id}>
                                    {subject.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Status
                        </label>
                        <div className="flex space-x-2">
                            {filters.map((filterOption) => (
                                <button
                                    key={filterOption.id}
                                    onClick={() => setFilter(filterOption.id)}
                                    className={`px-4 py-2 rounded-lg ${filter === filterOption.id
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {filterOption.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Assignments List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                {loading ? (
                    <div className="p-6 text-center">Loading assignments...</div>
                ) : assignments.length > 0 ? (
                    <div className="divide-y divide-gray-200">
                        {assignments.map((assignment) => (
                            <div key={assignment.id} className="p-6 hover:bg-gray-50">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-semibold">{assignment.title}</h3>
                                        <p className="text-gray-600 mt-1">{assignment.subject}</p>
                                        <p className="text-sm text-gray-500 mt-2">{assignment.description}</p>
                                        <div className="mt-4 space-x-4">
                                            <span className="text-sm text-gray-500">
                                                Due: {new Date(assignment.dueDate).toLocaleDateString()}
                                            </span>
                                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeColor(assignment.status)}`}>
                                                {assignment.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                                            View Details
                                        </button>
                                        {assignment.status === 'pending' && (
                                            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                                                Submit
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {assignment.grade && (
                                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium">Grade: {assignment.grade}%</span>
                                            <span className="text-sm text-gray-500">
                                                Graded on: {new Date(assignment.gradedDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                        {assignment.feedback && (
                                            <p className="text-sm text-gray-600 mt-2">
                                                Feedback: {assignment.feedback}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-6 text-center text-gray-500">
                        No assignments found for the selected filters.
                    </div>
                )}
            </div>
        </div>
    )
}
