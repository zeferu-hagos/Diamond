'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function TeacherLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const pathname = usePathname()

    const navItems = [
        { name: 'Dashboard', path: '/teacher' },
        { name: 'Classes', path: '/teacher/classes' },
        { name: 'Assignments', path: '/teacher/assignments' },
        { name: 'Grades', path: '/teacher/grades' },
        { name: 'Attendance', path: '/teacher/attendance' },
        { name: 'Messages', path: '/teacher/messages' },
        { name: 'Resources', path: '/teacher/resources' }
    ]

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-green-800 transform transition-transform duration-200 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <div className="flex items-center justify-between h-16 px-4 bg-green-900">
                    <span className="text-xl font-semibold text-white">Teacher Portal</span>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="p-1 text-gray-300 hover:text-white md:hidden"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <nav className="px-2 py-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`flex items-center px-4 py-2 mt-2 text-gray-100 rounded-lg hover:bg-green-700 ${pathname === item.path ? 'bg-green-700' : ''
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className={`transition-margin duration-200 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
                {/* Top Navigation */}
                <div className="bg-white shadow">
                    <div className="flex items-center justify-between h-16 px-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-1 text-gray-800 hover:text-gray-600"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>

                        {/* Teacher Profile Menu */}
                        <div className="relative flex items-center">
                            {/* Notifications */}
                            <button className="p-1 text-gray-800 hover:text-gray-600 mr-4">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                    />
                                </svg>
                            </button>

                            {/* Profile Dropdown */}
                            <button className="flex items-center text-gray-800 hover:text-gray-600">
                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                                    <span className="text-sm font-medium text-green-600">JD</span>
                                </div>
                                <span className="mr-2">John Doe</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Page Content */}
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}
