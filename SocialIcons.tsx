'use client';

import type { Social } from '@/lib/types';
import { SOCIAL_ICONS } from '@/lib/types';

interface Props {
  socials: Social[];
}

export function SocialIcons({ socials }: Props) {
  return (
    <div className="flex items-center justify-center gap-4">
      {socials.map((s) => (
        <a
          key={s.id}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/30 hover:text-white/80 transition-colors text-sm"
          aria-label={s.platform}
        >
          {SOCIAL_ICONS[s.platform] ?? s.platform[0].toUpperCase()}
        </a>
      ))}
    </div>
  );
}
