'use client';

import { useEffect, useRef } from 'react';
import type { CursorEffect as CursorEffectType } from '@/lib/types';

interface Props {
  type:         CursorEffectType;
  soundEnabled: boolean;
}

export function CursorEffect({ type, soundEnabled }: Props) {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (type === 'default') return;
    const move = (e: MouseEvent) => {
      if (!dot.current) return;
      dot.current.style.left = `${e.clientX}px`;
      dot.current.style.top  = `${e.clientY}px`;
    };
    document.addEventListener('mousemove', move);
    return () => document.removeEventListener('mousemove', move);
  }, [type]);

  useEffect(() => {
    if (!soundEnabled || typeof window === 'undefined') return;
    const audio = new Audio('/sounds/hover.mp3');
    audio.volume = 0.15;
    const onEnter = () => { audio.currentTime = 0; audio.play().catch(() => {}); };
    const nodes = document.querySelectorAll('button, a');
    nodes.forEach((n) => n.addEventListener('mouseenter', onEnter));
    return () => nodes.forEach((n) => n.removeEventListener('mouseenter', onEnter));
  }, [soundEnabled]);

  if (type === 'default') return null;

  return (
    <div
      ref={dot}
      className="pointer-events-none fixed z-[999] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen"
      style={{
        width:      type === 'glow' ? '24px' : '10px',
        height:     type === 'glow' ? '24px' : '10px',
        background: type === 'glow' ? 'rgba(139,92,246,0.7)' : 'white',
        filter:     type === 'glow' ? 'blur(6px)' : 'none',
        transition: 'left 0.07s ease, top 0.07s ease',
      }}
    />
  );
}
