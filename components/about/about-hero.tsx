'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function AboutHero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image - Government Building */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/about-hero-gujarat-map.png')`,
          backgroundPosition: 'center',
        }}
      >
        {/* Tone + contrast harmonization (match site palette) */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b1b33]/35 via-[#102a56]/25 to-[#1d4ed8]/15"></div>
      </div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/60"></div>

      {/* Hide embedded Gemini shield/logo area (non-destructive mask) */}
      <div
        className="absolute rounded-2xl"
        style={{
          // Positioned over the center-right shield in the background image
          left: '58%',
          top: '22%',
          width: '140px',
          height: '140px',
          background:
            'radial-gradient(circle at 40% 35%, rgba(59,130,246,0.35), rgba(15,23,42,0.65) 60%, rgba(0,0,0,0) 75%)',
          backdropFilter: 'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.35)',
          border: '1px solid rgba(148,163,184,0.25)',
          pointerEvents: 'none',
          transform: 'rotate(-6deg)',
        }}
        aria-hidden="true"
      />

      {/* Animated background elements overlay */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Content intentionally removed: the hero banner already contains the text artwork */}

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <p className="text-blue-200 text-sm">Scroll to explore</p>
          <svg className="w-6 h-6 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}
