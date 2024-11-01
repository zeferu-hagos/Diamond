'use client'

import { useState, useEffect } from 'react'

export default function PerformancePage() {
    const [performanceData, setPerformanceData] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedChild, setSelectedChild] = useState('all')
    const [selectedPeriod, setSelectedPeriod] = useState('current')
    const [children, setChildren] = useState([])

    const periods = [
        { id: 'current', name: 'Current Term' },
        { id: 'last', name: 'Last Term' },
        { id: 'year', name: 'Full Year' }
    ]

    useEffect(() => {
        fetchPerformanceData()
    }, [selectedChild, selectedPeriod])

    const fetchPerformanceData = async () => {
        try {
            // Fetch children list
            const childrenResponse = await fetch('/api/parent/children')
            const childrenData = await childrenResponse.json()
            setChildren(childrenData)

            // Fetch performance data
            const response = await fetch(
                `/api/parent/performance?childId=${selectedChild}&period=${selectedPeriod}`
            )
            const data = await response.json()
            setPerformanceData(data)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching performance data:', error)
            setLoading(false)
        }
    }

    const getGradeColor = (grade) => {
        const gradeValue = parseFloat(grade)
        if (gradeValue >= 90) return 'text-green-600'
        if (gradeValue >= 80) return 'text-blue-600'
        if (gradeValue >= 70) return 'text-yellow-600'
        return 'text-red-600'
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Academic Performance</h1>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Student
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
                            Select Period
                        </label>
                        <select
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(e.target.value)}
                            className="w-full border rounded-lg p-2"
                        >
                            {periods.map((period) => (
                                <option key={period.id} value={period.id}>
                                    {period.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Performance Summary */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">Performance Summary</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600">Overall Grade</p>
                        <p className="text-2xl font-bold text-blue-600">
                            {performanceData.summary?.overallGrade || 'N/A'}
                        </p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600">Class Rank</p>
                        <p className="text-2xl font-bold text-green-600">
                            {performanceData.summary?.rank || 'N/A'}
                        </p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600">Subjects Passed</p>
                        <p className="text-2xl font-bold text-purple-600">
                            {performanceData.summary?.subjectsPassed || '0'}/{performanceData.summary?.totalSubjects || '0'}
                        </p>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600">Improvement</p>
                        <p className="text-2xl font-bold text-yellow-600">
                            {performanceData.summary?.improvement > 0 ? '+' : ''}{performanceData.summary?.improvement || '0'}%
                        </p>
                    </div>
                </div>
            </div>

            {/* Subject-wise Performance */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Subject Performance</h2>
                    {loading ? (
                        <p>Loading performance data...</p>
                    ) : performanceData.subjects?.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Subject
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Grade
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Teacher
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Comments
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {performanceData.subjects.map((subject) => (
                                        <tr key={subject.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {subject.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className={`text-sm font-bold ${getGradeColor(subject.grade)}`}>
                                                    {subject.grade}%
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">
                                                    {subject.teacher}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-500">
                                                    {subject.comments}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-500">No performance data available for the selected period.</p>
                    )}
                </div>
            </div>
        </div>
    )
}
