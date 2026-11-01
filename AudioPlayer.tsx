'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  src:      string;
  autoplay: boolean;
}

export function AudioPlayer({ src, autoplay }: Props) {
  const audioRef            = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a  = new Audio(src);
    a.loop   = true;
    a.volume = 0.4;
    audioRef.current = a;

    if (autoplay) {
      a.play().then(() => setPlaying(true)).catch(() => {});
    }
    return () => { a.pause(); };
  }, [src, autoplay]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else         { a.play().catch(() => {}); setPlaying(true); }
  };

  return (
    <button
      onClick={toggle}
      className="fixed top-4 right-4 z-20 glass rounded-full w-9 h-9
                 flex items-center justify-center hover:bg-white/10
                 transition-colors text-sm"
      aria-label={playing ? 'Pause music' : 'Play music'}
    >
      {playing ? '⏸' : '▶'}
    </button>
  );
}
