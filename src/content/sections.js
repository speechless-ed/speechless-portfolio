// The sections that exist on the site right now. Each build stage adds to this list;
// navigation and buttons only ever link to sections that are listed here.
export const SECTIONS = [
  { id: 'home', label: 'Home' },
];

export const hasSection = (id) => SECTIONS.some((s) => s.id === id);
