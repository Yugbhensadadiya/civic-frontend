"use client"

import { GoogleLogin } from "@react-oauth/google"
import { useRouter } from "next/navigation"
import axios from "axios"
import { getApiBaseUrl } from "../lib/config"
import { publicApi } from "../lib/authApi"

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
    const credential = credentialResponse?.credential
    if (!credential) {
      console.error("[GoogleLogin] Missing credential in credentialResponse:", credentialResponse)
      alert("Google sign-in did not return a credential. Please try again.")
      return
    }

    try {
      // Use public client so no stale Authorization header is sent with the ID token exchange
      const response = await publicApi.post("/api/google-login/", { token: credential })
      const data = response.data

      if (data.success) {
        const access = data.access_token ?? data.access
        const refresh = data.refresh_token ?? data.refresh
        if (!access || !refresh) {
          console.error("[GoogleLogin] Backend OK but missing tokens:", data)
          alert("Login response was incomplete. Please try again.")
          return
        }
        localStorage.setItem("access_token", access)
        localStorage.setItem("refresh_token", refresh)
        localStorage.setItem("user", JSON.stringify(data.user))

        const redirectPath = getRedirectPath(data.user)
        router.push(redirectPath)
      } else {
        console.error("Google login failed:", data)
        alert(data.message || "Login failed. Please try again.")
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("[GoogleLogin] Full error:", {
          message: error.message,
          code: error.code,
          baseURL: getApiBaseUrl(),
          url: error.config?.url,
          status: error.response?.status,
          data: error.response?.data,
        })
        const msg =
          (error.response?.data as { message?: string; details?: string })?.message ||
          (error.response?.data as { details?: string })?.details ||
          error.message
        alert(msg || "Could not reach the server. Check NEXT_PUBLIC_API_URL and CORS.")
      } else {
        console.error("[GoogleLogin] Unexpected error:", error)
        alert("Something went wrong during Google sign-in.")
      }
    }
  }

  const handleError = () => {
    console.error("[GoogleLogin] GoogleLogin onError (popup / FedCM)")
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
