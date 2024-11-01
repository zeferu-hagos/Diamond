'use client'

import { useState, useEffect } from 'react'

export default function SchedulePage() {
    const [schedule, setSchedule] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedDay, setSelectedDay] = useState('monday')

    const weekDays = [
        { id: 'monday', name: 'Monday' },
        { id: 'tuesday', name: 'Tuesday' },
        { id: 'wednesday', name: 'Wednesday' },
        { id: 'thursday', name: 'Thursday' },
        { id: 'friday', name: 'Friday' }
    ]

    useEffect(() => {
        fetchSchedule()
    }, [selectedDay])

    const fetchSchedule = async () => {
        try {
            const response = await fetch(`/api/student/schedule?day=${selectedDay}`)
            const data = await response.json()
            setSchedule(data)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching schedule:', error)
            setLoading(false)
        }
    }

    const getTimeSlotColor = (subject) => {
        const subjectColors = {
            'Mathematics': 'bg-blue-50 border-blue-200',
            'Science': 'bg-green-50 border-green-200',
            'English': 'bg-purple-50 border-purple-200',
            'History': 'bg-yellow-50 border-yellow-200',
            'Physical Education': 'bg-red-50 border-red-200',
            'Art': 'bg-pink-50 border-pink-200'
        }
        return subjectColors[subject] || 'bg-gray-50 border-gray-200'
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Class Schedule</h1>

            {/* Day Selection */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
                <div className="flex space-x-2">
                    {weekDays.map((day) => (
                        <button
                            key={day.id}
                            onClick={() => setSelectedDay(day.id)}
                            className={`px-4 py-2 rounded-lg ${selectedDay === day.id
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {day.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Schedule Grid */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                {loading ? (
                    <div className="p-6 text-center">Loading schedule...</div>
                ) : (
                    <div className="p-6">
                        <div className="space-y-4">
                            {schedule.map((period) => (
                                <div
                                    key={period.id}
                                    className={`border-l-4 rounded-lg p-4 ${getTimeSlotColor(period.subject)}`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold text-lg">{period.subject}</h3>
                                            <p className="text-gray-600">{period.teacher}</p>
                                            <p className="text-sm text-gray-500">Room {period.room}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium">{period.timeSlot}</p>
                                            {period.isOngoing && (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    Current Class
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {schedule.length === 0 && (
                            <div className="text-center py-8">
                                <p className="text-gray-500">No classes scheduled for this day.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Additional Information */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Upcoming Events */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
                    <ul className="space-y-3">
                        <li className="flex justify-between items-center text-sm">
                            <span>Math Quiz</span>
                            <span className="text-gray-500">Tomorrow</span>
                        </li>
                        <li className="flex justify-between items-center text-sm">
                            <span>Science Project Due</span>
                            <span className="text-gray-500">Next Week</span>
                        </li>
                    </ul>
                </div>

                {/* Quick Links */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                    <div className="space-y-2">
                        <button className="w-full text-left px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg">
                            Download Schedule
                        </button>
                        <button className="w-full text-left px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg">
                            Contact Teacher
                        </button>
                        <button className="w-full text-left px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg">
                            Request Schedule Change
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
