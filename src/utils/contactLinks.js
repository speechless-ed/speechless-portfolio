import { safeEmail, safeHttpUrl } from './url';

// The list of contact options that actually have a usable value. Anything blank or invalid is left out.
export function getContactLinks(contact) {
  const links = [];
  const email = safeEmail(contact.email);
  const linkedin = safeHttpUrl(contact.linkedin);
  const github = safeHttpUrl(contact.github);

  if (email) links.push({ key: 'email', label: 'Email', detail: email, href: `mailto:${email}`, external: false });
  if (linkedin) links.push({ key: 'linkedin', label: 'LinkedIn', detail: 'Connect on LinkedIn', href: linkedin, external: true });
  if (github) links.push({ key: 'github', label: 'GitHub', detail: 'See my code on GitHub', href: github, external: true });
  return links;
}
