import { useContent } from '../content/ContentContext';
import { SECTIONS } from '../content/sections';
import { getContactLinks } from '../utils/contactLinks';
import { asset } from '../utils/asset';

export default function Footer() {
  const { content } = useContent();
  const { site, footer, contact } = content;
  const links = getContactLinks(contact);
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <a className="wordmark" href="#home">
            <img src={asset('logo.png')} alt="" width="32" height="32" />
            <span>{site.brand}</span>
          </a>
          <p className="footer__closing">{footer.closing}</p>
          {site.badgeTagline ? <p className="footer__tagline">{site.badgeTagline}</p> : null}
        </div>

        {SECTIONS.length > 1 ? (
          <nav aria-label="Footer">
            <ul className="footer__links">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>{s.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        {links.length > 0 ? (
          <ul className="footer__links" aria-label="Social and contact links">
            {links.map(({ key, label, href, external }) => (
              <li key={key}>
                <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="container footer__legal">
        <p>
          &copy; {year} Bosuakpe Michael Edem ({site.brand}).
          {site.motto ? ` ${site.motto}` : ''}
        </p>
      </div>
    </footer>
  );
}
