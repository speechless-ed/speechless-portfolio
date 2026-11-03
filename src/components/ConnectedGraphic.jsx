import { asset } from '../utils/asset';

// A restrained "connected systems" visual: the Speechless badge at the centre,
// linked to the areas I'm exploring. Purely decorative; the labels repeat interests
// that are already listed in the Skills section.

const NODES = [
  { label: 'AI agents', x: 96, y: 86, lx: 96, ly: 64, accent: false },
  { label: 'Robotics', x: 318, y: 98, lx: 318, ly: 76, accent: true },
  { label: 'Web', x: 350, y: 214, lx: 350, ly: 192, accent: false },
  { label: 'Product', x: 292, y: 330, lx: 292, ly: 358, accent: false },
  { label: 'Automation', x: 110, y: 322, lx: 110, ly: 350, accent: true },
  { label: 'Startups', x: 52, y: 206, lx: 52, ly: 184, accent: false },
];

const CENTER = { x: 200, y: 200 };

export default function ConnectedGraphic() {
  return (
    <div className="graphic">
      <svg viewBox="0 0 400 400" aria-hidden="true" focusable="false">
        <circle cx="200" cy="200" r="118" className="graphic__ring" />
        <circle cx="200" cy="200" r="168" className="graphic__ring graphic__ring--outer" />

        {NODES.map((n, i) => {
          const next = NODES[(i + 1) % NODES.length];
          return <line key={`edge-${n.label}`} x1={n.x} y1={n.y} x2={next.x} y2={next.y} className="graphic__edge" />;
        })}

        {NODES.map((n) => (
          <line
            key={`spoke-${n.label}`}
            x1={CENTER.x}
            y1={CENTER.y}
            x2={n.x}
            y2={n.y}
            className={n.accent ? 'graphic__spoke graphic__spoke--accent' : 'graphic__spoke'}
          />
        ))}

        {NODES.map((n) => (
          <g key={n.label}>
            <circle cx={n.x} cy={n.y} r="6" className={n.accent ? 'graphic__node graphic__node--accent' : 'graphic__node'} />
            <text x={n.lx} y={n.ly} textAnchor="middle" className="graphic__label">
              {n.label}
            </text>
          </g>
        ))}
      </svg>
      <img
        className="graphic__badge"
        src={asset('logo.png')}
        width="256"
        height="256"
        alt="Speechless MB badge: Builder, Thinker, Creator"
      />
    </div>
  );
}
