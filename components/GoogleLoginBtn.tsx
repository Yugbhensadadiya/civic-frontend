"use client"

import { GoogleLogin } from "@react-oauth/google"
import { useRouter } from "next/navigation"
import { authApi } from "../lib/authApi"

export default function GoogleLoginBtn() {
  const router = useRouter()

  const getRedirectPath = (user: any) => {
    const userRole = user.User_Role || user.role || 'Civic-User'
    
    switch (userRole) {
      case 'Department-User':
        return '/department'
      case 'Admin-User':
        return '/admin'
      case 'Officer':
        return '/officer'
      case 'Civic-User':
      default:
        return '/user-details' // First go to user details, then dashboard
    }
  }

  const handleSuccess = async (credentialResponse: any) => {
    try {
      const response = await authApi.post('/api/google-login/', { token: credentialResponse.credential })
      const data = response.data
      
      if (data.success) {
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('refresh_token', data.refresh_token)
        localStorage.setItem('user', JSON.stringify(data.user))
        
        // Redirect based on user role
        const redirectPath = getRedirectPath(data.user)
        router.push(redirectPath)
      } else {
        console.error('Google login failed:', data.message)
        alert('Login failed. Please try again.')
      }
    } catch (error) {
      console.error('Google login error:', error)
      alert('Network error. Please try again.')
    }
  }

  const handleError = () => {
    // Handle login error
  }

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
      theme="outline"
      size="large"
      text="signin_with"
      shape="rectangular"
      width={250}
      useOneTap={false}
      auto_select={false}
    />
  )
}
