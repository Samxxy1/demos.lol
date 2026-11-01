'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import type { Link } from '@/lib/types';
import { createClient } from '@/lib/supabase/client';

interface Props {
  link:         Link;
  accent:       string;
  index:        number;
  soundEnabled: boolean;
}

export function LinkButton({ link, accent, index, soundEnabled }: Props) {
  const supabase = createClient();
  const clicked  = useRef(false);

  const handleClick = async () => {
    if (soundEnabled && typeof window !== 'undefined') {
      const a = new Audio('/sounds/click.mp3');
      a.volume = 0.3;
      a.play().catch(() => {});
    }

    if (!clicked.current) {
      clicked.current = true;
      supabase.from('link_clicks')
        .insert({ link_id: link.id, profile_id: link.profile_id })
        .then(() => {});
    }

    window.open(link.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 + index * 0.07 }}
    >
      <button
        onClick={handleClick}
        className="w-full glass rounded-xl px-4 py-3.5 flex items-center gap-3 text-left group
                   hover:bg-white/10 hover:border-white/20 transition-all duration-200 active:scale-[0.98]"
        style={{ borderColor: `${accent}22` }}
      >
        {link.icon && <span className="text-base flex-shrink-0">{link.icon}</span>}
        <span className="flex-1 text-sm font-medium text-white/80 group-hover:text-white transition-colors">
          {link.title}
        </span>
        <span className="text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 transform transition-all text-xs">
          ↗
        </span>
      </button>
    </motion.div>
  );
}
