-- demos.lol — initial schema
-- Run this in: Supabase Dashboard → SQL Editor → New query → paste → Run

create extension if not exists "pgcrypto";

-- ─── profiles ────────────────────────────────────────────────────────────────
create table public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  username      text unique not null
                  check (username ~ '^[a-z0-9_-]{3,30}$'),
  display_name  text        not null default '',
  bio           text                 default '',
  avatar_url    text                 default '',
  accent_color  text        not null default '#6366f1',
  badge_ids     text[]               default '{}',
  bg_type       text        not null default 'animated',
  bg_value      text                 default '',
  audio_url     text                 default '',
  audio_autoplay boolean    not null default false,
  cursor_effect text        not null default 'default',
  splash_enabled boolean   not null default false,
  splash_text   text                 default 'enter',
  sound_effects boolean    not null default true,
  is_public     boolean    not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ─── links ───────────────────────────────────────────────────────────────────
create table public.links (
  id          uuid primary key default gen_random_uuid(),
  profile_id  uuid not null references public.profiles(id) on delete cascade,
  title       text not null,
  url         text not null,
  icon        text          default '',
  position    integer not null default 0,
  is_active   boolean not null default true,
  clicks      integer not null default 0,
  created_at  timestamptz not null default now()
);
create index links_profile_position on public.links(profile_id, position);

-- ─── socials ─────────────────────────────────────────────────────────────────
create table public.socials (
  id          uuid primary key default gen_random_uuid(),
  profile_id  uuid not null references public.profiles(id) on delete cascade,
  platform    text not null,
  url         text not null,
  position    integer not null default 0
);

-- ─── page_views ──────────────────────────────────────────────────────────────
create table public.page_views (
  id          bigserial primary key,
  profile_id  uuid not null references public.profiles(id) on delete cascade,
  viewed_at   timestamptz not null default now(),
  country     text,
  referrer    text
);
create index page_views_profile_date on public.page_views(profile_id, viewed_at desc);

-- ─── link_clicks ─────────────────────────────────────────────────────────────
create table public.link_clicks (
  id          bigserial primary key,
  link_id     uuid not null references public.links(id) on delete cascade,
  profile_id  uuid not null references public.profiles(id) on delete cascade,
  clicked_at  timestamptz not null default now()
);

-- ─── RLS ─────────────────────────────────────────────────────────────────────
alter table public.profiles   enable row level security;
alter table public.links      enable row level security;
alter table public.socials    enable row level security;
alter table public.page_views  enable row level security;
alter table public.link_clicks enable row level security;

create policy "profiles: owner all"   on public.profiles  for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "profiles: public read" on public.profiles  for select using (is_public = true);

create policy "links: owner all"      on public.links for all using (profile_id = auth.uid()) with check (profile_id = auth.uid());
create policy "links: public read"    on public.links for select using (
  is_active = true and exists (select 1 from public.profiles p where p.id = profile_id and p.is_public = true)
);

create policy "socials: owner all"    on public.socials for all using (profile_id = auth.uid()) with check (profile_id = auth.uid());
create policy "socials: public read"  on public.socials for select using (
  exists (select 1 from public.profiles p where p.id = profile_id and p.is_public = true)
);

create policy "page_views: owner read"  on public.page_views  for select using (profile_id = auth.uid());
create policy "link_clicks: owner read" on public.link_clicks for select using (profile_id = auth.uid());

-- ─── auto updated_at ─────────────────────────────────────────────────────────
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

-- ─── auto-create profile on signup ───────────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
declare
  base_username text;
  final_username text;
  counter int := 0;
begin
  base_username := lower(regexp_replace(split_part(new.email, '@', 1), '[^a-z0-9_-]', '', 'g'));
  if length(base_username) < 3 then base_username := 'user'; end if;
  final_username := base_username;

  -- handle collisions
  while exists (select 1 from public.profiles where username = final_username) loop
    counter := counter + 1;
    final_username := base_username || counter::text;
  end loop;

  insert into public.profiles (id, username, display_name)
  values (new.id, final_username, coalesce(new.raw_user_meta_data->>'display_name', ''));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─── storage bucket for avatars ──────────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict do nothing;

create policy "avatars: public read" on storage.objects
  for select using (bucket_id = 'avatars');

create policy "avatars: owner upload" on storage.objects
  for insert with check (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "avatars: owner update" on storage.objects
  for update using (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);
