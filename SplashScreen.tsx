'use client';

import { motion } from 'framer-motion';

interface Props {
  text:    string;
  accent:  string;
  onEnter: () => void;
}

export function SplashScreen({ text, accent, onEnter }: Props) {
  return (
    <motion.div
      key="splash"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black cursor-pointer select-none"
      onClick={onEnter}
    >
      <div className="text-center space-y-4">
        <div
          className="w-2 h-2 rounded-full mx-auto animate-pulse"
          style={{ background: accent }}
        />
        <p className="font-display text-sm tracking-[0.35em] uppercase text-white/40 hover:text-white/70 transition-colors">
          {text || 'enter'}
        </p>
      </div>
    </motion.div>
  );
}
