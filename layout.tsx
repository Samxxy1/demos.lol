import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/auth/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('username, display_name')
    .eq('id', user.id)
    .single();

  return (
    <div className="min-h-screen bg-canvas">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-violet-600/8 blur-[120px]" />
      </div>

      {/* sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-56 glass border-r border-white/5 z-20 flex flex-col">
        <div className="p-5 border-b border-white/5">
          <Link href="/" className="font-display font-bold text-lg tracking-tight">
            demos<span className="text-violet-400">.lol</span>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {[
            { href: '/dashboard',           label: 'Overview',   icon: '◎' },
            { href: '/dashboard/customize', label: 'Customize',  icon: '🎨' },
            { href: '/dashboard/links',     label: 'Links',      icon: '🔗' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
                         text-white/50 hover:text-white hover:bg-white/5 transition-all"
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5">
          <div className="text-xs text-white/30 mb-1">Your link</div>
          <Link
            href={`/${profile?.username}`}
            target="_blank"
            className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
          >
            demos.lol/{profile?.username} ↗
          </Link>
        </div>
      </aside>

      <main className="ml-56 p-8 relative z-10">
        {children}
      </main>
    </div>
  );
}
