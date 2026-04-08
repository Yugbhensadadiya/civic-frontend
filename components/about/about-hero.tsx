'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function AboutHero() {
  return (
    <section
      className="relative h-[90vh] md:h-screen w-full overflow-hidden"
      style={{
        backgroundImage: `url('/about-hero-gujarat-map.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'brightness(1.1) contrast(1.1) saturate(1.1)',
      }}
    >
      {/* Clean left gradient for readability */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.2), transparent)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full lg:w-[52%] px-6 sm:px-10 md:px-16 lg:px-24 xl:px-28 text-center lg:text-left max-w-[760px]">
          <p className="text-sm sm:text-base font-semibold tracking-wide text-slate-100/90 mb-4">
            About Our Platform
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] mb-6">
            About Gujarat CivicTrack
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-slate-100 leading-relaxed mb-4 max-w-[540px]">
            Empowering Citizens Through Transparent Digital Governance
          </p>

          <p className="text-sm sm:text-base md:text-lg text-slate-200 leading-relaxed max-w-[500px]">
            A smart city solution transforming how citizens engage with government services and report civic issues with
            complete transparency and accountability.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center lg:justify-start">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-400 text-slate-900 rounded-lg font-semibold hover:bg-amber-300 transition-colors"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/40 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
            >
              Access Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="flex flex-col items-center gap-2">
          <p className="text-slate-100/80 text-sm">Scroll to explore</p>
          <svg className="w-6 h-6 text-slate-100/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}
