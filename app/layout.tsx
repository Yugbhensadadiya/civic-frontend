"use client"

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { GoogleOAuthProvider } from "@react-oauth/google"

import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

// Google OAuth Provider Configuration
const googleOAuthConfig = {
  clientId: '368010718950-hcafld60i8i3n95tf8o59h3cvfn525sq.apps.googleusercontent.com',
}

export const metadata: Metadata = {
  title: 'Gujarat CivicTrack | Transparent Governance Portal',
  description: 'Gujarat Civic Complaint & Smart Governance Portal - Report, track and resolve civic issues with transparent governance',
  generator: 'v0.app',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <GoogleOAuthProvider {...googleOAuthConfig}>
          {children}
        </GoogleOAuthProvider>
      </body>
    </html>
  )
}
