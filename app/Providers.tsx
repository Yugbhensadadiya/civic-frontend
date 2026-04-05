"use client"

import { GoogleOAuthProvider } from "@react-oauth/google"

const clientId =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) ||
  "368010718950-hcafld60i8i3n95tf8o59h3cvfn525sq.apps.googleusercontent.com"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
    </GoogleOAuthProvider>
  )
}
