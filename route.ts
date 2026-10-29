import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { profile_id } = await req.json();
    if (!profile_id) return NextResponse.json({ ok: false }, { status: 400 });

    const country  = req.headers.get('x-vercel-ip-country') ?? null;
    const referrer = req.headers.get('referer') ?? null;

    await supabase.from('page_views').insert({ profile_id, country, referrer });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
