"use client"

import { GoogleLogin } from "@react-oauth/google"
import { useRouter } from "next/navigation"
import { authApi } from "../lib/authApi"
import { useState } from "react"

export default function GoogleLoginBtn() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

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
    setIsLoading(true)
    
    try {
      // Enhanced token validation
      const token = credentialResponse?.credential
      
      if (!token) {
        console.error('❌ No token received from Google')
        alert('Google login failed: No token received')
        setIsLoading(false)
        return
      }

      console.log('🔑 Google token received:', token.substring(0, 20) + '...')
      
      // Enhanced request with retry logic
      let retryCount = 0
      const maxRetries = 3
      
      while (retryCount < maxRetries) {
        try {
          console.log(`🔄 Attempting Google login (attempt ${retryCount + 1}/${maxRetries})`)
          
          const response = await authApi.post('/api/google-login/', { 
            token: token,
            // Add timestamp to prevent caching issues
            timestamp: Date.now()
          })
          
          const data = response.data
          console.log('📥 Google login response:', data)
          
          if (data.success) {
            // Store tokens with validation
            if (data.access_token && data.refresh_token) {
              localStorage.setItem('access_token', data.access_token)
              localStorage.setItem('refresh_token', data.refresh_token)
              localStorage.setItem('user', JSON.stringify(data.user))
              
              console.log('✅ Login successful, tokens stored')
              
              // Redirect based on user role
              const redirectPath = getRedirectPath(data.user)
              router.push(redirectPath)
            } else {
              console.error('❌ Invalid response format:', data)
              alert('Login failed: Invalid response format')
            }
            return // Success, exit retry loop
            
          } else {
            console.error('❌ Login failed:', data.message, data.error_code)
            
            // Handle specific error codes
            if (data.error_code === 'CONFIGURATION_ERROR') {
              alert('Google login not configured by administrator. Please contact support.')
            } else if (data.error_code === 'INVALID_TOKEN') {
              alert('Invalid Google token. Please try logging in again.')
            } else if (data.error_code === 'TOKEN_EXPIRED') {
              alert('Google token expired. Please try logging in again.')
            } else {
              alert(`Google login failed: ${data.message}`)
            }
          }
          
        } catch (error: any) {
          console.error(`❌ Network error (attempt ${retryCount + 1}):`, error)
          
          // Check if it's a network error
          if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND' || error.message?.includes('network')) {
            console.log('🌐 Network error detected, retrying...')
            
            if (retryCount < maxRetries - 1) {
              // Wait before retry
              await new Promise(resolve => setTimeout(resolve, 2000))
              continue
            }
          }
          
          // If it's the last retry, show error
          if (retryCount === maxRetries - 1) {
            alert('Network error. Please check your internet connection and try again.')
          }
        }
        
        retryCount++
      }
      
    } catch (error: any) {
      console.error('❌ Google login error:', error)
      alert('Login failed: ' + (error.message || 'Unknown error'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleError = (error: any) => {
    console.error('❌ Google OAuth error:', error)
    
    // Handle different types of OAuth errors
    if (error.error === 'popup_closed_by_user') {
      console.log('👤 User closed Google login popup')
      return // Don't show error for user closing popup
    } else if (error.error === 'access_denied') {
      alert('Google login was denied. Please try again.')
    } else if (error.error === 'popup_blocked') {
      alert('Google login popup was blocked. Please allow popups for this site.')
    } else {
      alert('Google login error: ' + (error.message || 'Unknown error'))
    }
  }

  return (
    <div className="relative">
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
        disabled={isLoading}
      />
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-lg">
          <div className="text-blue-600">Processing Google login...</div>
        </div>
      )}
    </div>
  )
}
