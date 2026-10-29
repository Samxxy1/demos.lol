export type BgType = 'solid' | 'gradient' | 'video' | 'animated';
export type CursorEffect = 'default' | 'glow' | 'trail';

export interface Profile {
  id: string;
  username: string;
  display_name: string;
  bio: string;
  avatar_url: string;
  accent_color: string;
  badge_ids: string[];
  bg_type: BgType;
  bg_value: string;
  audio_url: string;
  audio_autoplay: boolean;
  cursor_effect: CursorEffect;
  splash_enabled: boolean;
  splash_text: string;
  sound_effects: boolean;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface Link {
  id: string;
  profile_id: string;
  title: string;
  url: string;
  icon: string;
  position: number;
  is_active: boolean;
  clicks: number;
  created_at: string;
}

export interface Social {
  id: string;
  profile_id: string;
  platform: string;
  url: string;
  position: number;
}

export type Badge = 'verified' | 'early_adopter' | 'creator' | 'supporter' | 'dev';

export const BADGE_META: Record<Badge, { label: string; emoji: string }> = {
  verified:      { label: 'Verified',      emoji: '✓'  },
  early_adopter: { label: 'Early Adopter', emoji: '🌱' },
  creator:       { label: 'Creator',       emoji: '🎨' },
  supporter:     { label: 'Supporter',     emoji: '💜' },
  dev:           { label: 'Dev',           emoji: '⚡' },
};

export const SOCIAL_PLATFORMS = [
  'twitter', 'github', 'instagram', 'tiktok', 'youtube',
  'twitch', 'discord', 'spotify', 'linkedin', 'snapchat',
] as const;

export type SocialPlatform = (typeof SOCIAL_PLATFORMS)[number];

export const SOCIAL_ICONS: Record<string, string> = {
  twitter:   '𝕏',
  github:    '⌥',
  instagram: '◉',
  tiktok:    '♪',
  youtube:   '▶',
  twitch:    '◈',
  discord:   '◎',
  spotify:   '♫',
  linkedin:  'in',
  snapchat:  '◑',
};
