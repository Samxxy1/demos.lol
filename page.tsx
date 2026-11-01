'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Profile } from '@/lib/types';

const ACCENT_PRESETS = [
  '#6366f1', '#8b5cf6', '#ec4899', '#06b6d4',
  '#10b981', '#f59e0b', '#ef4444', '#ffffff',
];

export default function CustomizePage() {
  const supabase = createClient();
  const [profile, setProfile]   = useState<Partial<Profile>>({});
  const [saving, setSaving]     = useState(false);
  const [saved, setSaved]       = useState(false);
  const [avatarFile, setAvatar] = useState<File | null>(null);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (data) setProfile(data);
    })();
  }, []);

  const save = async () => {
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    let avatar_url = profile.avatar_url;

    if (avatarFile) {
      const ext  = avatarFile.name.split('.').pop();
      const path = `avatars/${user.id}.${ext}`;
      const { error } = await supabase.storage.from('avatars').upload(path, avatarFile, { upsert: true });
      if (!error) {
        const { data } = supabase.storage.from('avatars').getPublicUrl(path);
        avatar_url = data.publicUrl;
      }
    }

    await supabase.from('profiles').update({ ...profile, avatar_url }).eq('id', user.id);
    setProfile((p) => ({ ...p, avatar_url }));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="space-y-1.5">
      <label className="text-xs text-white/40 uppercase tracking-wider">{label}</label>
      {children}
    </div>
  );

  const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-violet-500/50 transition-colors";

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Customize</h1>
        <p className="text-white/40 text-sm mt-1">make it yours</p>
      </div>

      <div className="glass rounded-2xl p-6 space-y-5">
        <h2 className="font-display font-semibold text-white">Profile</h2>

        <Field label="Avatar">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files?.[0] ?? null)}
            className={inputCls}
          />
        </Field>

        <Field label="Display name">
          <input
            type="text"
            value={profile.display_name ?? ''}
            onChange={(e) => setProfile((p) => ({ ...p, display_name: e.target.value }))}
            className={inputCls}
            placeholder="Your name"
          />
        </Field>

        <Field label="Username (URL slug)">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm">demos.lol/</span>
            <input
              type="text"
              value={profile.username ?? ''}
              onChange={(e) => setProfile((p) => ({ ...p, username: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '') }))}
              className={`${inputCls} pl-[90px]`}
              placeholder="yourname"
            />
          </div>
        </Field>

        <Field label="Bio">
          <textarea
            value={profile.bio ?? ''}
            onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
            rows={3}
            className={`${inputCls} resize-none`}
            placeholder="Tell people who you are"
          />
        </Field>
      </div>

      <div className="glass rounded-2xl p-6 space-y-5">
        <h2 className="font-display font-semibold text-white">Appearance</h2>

        <Field label="Accent color">
          <div className="flex items-center gap-2 flex-wrap">
            {ACCENT_PRESETS.map((color) => (
              <button
                key={color}
                onClick={() => setProfile((p) => ({ ...p, accent_color: color }))}
                className="w-8 h-8 rounded-full border-2 transition-all"
                style={{
                  background: color,
                  borderColor: profile.accent_color === color ? 'white' : 'transparent',
                  transform: profile.accent_color === color ? 'scale(1.2)' : 'scale(1)',
                }}
              />
            ))}
            <input
              type="color"
              value={profile.accent_color ?? '#6366f1'}
              onChange={(e) => setProfile((p) => ({ ...p, accent_color: e.target.value }))}
              className="w-8 h-8 rounded-full cursor-pointer border-0 bg-transparent"
              title="Custom color"
            />
          </div>
        </Field>

        <Field label="Cursor effect">
          <select
            value={profile.cursor_effect ?? 'default'}
            onChange={(e) => setProfile((p) => ({ ...p, cursor_effect: e.target.value as Profile['cursor_effect'] }))}
            className={inputCls}
          >
            <option value="default">Default</option>
            <option value="glow">Glow</option>
            <option value="trail">Trail</option>
          </select>
        </Field>
      </div>

      <div className="glass rounded-2xl p-6 space-y-5">
        <h2 className="font-display font-semibold text-white">Audio & Splash</h2>

        <Field label="Background music URL (mp3)">
          <input
            type="url"
            value={profile.audio_url ?? ''}
            onChange={(e) => setProfile((p) => ({ ...p, audio_url: e.target.value }))}
            className={inputCls}
            placeholder="https://..."
          />
        </Field>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="autoplay"
            checked={profile.audio_autoplay ?? false}
            onChange={(e) => setProfile((p) => ({ ...p, audio_autoplay: e.target.checked }))}
            className="accent-violet-500"
          />
          <label htmlFor="autoplay" className="text-sm text-white/60">Autoplay music</label>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="splash"
            checked={profile.splash_enabled ?? false}
            onChange={(e) => setProfile((p) => ({ ...p, splash_enabled: e.target.checked }))}
            className="accent-violet-500"
          />
          <label htmlFor="splash" className="text-sm text-white/60">Enable splash screen</label>
        </div>

        {profile.splash_enabled && (
          <Field label="Splash button text">
            <input
              type="text"
              value={profile.splash_text ?? 'enter'}
              onChange={(e) => setProfile((p) => ({ ...p, splash_text: e.target.value }))}
              className={inputCls}
              placeholder="enter"
            />
          </Field>
        )}

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="sounds"
            checked={profile.sound_effects ?? true}
            onChange={(e) => setProfile((p) => ({ ...p, sound_effects: e.target.checked }))}
            className="accent-violet-500"
          />
          <label htmlFor="sounds" className="text-sm text-white/60">Sound effects on hover/click</label>
        </div>
      </div>

      <button
        onClick={save}
        disabled={saving}
        className="bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white
                   font-medium px-6 py-3 rounded-xl transition-colors"
      >
        {saved ? '✓ Saved' : saving ? 'Saving…' : 'Save changes'}
      </button>
    </div>
  );
}
