'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Profile, Social } from '@/lib/types';
import { BADGE_META } from '@/lib/types';
import { SocialIcons } from './SocialIcons';

interface Props {
  profile: Profile;
  socials: Social[];
}

export function ProfileCard({ profile, socials }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-sm"
    >
      <div className="glass accent-border accent-glow rounded-3xl p-6 text-center space-y-4">
        {/* avatar */}
        <div className="relative inline-block">
          {profile.avatar_url ? (
            <Image
              src={profile.avatar_url}
              alt={profile.display_name}
              width={80}
              height={80}
              className="rounded-full object-cover w-20 h-20 mx-auto"
            />
          ) : (
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-display font-bold mx-auto"
              style={{ background: `${profile.accent_color}33`, color: profile.accent_color }}
            >
              {(profile.display_name || profile.username || '?')[0].toUpperCase()}
            </div>
          )}
        </div>

        {/* name + bio */}
        <div className="space-y-1">
          <h1 className="font-display font-bold text-xl tracking-tight">
            {profile.display_name || profile.username}
          </h1>
          {profile.bio && (
            <p className="text-sm text-white/50 leading-relaxed max-w-xs mx-auto">
              {profile.bio}
            </p>
          )}
        </div>

        {/* badges */}
        {profile.badge_ids?.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1.5">
            {profile.badge_ids.map((id) => {
              const meta = BADGE_META[id as keyof typeof BADGE_META];
              if (!meta) return null;
              return (
                <span key={id} className="glass text-[10px] px-2 py-0.5 rounded-full text-white/60 flex items-center gap-1">
                  {meta.emoji} {meta.label}
                </span>
              );
            })}
          </div>
        )}

        {socials.length > 0 && <SocialIcons socials={socials} />}
      </div>
    </motion.div>
  );
}
