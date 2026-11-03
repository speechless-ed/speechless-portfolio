// Path to a file in /public that also works when the site is served from a sub-path
// (GitHub Pages project sites live at https://name.github.io/repo/).
export const asset = (name) => `${import.meta.env.BASE_URL}${name}`;
