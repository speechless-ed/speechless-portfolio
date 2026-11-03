// Only plain web links and plain email addresses are ever rendered as links.
// This also protects against `javascript:` URLs arriving through an imported content file.

export function safeHttpUrl(value) {
  if (typeof value !== 'string') return '';
  let input = value.trim();
  if (!input) return '';
  if (!/^[a-z][a-z0-9+.-]*:/i.test(input)) input = `https://${input}`;
  try {
    const url = new URL(input);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : '';
  } catch {
    return '';
  }
}

export function safeEmail(value) {
  if (typeof value !== 'string') return '';
  const input = value.trim();
  return /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(input) ? input : '';
}
