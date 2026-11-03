import { useEffect } from 'react';
import { ContentProvider, useContent } from './content/ContentContext';
import Site from './Site';

function Shell() {
  const { content } = useContent();

  // Keep the browser tab title in step with the content.
  useEffect(() => {
    document.title = content.site.title || 'Speechless';
  }, [content.site.title]);

  return <Site />;
}

export default function App() {
  return (
    <ContentProvider>
      <Shell />
    </ContentProvider>
  );
}
