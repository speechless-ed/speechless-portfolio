import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { clearDraft, getPublishedContent, loadDraft, saveDraft } from './contentStore';

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const published = useMemo(() => getPublishedContent(), []);
  const [content, setContentState] = useState(() => loadDraft() ?? published);
  const [storageFailed, setStorageFailed] = useState(false);

  const dirty = useMemo(
    () => JSON.stringify(content) !== JSON.stringify(published),
    [content, published],
  );

  const setContent = useCallback((next) => {
    setContentState(next);
    setStorageFailed(!saveDraft(next));
  }, []);

  const discardDraft = useCallback(() => {
    clearDraft();
    setContentState(published);
    setStorageFailed(false);
  }, [published]);

  const value = useMemo(
    () => ({ content, published, dirty, storageFailed, setContent, discardDraft }),
    [content, published, dirty, storageFailed, setContent, discardDraft],
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used inside ContentProvider');
  return ctx;
}
