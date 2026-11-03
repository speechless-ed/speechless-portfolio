// Shapes any content object (the bundled file, a saved draft, or an imported file)
// into the structure the site expects, so a bad value can never crash the page.

export const PROJECT_STATUSES = ['In Progress', 'Exploring', 'Planned', 'Concept', 'Live'];

const str = (v, fallback = '') => (typeof v === 'string' ? v : fallback);
const strList = (v) => (Array.isArray(v) ? v.filter((x) => typeof x === 'string') : []);
const obj = (v) => (v && typeof v === 'object' && !Array.isArray(v) ? v : {});
const list = (v, fn) => (Array.isArray(v) ? v.map(fn) : []);

let counter = 0;
export function makeId(prefix = 'item') {
  counter += 1;
  return `${prefix}-${Date.now().toString(36)}-${counter.toString(36)}`;
}

export function normalizeContent(raw) {
  const r = obj(raw);
  const site = obj(r.site);
  const hero = obj(r.hero);
  const about = obj(r.about);
  const contact = obj(r.contact);
  const footer = obj(r.footer);

  return {
    site: {
      brand: str(site.brand),
      fullName: str(site.fullName),
      title: str(site.title),
      description: str(site.description),
      badgeTagline: str(site.badgeTagline),
      motto: str(site.motto),
    },
    hero: {
      eyebrow: str(hero.eyebrow),
      greeting: str(hero.greeting),
      headline: str(hero.headline),
      copy: str(hero.copy),
      primaryCta: str(hero.primaryCta),
      secondaryCta: str(hero.secondaryCta),
    },
    about: {
      paragraphs: strList(about.paragraphs),
      values: list(about.values, (v) => {
        const o = obj(v);
        return { id: str(o.id) || makeId('value'), title: str(o.title), text: str(o.text) };
      }),
    },
    projects: list(r.projects, (p) => {
      const o = obj(p);
      return {
        id: str(o.id) || makeId('project'),
        name: str(o.name),
        status: PROJECT_STATUSES.includes(o.status) ? o.status : 'Planned',
        description: str(o.description),
        features: strList(o.features),
        tech: strList(o.tech),
        repoUrl: str(o.repoUrl),
        demoUrl: str(o.demoUrl),
      };
    }),
    skills: list(r.skills, (s) => {
      const o = obj(s);
      return { id: str(o.id) || makeId('skills'), category: str(o.category), items: strList(o.items) };
    }),
    journey: list(r.journey, (j) => {
      const o = obj(j);
      return {
        id: str(o.id) || makeId('journey'),
        title: str(o.title),
        period: str(o.period),
        description: str(o.description),
      };
    }),
    contact: {
      intro: str(contact.intro),
      email: str(contact.email),
      linkedin: str(contact.linkedin),
      github: str(contact.github),
    },
    footer: { closing: str(footer.closing) },
  };
}

export function parseContentFile(text) {
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error('That file is not valid JSON.');
  }
  const d = obj(data);
  if (!obj(d.site).brand && !obj(d.hero).headline) {
    throw new Error("That file doesn't look like Speechless site content.");
  }
  return normalizeContent(d);
}
