import { ArrowRight } from 'lucide-react';
import { useContent } from '../content/ContentContext';
import { hasSection } from '../content/sections';
import ConnectedGraphic from './ConnectedGraphic';

export default function Hero() {
  const { content } = useContent();
  const { site, hero } = content;
  const showProjects = hasSection('projects');
  const showContact = hasSection('contact');

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          {hero.eyebrow ? <p className="eyebrow eyebrow--accent">{hero.eyebrow}</p> : null}
          {hero.greeting ? <p className="hero__greeting">{hero.greeting}</p> : null}
          <h1 id="hero-title" className="hero__name">
            {site.fullName}
          </h1>
          <p className="hero__headline">{hero.headline}</p>
          <p className="hero__text">{hero.copy}</p>
          {showProjects || showContact ? (
            <div className="hero__actions">
              {showProjects ? (
                <a className="btn btn--primary" href="#projects">
                  {hero.primaryCta || 'Explore My Work'}
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
              ) : null}
              {showContact ? (
                <a className="btn btn--outline" href="#contact">
                  {hero.secondaryCta || 'Get In Touch'}
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
        <ConnectedGraphic />
      </div>
    </section>
  );
}
