'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Profile, Link, Social } from '@/lib/types';
import { SplashScreen } from '@/components/ui/SplashScreen';
import { CursorEffect } from '@/components/ui/CursorEffect';
import { AudioPlayer }  from '@/components/ui/AudioPlayer';
import { ProfileCard }  from '@/components/profile/ProfileCard';
import { LinkButton }   from '@/components/profile/LinkButton';
import { SocialIcons }  from '@/components/profile/SocialIcons';
import { trackView }    from '@/lib/utils/trackView';

interface Props {
  profile: Profile;
  links:   Link[];
  socials: Social[];
}

function PageBackground({ profile }: { profile: Profile }) {
  if (profile.bg_type === 'video' && profile.bg_value) {
    return (
      <video
        autoPlay muted loop playsInline
        className="fixed inset-0 w-full h-full object-cover z-0 opacity-40"
        src={profile.bg_value}
      />
    );
  }
  return (
    <div className="fixed inset-0 z-0 bg-black">
      <div
        className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[130px] opacity-20"
        style={{ background: profile.accent_color }}
      />
      <div
        className="absolute bottom-[-15%] right-[-5%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-10"
        style={{ background: profile.accent_color }}
      />
    </div>
  );
}

export function BioPageClient({ profile, links, socials }: Props) {
  const [splashDone, setSplashDone] = useState(!profile.splash_enabled);

  useEffect(() => {
    if (splashDone) trackView(profile.id);
  }, [splashDone, profile.id]);

  const accent = profile.accent_color || '#6366f1';

  return (
    <>
      <style>{`
        :root { --accent: ${accent}; }
        .accent-glow   { box-shadow: 0 0 60px ${accent}22; }
        .accent-border { border-color: ${accent}33 !important; }
      `}</style>

      <CursorEffect type={profile.cursor_effect} soundEnabled={profile.sound_effects} />

      <AnimatePresence>
        {!splashDone && (
          <SplashScreen
            text={profile.splash_text}
            accent={accent}
            onEnter={() => setSplashDone(true)}
          />
        )}
      </AnimatePresence>

      <PageBackground profile={profile} />

      <AnimatePresence>
        {splashDone && (
          <motion.main
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 min-h-screen flex flex-col items-center justify-start px-4 py-12"
          >
            {profile.audio_url && (
              <AudioPlayer src={profile.audio_url} autoplay={profile.audio_autoplay} />
            )}

            <ProfileCard profile={profile} socials={socials} />

            <div className="w-full max-w-sm mt-6 space-y-3">
              {links.map((link, i) => (
                <LinkButton
                  key={link.id}
                  link={link}
                  accent={accent}
                  index={i}
                  soundEnabled={profile.sound_effects}
                />
              ))}
            </div>

            <p className="mt-10 text-[10px] text-white/20">
              demos.lol/{profile.username}
            </p>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
