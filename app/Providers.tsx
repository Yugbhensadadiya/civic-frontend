"use client"

import { GoogleOAuthProvider } from "@react-oauth/google"

// Must match Render GOOGLE_CLIENT_ID exactly (same Web client ID in Google Cloud).
const clientId =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.trim()) ||
  "368010718950-hcafld60i8i3n95tf8o59h3cvfn525sq.apps.googleusercontent.com"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
    </GoogleOAuthProvider>
  )
}
