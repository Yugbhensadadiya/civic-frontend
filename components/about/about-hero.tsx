'use client'

export default function AboutHero() {
  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-gradient-to-br from-[#071326] via-[#0b1f3d] to-[#123d79]">
      {/* Ambient background glow */}
      <div className="absolute inset-0">
        <div className="absolute -top-20 -right-10 w-[28rem] h-[28rem] bg-cyan-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-10 w-[30rem] h-[30rem] bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Main hero visual panel (not full background) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="relative mx-auto w-full rounded-3xl border border-white/20 shadow-2xl overflow-hidden bg-slate-900">
          <div
            className="w-full aspect-[16/9] bg-cover bg-center"
            style={{ backgroundImage: `url('/about-hero-gujarat-map.png')` }}
          />

          {/* Contrast layer to blend with site palette */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0b1b33]/25 via-[#102a56]/15 to-[#1d4ed8]/10 pointer-events-none" />

          {/* Hide embedded Gemini shield/logo area in the image */}
          <div
            className="absolute rounded-2xl pointer-events-none"
            style={{
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
              transform: 'rotate(-6deg)',
            }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
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
