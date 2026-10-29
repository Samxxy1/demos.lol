import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-canvas overflow-hidden">
      {/* ambient gradient orbs */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/8 blur-[100px]" />
      </div>

      {/* nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <span className="font-display font-bold text-xl tracking-tight">
          demos<span className="text-violet-400">.lol</span>
        </span>
        <div className="flex items-center gap-3">
          <Link href="/auth/login" className="text-sm text-white/50 hover:text-white transition-colors px-4 py-2">
            Sign in
          </Link>
          <Link href="/auth/register" className="text-sm font-medium bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-lg transition-colors">
            Get started
          </Link>
        </div>
      </nav>

      {/* hero */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs text-white/60">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            now in early access
          </div>
          <h1 className="font-display text-5xl sm:text-6xl font-bold leading-[1.05] tracking-tight">
            one link.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
              your whole world.
            </span>
          </h1>
          <p className="text-white/50 text-lg leading-relaxed max-w-md">
            Bio links that actually look like you built them. Dark, expressive, yours.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <Link href="/auth/register" className="font-medium bg-violet-600 hover:bg-violet-500 text-white px-6 py-3 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]">
              Claim your link
            </Link>
            <Link href="#features" className="font-medium text-white/50 hover:text-white px-6 py-3 transition-colors">
              See features →
            </Link>
          </div>
          <div className="flex items-center gap-4 pt-4 text-xs text-white/30">
            <span>Free to start</span>
            <span>·</span>
            <span>No credit card</span>
            <span>·</span>
            <span>yours in 60 seconds</span>
          </div>
        </div>

        {/* demo card */}
        <div className="flex-shrink-0 relative w-[300px]">
          <div className="absolute inset-0 rounded-3xl blur-[60px] bg-violet-600/20 scale-90" />
          <div className="relative glass rounded-3xl p-6 space-y-5 animate-float">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-2xl font-bold font-display">
                K
              </div>
              <div>
                <h3 className="font-display font-bold text-lg">kairi.wav</h3>
                <p className="text-xs text-white/40">producer · visual artist</p>
              </div>
              <div className="flex items-center gap-3 text-white/30 text-sm">
                {['𝕏', '▶', '♪', '◈'].map((icon) => (
                  <span key={icon} className="hover:text-white/70 transition-colors cursor-pointer">{icon}</span>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              {[
                { icon: '🌐', label: 'My Portfolio' },
                { icon: '🎵', label: 'Latest Track' },
                { icon: '✉️', label: 'Commissions' },
              ].map((l) => (
                <div key={l.label} className="glass glass-hover rounded-xl px-4 py-3 flex items-center gap-3 cursor-pointer group">
                  <span className="text-base">{l.icon}</span>
                  <span className="flex-1 text-sm font-medium text-white/80 group-hover:text-white transition-colors">{l.label}</span>
                  <span className="text-white/20 group-hover:text-white/60 transition-colors text-xs">↗</span>
                </div>
              ))}
            </div>
            <p className="text-center text-[10px] text-white/20">demos.lol/kairi</p>
          </div>
        </div>
      </section>

      {/* features */}
      <section id="features" className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <h2 className="font-display text-2xl font-semibold text-center text-white/80 mb-12">
          everything a bio link should be
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: '🎨', title: 'Fully custom look', desc: 'Animated backgrounds, custom cursors, glassmorphism — built for people who care.' },
            { icon: '🎵', title: 'Background audio', desc: 'Upload your track. Visitors hear what you want them to hear when they land.' },
            { icon: '⚡', title: 'Instant analytics', desc: 'Views, clicks, countries. Know who\'s hitting your page and what they\'re clicking.' },
            { icon: '🔗', title: 'Unlimited links', desc: 'No artificial caps. Add every project, every platform, every thing.' },
            { icon: '🌀', title: 'Splash screens', desc: 'Click-to-enter gates with custom text. Builds anticipation before they land.' },
            { icon: '📱', title: 'Mobile-first', desc: 'Looks right on every screen. No tweaking required.' },
          ].map((f) => (
            <div key={f.title} className="glass glass-hover rounded-2xl p-6 space-y-2">
              <div className="text-2xl">{f.icon}</div>
              <h3 className="font-display font-semibold text-white">{f.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-24 text-center">
        <div className="glass rounded-3xl p-12 space-y-4">
          <h2 className="font-display text-3xl font-bold">
            demos.lol/<span className="text-violet-400">you</span>
          </h2>
          <p className="text-white/40">that URL is waiting.</p>
          <Link href="/auth/register" className="inline-block mt-4 bg-violet-600 hover:bg-violet-500 text-white font-medium px-8 py-3 rounded-xl transition-all hover:scale-[1.02]">
            Claim it now
          </Link>
        </div>
      </section>
    </main>
  );
}
