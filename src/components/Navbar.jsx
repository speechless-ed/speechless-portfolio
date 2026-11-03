import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useContent } from '../content/ContentContext';
import { SECTIONS, hasSection } from '../content/sections';
import { useActiveSection } from '../hooks/useActiveSection';
import { asset } from '../utils/asset';

const SECTION_IDS = SECTIONS.map((s) => s.id);
const LINKS = SECTIONS.filter((s) => s.id !== 'contact');

export default function Navbar() {
  const { content } = useContent();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const active = useActiveSection(SECTION_IDS);

  const showContact = hasSection('contact');
  // With only one section on the page there is nothing to navigate between yet.
  const showMenu = LINKS.length > 1 || showContact;

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);
  const current = (id) => (active === id ? 'true' : undefined);

  return (
    <header className="nav">
      <div className="container nav__inner">
        <a className="wordmark" href="#home" onClick={close}>
          <img src={asset('logo.png')} alt="" width="32" height="32" />
          <span>{content.site.brand}</span>
        </a>

        {showMenu ? (
          <>
            <nav className="nav__desktop" aria-label="Primary">
              <ul>
                {LINKS.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} aria-current={current(s.id)}>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
              {showContact ? (
                <a className="btn btn--outline btn--sm" href="#contact" aria-current={current('contact')}>
                  Contact
                </a>
              ) : null}
            </nav>

            <button
              ref={toggleRef}
              type="button"
              className="nav__toggle"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            </button>
          </>
        ) : null}
      </div>

      {showMenu ? (
        <nav id="mobile-menu" className="nav__mobile" aria-label="Mobile" hidden={!open}>
          <div className="container">
            <ul>
              {LINKS.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} aria-current={current(s.id)} onClick={close}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            {showContact ? (
              <a className="btn btn--primary btn--block" href="#contact" onClick={close}>
                Contact
              </a>
            ) : null}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
