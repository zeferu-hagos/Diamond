'use client'

import { useState, useEffect } from 'react'

export default function TeacherAssignments() {
    const [assignments, setAssignments] = useState([])
    const [classes, setClasses] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedClass, setSelectedClass] = useState('all')
    const [showAddModal, setShowAddModal] = useState(false)
    const [newAssignment, setNewAssignment] = useState({
        title: '',
        description: '',
        dueDate: '',
        classId: '',
        points: 100
    })

    useEffect(() => {
        fetchData()
    }, [selectedClass])

    const fetchData = async () => {
        try {
            const [assignmentsResponse, classesResponse] = await Promise.all([
                fetch(`/api/teacher/assignments?class=${selectedClass}`),
                fetch('/api/teacher/classes')
            ])
            const assignmentsData = await assignmentsResponse.json()
            const classesData = await classesResponse.json()

            setAssignments(assignmentsData)
            setClasses(classesData)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching data:', error)
            setLoading(false)
        }
    }

    const handleCreateAssignment = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('/api/teacher/assignments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newAssignment),
            })
            if (response.ok) {
                setShowAddModal(false)
                setNewAssignment({
                    title: '',
                    description: '',
                    dueDate: '',
                    classId: '',
                    points: 100
                })
                fetchData()
            }
        } catch (error) {
            console.error('Error creating assignment:', error)
        }
    }

    const getStatusColor = (status) => {
        const colors = {
            active: 'bg-green-100 text-green-800',
            pending: 'bg-yellow-100 text-yellow-800',
            closed: 'bg-gray-100 text-gray-800',
            grading: 'bg-blue-100 text-blue-800'
        }
        return colors[status] || 'bg-gray-100 text-gray-800'
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Assignments</h1>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                    Create Assignment
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex items-center space-x-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Filter by Class
                        </label>
                        <select
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            className="w-full border rounded-lg p-2"
                        >
                            <option value="all">All Classes</option>
                            {classes.map((classItem) => (
                                <option key={classItem.id} value={classItem.id}>
                                    {classItem.name}
                                </option>
                            ))}
                        </select>
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
                                        <p className="text-sm text-gray-600 mt-1">{assignment.className}</p>
                                        <p className="text-sm text-gray-500 mt-2">{assignment.description}</p>
                                        <div className="mt-4 space-x-4">
                                            <span className="text-sm text-gray-500">
                                                Due: {new Date(assignment.dueDate).toLocaleDateString()}
                                            </span>
                                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(assignment.status)}`}>
                                                {assignment.status}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                Points: {assignment.points}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                            View Submissions
                                        </button>
                                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                                            Grade
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-6 text-center text-gray-500">
                        No assignments found.
                    </div>
                )}
            </div>

            {/* Create Assignment Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">Create New Assignment</h2>
                        <form onSubmit={handleCreateAssignment}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Title</label>
                                    <input
                                        type="text"
                                        className="mt-1 block w-full border rounded-md shadow-sm p-2"
                                        value={newAssignment.title}
                                        onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        className="mt-1 block w-full border rounded-md shadow-sm p-2"
                                        value={newAssignment.description}
                                        onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Class</label>
                                    <select
                                        className="mt-1 block w-full border rounded-md shadow-sm p-2"
                                        value={newAssignment.classId}
                                        onChange={(e) => setNewAssignment({ ...newAssignment, classId: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Class</option>
                                        {classes.map((classItem) => (
                                            <option key={classItem.id} value={classItem.id}>
                                                {classItem.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Due Date</label>
                                    <input
                                        type="datetime-local"
                                        className="mt-1 block w-full border rounded-md shadow-sm p-2"
                                        value={newAssignment.dueDate}
                                        onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Points</label>
                                    <input
                                        type="number"
                                        className="mt-1 block w-full border rounded-md shadow-sm p-2"
                                        value={newAssignment.points}
                                        onChange={(e) => setNewAssignment({ ...newAssignment, points: parseInt(e.target.value) })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                                >
                                    Create Assignment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
