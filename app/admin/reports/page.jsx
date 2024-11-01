'use client'

import { useState, useEffect } from 'react'

export default function AdminReports() {
    const [reports, setReports] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedReport, setSelectedReport] = useState('users')
    const [dateRange, setDateRange] = useState('week')
    const [chartData, setChartData] = useState(null)

    const reportTypes = [
        { id: 'users', name: 'User Activity' },
        { id: 'engagement', name: 'Engagement Metrics' },
        { id: 'performance', name: 'System Performance' },
        { id: 'analytics', name: 'Analytics Overview' }
    ]

    const dateRanges = [
        { id: 'week', name: 'Last 7 Days' },
        { id: 'month', name: 'Last 30 Days' },
        { id: 'quarter', name: 'Last Quarter' },
        { id: 'year', name: 'Last Year' }
    ]

    useEffect(() => {
        fetchReportData()
    }, [selectedReport, dateRange])

    const fetchReportData = async () => {
        setLoading(true)
        try {
            const response = await fetch(`/api/admin/reports?type=${selectedReport}&range=${dateRange}`)
            const data = await response.json()
            setReports(data.reports)
            setChartData(data.chartData)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching report data:', error)
            setLoading(false)
        }
    }

    const handleExport = async (format) => {
        try {
            const response = await fetch(
                `/api/admin/reports/export?type=${selectedReport}&range=${dateRange}&format=${format}`
            )
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `report-${selectedReport}-${dateRange}.${format}`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
        } catch (error) {
            console.error('Error exporting report:', error)
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Reports & Analytics</h1>
                <div className="space-x-2">
                    <button
                        onClick={() => handleExport('pdf')}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                        Export PDF
                    </button>
                    <button
                        onClick={() => handleExport('csv')}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                        <select
                            value={selectedReport}
                            onChange={(e) => setSelectedReport(e.target.value)}
                            className="w-full border rounded-lg p-2"
                        >
                            {reportTypes.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                        <select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                            className="w-full border rounded-lg p-2"
                        >
                            {dateRanges.map((range) => (
                                <option key={range.id} value={range.id}>
                                    {range.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Report Content */}
            <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                    {loading ? (
                        <div className="text-center py-12">
                            <p>Loading report data...</p>
                        </div>
                    ) : (
                        <div>
                            {/* Chart Placeholder */}
                            <div className="bg-gray-100 rounded-lg p-6 mb-6">
                                <div className="h-64 flex items-center justify-center">
                                    {chartData ? (
                                        <p>Chart will be rendered here with the data</p>
                                    ) : (
                                        <p>No chart data available</p>
                                    )}
                                </div>
                            </div>

                            {/* Report Data Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Metric
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Value
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Change
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {reports.map((report) => (
                                            <tr key={report.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {report.metric}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">
                                                        {report.value}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${report.change > 0
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-red-100 text-red-800'
                                                        }`}>
                                                        {report.change > 0 ? '+' : ''}{report.change}%
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
