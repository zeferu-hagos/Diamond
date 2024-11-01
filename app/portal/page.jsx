'use client'

import { useRouter } from 'next/navigation'
import { Card, Button } from '@/components/Common/Common'

export default function Portal() {
    const router = useRouter()

    const features = [
        {
            title: 'For Students',
            description: 'Access your assignments, grades, and schedule',
            icon: '📚',
            color: 'bg-blue-50',
            path: '/student'
        },
        {
            title: 'For Teachers',
            description: 'Manage classes, assignments, and grades',
            icon: '👩‍🏫',
            color: 'bg-green-50',
            path: '/teacher'
        },
        {
            title: 'For Parents',
            description: 'Track your child\'s progress and attendance',
            icon: '👪',
            color: 'bg-purple-50',
            path: '/parent'
        }
    ]

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Hero Section */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
                            Welcome to Learning Portal
                        </h1>
                        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                            Your comprehensive platform for managing education and learning resources
                        </p>
                        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                            <Button
                                onClick={() => router.push('/portal/auth/login')}
                                className="w-full sm:w-auto"
                            >
                                Sign In
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => router.push('/portal/auth/register')}
                                className="mt-3 w-full sm:mt-0 sm:ml-3 sm:w-auto"
                            >
                                Register
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature) => (
                        <Card
                            key={feature.title}
                            className={`${feature.color} cursor-pointer transition-transform hover:scale-105`}
                            onClick={() => router.push(feature.path)}
                        >
                            <div className="text-center">
                                <span className="text-4xl mb-4">{feature.icon}</span>
                                <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Info Section */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900">Why Choose Our Platform?</h2>
                        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="mt-3 text-lg font-medium text-gray-900">Fast & Efficient</h3>
                                <p className="mt-2 text-base text-gray-500">
                                    Quick access to all educational resources and information
                                </p>
                            </div>
                            <div>
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <h3 className="mt-3 text-lg font-medium text-gray-900">Secure</h3>
                                <p className="mt-2 text-base text-gray-500">
                                    Advanced security measures to protect your data
                                </p>
                            </div>
                            <div>
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                    </svg>
                                </div>
                                <h3 className="mt-3 text-lg font-medium text-gray-900">Always Available</h3>
                                <p className="mt-2 text-base text-gray-500">
                                    24/7 access to your educational resources
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
