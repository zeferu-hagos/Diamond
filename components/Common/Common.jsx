'use client'

export const Card = ({ children, className = '' }) => {
    return (
        <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
            {children}
        </div>
    )
}

export const Button = ({
    children,
    onClick,
    variant = 'primary',
    className = '',
    disabled = false
}) => {
    const baseStyle = 'px-4 py-2 rounded-lg transition-colors duration-200'
    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        success: 'bg-green-600 text-white hover:bg-green-700',
        danger: 'bg-red-600 text-white hover:bg-red-700',
        warning: 'bg-yellow-600 text-white hover:bg-yellow-700'
    }

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyle} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        >
            {children}
        </button>
    )
}

export const Modal = ({ isOpen, onClose, title, children, footer }) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="mb-6">
                    {children}
                </div>
                {footer && (
                    <div className="flex justify-end space-x-3">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    )
}

export const Input = ({
    label,
    type = 'text',
    value,
    onChange,
    error,
    required = false,
    className = ''
}) => {
    return (
        <div className={className}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <input
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                className={`mt-1 block w-full border rounded-md shadow-sm p-2 ${error ? 'border-red-500' : 'border-gray-300'
                    }`}
            />
            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
        </div>
    )
}

export const Select = ({
    label,
    value,
    onChange,
    options,
    error,
    required = false,
    className = ''
}) => {
    return (
        <div className={className}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <select
                value={value}
                onChange={onChange}
                required={required}
                className={`mt-1 block w-full border rounded-md shadow-sm p-2 ${error ? 'border-red-500' : 'border-gray-300'
                    }`}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
        </div>
    )
}

export const Badge = ({ children, variant = 'default', className = '' }) => {
    const variants = {
        default: 'bg-gray-100 text-gray-800',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        danger: 'bg-red-100 text-red-800',
        info: 'bg-blue-100 text-blue-800'
    }

    return (
        <span className={`px-2 py-1 text-xs rounded-full font-medium ${variants[variant]} ${className}`}>
            {children}
        </span>
    )
}

// Example usage:
/*
import { Card, Button, Modal, Input, Select, Badge } from '@/components/Common/Common'

// Card
<Card className="mb-4">
    Card content
</Card>

// Button
<Button variant="primary" onClick={() => {}}>
    Click me
</Button>

// Modal
<Modal
    isOpen={showModal}
    onClose={() => setShowModal(false)}
    title="Modal Title"
    footer={
        <>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
                Submit
            </Button>
        </>
    }
>
    Modal content
</Modal>

// Input
<Input
    label="Username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    error={errors.username}
    required
/>

// Select
<Select
    label="Role"
    value={role}
    onChange={(e) => setRole(e.target.value)}
    options={[
        { value: 'user', label: 'User' },
        { value: 'admin', label: 'Admin' }
    ]}
/>

// Badge
<Badge variant="success">Active</Badge>
*/
