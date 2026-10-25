/* Diagram labels rewritten in plain language (CONTENT-REPORT.md): the
 * sensors are named the way the rest of the site now names them. */
const modalities = [
  { name: 'Radar', x: 88, y: 102, className: 'sar' },
  { name: 'Camera', x: 512, y: 102, className: 'optical' },
  { name: 'Heat', x: 88, y: 418, className: 'thermal' },
  { name: 'Radio', x: 512, y: 418, className: 'rf' },
];

export default function MissionStage() {
  return (
    <figure className="mission-stage" aria-label="Synchronous observation: four sensors converge into one same-moment event record">
      <div className="mission-stage__scene" aria-hidden="true">
        <svg viewBox="0 0 600 520" role="presentation">
          <ellipse className="mission-stage__orbit" cx="300" cy="260" rx="238" ry="116" transform="rotate(-16 300 260)" />
          <ellipse className="mission-stage__orbit mission-stage__orbit--secondary" cx="300" cy="260" rx="188" ry="218" transform="rotate(38 300 260)" />
          <path className="mission-stage__earth" d="M183 348c68-90 166-90 234 0-68 90-166 90-234 0Z" />
          <path className="mission-stage__grid" d="M183 348h234M213 310h174M213 386h174M300 260v176M246 278c34 42 34 102 0 140M354 278c-34 42-34 102 0 140" />
          {modalities.map((modality) => (
            <g key={modality.name} className={`mission-stage__sensor mission-stage__sensor--${modality.className}`}>
              <path d={`M${modality.x} ${modality.y} L300 348`} />
              <circle cx={modality.x} cy={modality.y} r="24" />
              <circle cx={modality.x} cy={modality.y} r="5" />
            </g>
          ))}
          <circle className="mission-stage__event-ring" cx="300" cy="348" r="42" />
          <circle className="mission-stage__event" cx="300" cy="348" r="9" />
        </svg>
        <div className="mission-stage__labels">
          {modalities.map((modality) => (
            <span key={modality.name} className={`mission-stage__label mission-stage__label--${modality.className}`}>
              {modality.name}
            </span>
          ))}
        </div>
        <div className="mission-stage__readout">
          <span>1 Same-moment event</span>
          <strong>Four sensors, one pass</strong>
        </div>
      </div>
    </figure>
  );
}
