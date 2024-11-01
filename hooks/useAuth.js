'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function useAuth() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = async () => {
        try {
            const response = await fetch('/api/auth/session')
            const data = await response.json()

            if (data.user) {
                setUser(data.user)
            } else {
                setUser(null)
            }
        } catch (error) {
            console.error('Auth check failed:', error)
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    const login = async (credentials) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            })

            const data = await response.json()

            if (response.ok) {
                setUser(data.user)
                return { success: true }
            } else {
                return { success: false, error: data.message }
            }
        } catch (error) {
            return { success: false, error: 'Login failed' }
        }
    }

    const logout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' })
            setUser(null)
            router.push('/portal/auth/login')
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    const register = async (userData) => {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            })

            const data = await response.json()

            if (response.ok) {
                return { success: true }
            } else {
                return { success: false, error: data.message }
            }
        } catch (error) {
            return { success: false, error: 'Registration failed' }
        }
    }

    return {
        user,
        loading,
        login,
        logout,
        register,
        checkAuth
    }
}

export function useAuthorization(allowedRoles = []) {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            router.push('/portal/auth/login')
        } else if (!loading && user && allowedRoles.length > 0) {
            if (!allowedRoles.includes(user.role)) {
                router.push('/')
            }
        }
    }, [user, loading, allowedRoles])

    return { user, loading }
}

export function useForm(initialState = {}) {
    const [values, setValues] = useState(initialState)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setValues(prev => ({
            ...prev,
            [name]: value
        }))
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const resetForm = () => {
        setValues(initialState)
        setErrors({})
    }

    return {
        values,
        errors,
        loading,
        setValues,
        setErrors,
        setLoading,
        handleChange,
        resetForm
    }
}

export function useAPI() {
    const makeRequest = async (url, options = {}) => {
        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                }
            })

            const data = await response.json()

            if (response.ok) {
                return { success: true, data }
            } else {
                return { success: false, error: data.message }
            }
        } catch (error) {
            return { success: false, error: 'Request failed' }
        }
    }

    return { makeRequest }
} 