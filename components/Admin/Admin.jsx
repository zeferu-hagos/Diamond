'use client'

import { useState } from 'react'

export default function Admin({ title, children, actions }) {
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [confirmAction, setConfirmAction] = useState(null)

    const handleAction = (action) => {
        if (action.requireConfirm) {
            setConfirmAction(action)
            setShowConfirmModal(true)
        } else {
            action.onClick()
        }
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header Section */}
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                        {actions && (
                            <div className="flex space-x-3">
                                {actions.map((action) => (
                                    <button
                                        key={action.label}
                                        onClick={() => handleAction(action)}
                                        className={`px-4 py-2 rounded-lg ${action.variant === 'primary'
                                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                : action.variant === 'danger'
                                                    ? 'bg-red-600 text-white hover:bg-red-700'
                                                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                            }`}
                                    >
                                        {action.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </div>

            {/* Confirmation Modal */}
            {showConfirmModal && confirmAction && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">{confirmAction.confirmTitle || 'Confirm Action'}</h2>
                        <p className="text-gray-600 mb-6">
                            {confirmAction.confirmMessage || 'Are you sure you want to perform this action?'}
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    confirmAction.onClick()
                                    setShowConfirmModal(false)
                                }}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

// Example usage:
/*
<Admin
    title="Manage Users"
    actions={[
        {
            label: "Add User",
            variant: "primary",
            onClick: () => handleAddUser(),
        },
        {
            label: "Delete Selected",
            variant: "danger",
            requireConfirm: true,
            confirmTitle: "Delete Users",
            confirmMessage: "Are you sure you want to delete the selected users?",
            onClick: () => handleDeleteUsers(),
        }
    ]}
>
    // Your admin content here
</Admin>
*/
