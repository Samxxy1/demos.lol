export async function trackView(profileId: string) {
  try {
    await fetch('/api/track-view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile_id: profileId }),
    });
  } catch {
    // analytics are best-effort, never block UX
  }
}
