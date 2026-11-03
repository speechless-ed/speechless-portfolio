// The single place the app reads and writes site content.
//
// Today:  published content = src/content/content.json (bundled at build time)
//         draft content     = this browser's localStorage (written by /#/admin)
//
// Later (Supabase): replace these functions with calls to your table, keeping the same
// names and return shapes, and the rest of the app does not need to change.

import published from './content.json';
import { normalizeContent } from '../utils/normalize';

const DRAFT_KEY = 'speechless:content-draft:v1';

export function getPublishedContent() {
  return normalizeContent(published);
}

export function loadDraft() {
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    return raw ? normalizeContent(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

export function saveDraft(content) {
  try {
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(content));
    return true;
  } catch {
    return false;
  }
}

export function clearDraft() {
  try {
    window.localStorage.removeItem(DRAFT_KEY);
  } catch {
    /* storage unavailable: nothing to clear */
  }
}
