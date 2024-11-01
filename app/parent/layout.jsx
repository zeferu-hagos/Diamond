'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function ParentLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const pathname = usePathname()

    const navItems = [
        { name: 'Dashboard', path: '/parent' },
        { name: 'Children', path: '/parent/children' },
        { name: 'Messages', path: '/parent/messages' },
        { name: 'Calendar', path: '/parent/calendar' },
        { name: 'Reports', path: '/parent/reports' }
    ]

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-blue-800 transform transition-transform duration-200 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between h-16 px-4 bg-blue-900">
                    <span className="text-xl font-semibold text-white">Parent Portal</span>
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
                            className={`flex items-center px-4 py-2 mt-2 text-gray-100 rounded-lg hover:bg-blue-700 ${pathname === item.path ? 'bg-blue-700' : ''
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

                        {/* User Profile */}
                        <div className="relative">
                            <button className="flex items-center text-gray-800 hover:text-gray-600">
                                <span className="mr-2">Parent Account</span>
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
