"use client"

import { GoogleOAuthProvider } from "@react-oauth/google"

// Google OAuth Provider Configuration
const googleOAuthConfig = {
  clientId: '368010718950-hcafld60i8i3n95tf8o59h3cvfn525sq.apps.googleusercontent.com',
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider {...googleOAuthConfig}>
      {children}
    </GoogleOAuthProvider>
  )
}
