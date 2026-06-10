export function avatarSrc(name: string, storedAvatar?: string | null): string {
  if (storedAvatar) return storedAvatar;
  const encoded = encodeURIComponent(name.trim() || '?');
  return `https://ui-avatars.com/api/?name=${encoded}&background=16a34a&color=fff&size=128&bold=true&rounded=true`;
}
