'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function AboutHero() {
  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-gradient-to-b from-slate-100 to-white">
      {/* Soft ambient accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-[26rem] h-[26rem] bg-blue-300/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-[24rem] h-[24rem] bg-cyan-200/25 rounded-full blur-3xl" />
      </div>

      {/* Main hero visual panel (not full background) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 lg:py-16">
        <div className="relative mx-auto w-full rounded-3xl border border-slate-200 shadow-[0_20px_60px_rgba(15,23,42,0.18)] overflow-hidden bg-slate-900">
          <div
            className="w-full aspect-[16/9] bg-cover"
            style={{
              backgroundImage: `url('/about-hero-gujarat-map.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center right',
              filter: 'brightness(1.1) contrast(1.1) saturate(1.1)',
            }}
          />

          {/* Light readability overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to right, rgba(255,255,255,0.95), rgba(255,255,255,0.75), rgba(255,255,255,0.2))',
            }}
          />

          {/* Hide embedded Gemini shield/logo area in the image */}
          <div
            className="absolute rounded-2xl pointer-events-none hidden md:block"
            style={{
              left: '58%',
              top: '22%',
              width: '140px',
              height: '140px',
              background:
                'radial-gradient(circle at 40% 35%, rgba(191,219,254,0.55), rgba(148,163,184,0.35) 58%, rgba(255,255,255,0) 78%)',
              backdropFilter: 'blur(2px)',
              WebkitBackdropFilter: 'blur(2px)',
              boxShadow: '0 8px 28px rgba(15,23,42,0.2)',
              border: '1px solid rgba(148,163,184,0.35)',
              transform: 'rotate(-6deg)',
            }}
            aria-hidden="true"
          />

          {/* Left content area */}
          <div className="absolute inset-0 flex items-center">
            <div className="w-full lg:w-[52%] px-6 sm:px-10 md:px-14 lg:px-20 py-8 md:py-12">
              <div className="inline-block rounded-full bg-blue-100/80 border border-blue-200 px-4 py-1.5 mb-5">
                <p className="text-xs sm:text-sm font-semibold tracking-wide text-slate-700">About Our Platform</p>
              </div>

              <div className="rounded-xl border border-white/60 bg-white/60 backdrop-blur-[6px] p-5 sm:p-6 md:p-7">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-800 leading-[1.08] mb-4">
                  About Gujarat CivicTrack
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-slate-700 leading-relaxed mb-3">
                  Empowering Citizens Through Transparent Digital Governance
                </p>
                <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed">
                  A smart city solution transforming how citizens engage with government services and report civic issues
                  with complete transparency and accountability.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-400 text-slate-900 rounded-lg font-semibold hover:bg-amber-300 transition-colors"
                  >
                    Get in Touch
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-slate-300 bg-white/70 text-slate-800 rounded-lg font-semibold hover:bg-white transition-colors"
                  >
                    Access Portal
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="flex flex-col items-center gap-2">
          <p className="text-slate-500 text-sm">Scroll to explore</p>
          <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}
