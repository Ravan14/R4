const common = {
  viewBox: '0 0 640 360',
  className: 'technical-diagram',
  'aria-hidden': true,
  focusable: false,
} as const;

export function FormationDiagram() {
  return (
    <svg {...common}>
      <path className="diagram-fill" d="M0 294 Q152 206 320 248 T640 238 V360 H0Z" />
      <path className="diagram-line" d="M0 294 Q152 206 320 248 T640 238" />
      <ellipse className="diagram-line" cx="320" cy="170" rx="262" ry="102" transform="rotate(-12 320 170)" />
      <path className="diagram-orbit" d="M194 116 264 254M422 82 352 254" />
      <path className="diagram-footprint" d="m264 254 88 0 64 54H200Z" />
      <g transform="translate(136 70) rotate(-12)">
        <rect className="diagram-solid" x="38" y="28" width="52" height="42" rx="4" />
        <path className="diagram-line" d="M0 34h38v30H0zM90 34h38v30H90zM64 70v24" />
        <circle className="diagram-accent" cx="64" cy="49" r="8" />
      </g>
      <g transform="translate(390 34) rotate(-12)">
        <rect className="diagram-solid" x="38" y="28" width="52" height="42" rx="4" />
        <path className="diagram-line" d="M0 34h38v30H0zM90 34h38v30H90zM64 70v24" />
        <circle className="diagram-accent" cx="64" cy="49" r="8" />
      </g>
      <circle className="diagram-accent" cx="264" cy="254" r="6" />
      <circle className="diagram-accent" cx="352" cy="254" r="6" />
    </svg>
  );
}

export function ModalityTimingDiagram() {
  return (
    <svg {...common}>
      <path className="diagram-axis" d="M82 44v256h510M82 300h510" />
      <path className="diagram-line" d="M210 44v256M338 44v256M466 44v256M82 108h510M82 172h510M82 236h510" />
      <path className="diagram-window" d="M100 56h104v232H100zM284 56h104v232H284zM456 56h120v232H456z" />
      <g className="diagram-accent">
        <circle cx="130" cy="108" r="9" /><circle cx="164" cy="172" r="9" />
        <circle cx="122" cy="236" r="9" /><circle cx="182" cy="270" r="9" />
        <circle cx="310" cy="108" r="9" /><circle cx="354" cy="172" r="9" />
        <circle cx="304" cy="236" r="9" /><circle cx="362" cy="270" r="9" />
      </g>
      <path className="diagram-sequence" d="m130 108 34 64-42 64 60 34M310 108l44 64-50 64 58 34" />
      <g className="diagram-solid">
        <circle cx="516" cy="108" r="11" /><circle cx="516" cy="172" r="11" />
        <circle cx="516" cy="236" r="11" /><circle cx="516" cy="270" r="11" />
      </g>
      <path className="diagram-sync" d="M476 88h80M476 152h80M476 216h80M476 250h80" />
    </svg>
  );
}

export function FrameworkDiagram() {
  return (
    <svg {...common}>
      <path className="diagram-line" d="M66 294h508M66 234h448M66 174h388M66 114h328" />
      <path className="diagram-fill" d="M66 254h448v40H66zM66 194h388v40H66zM66 134h328v40H66zM66 74h268v40H66z" />
      <path className="diagram-step" d="M66 254h448v40H66zM66 194h388v40H66zM66 134h328v40H66zM66 74h268v40H66z" />
      <path className="diagram-orbit" d="M514 254 574 76M454 194l120-118M394 134l60-60" />
      <g className="diagram-accent">
        <circle cx="90" cy="274" r="8" /><circle cx="90" cy="214" r="8" />
        <circle cx="90" cy="154" r="8" /><circle cx="90" cy="94" r="8" />
        <circle cx="574" cy="76" r="12" />
      </g>
    </svg>
  );
}

export function DecisionChainDiagram() {
  return (
    <svg {...common}>
      <path className="diagram-axis" d="M70 180h500" />
      <path className="diagram-sequence" d="m146 168 12 12-12 12M266 168l12 12-12 12M386 168l12 12-12 12M506 168l12 12-12 12" />
      <g className="diagram-solid">
        <circle cx="80" cy="180" r="28" /><circle cx="200" cy="180" r="28" />
        <circle cx="320" cy="180" r="28" /><circle cx="440" cy="180" r="28" />
        <circle cx="560" cy="180" r="28" />
      </g>
      <g className="diagram-line">
        <path d="M66 180h28M80 166v28M186 194l28-28M186 166l28 28M306 180h28M320 166v28M426 180h28M440 166v28M546 180h28M560 166v28" />
        <path className="diagram-orbit" d="M80 152V88h360v64M200 208v64h360v-64" />
      </g>
      <g className="diagram-accent">
        <circle cx="80" cy="88" r="7" /><circle cx="440" cy="88" r="7" />
        <circle cx="200" cy="272" r="7" /><circle cx="560" cy="272" r="7" />
      </g>
    </svg>
  );
}

export function GroundTrackDiagram() {
  return (
    <svg {...common}>
      <rect className="diagram-fill" x="38" y="36" width="564" height="288" rx="6" />
      <path className="diagram-line" d="M38 36h564v288H38zM38 108h564M38 180h564M38 252h564M179 36v288M320 36v288M461 36v288" />
      <path className="diagram-track" d="M38 202c72-154 132-154 202 0s132 154 202 0 132-154 160-90" />
      <path className="diagram-track diagram-track--secondary" d="M38 246c72-154 132-154 202 0s132 154 202 0 132-154 160-90" />
      <g className="diagram-accent">
        <circle cx="106" cy="122" r="7" /><circle cx="240" cy="202" r="7" />
        <circle cx="374" cy="282" r="7" /><circle cx="510" cy="202" r="7" />
      </g>
    </svg>
  );
}

export function CandidateProfileDiagram() {
  return (
    <svg {...common}>
      <circle className="diagram-fill" cx="320" cy="180" r="58" />
      <circle className="diagram-step" cx="320" cy="180" r="58" />
      <path className="diagram-line" d="M320 122V54M378 180h94M320 238v68M262 180h-94M276 136 208 68M364 136l68-68M276 224l-68 68M364 224l68 68" />
      <g className="diagram-solid">
        <circle cx="320" cy="54" r="30" /><circle cx="472" cy="180" r="30" />
        <circle cx="320" cy="306" r="30" /><circle cx="168" cy="180" r="30" />
      </g>
      <g className="diagram-accent">
        <circle cx="208" cy="68" r="10" /><circle cx="432" cy="68" r="10" />
        <circle cx="208" cy="292" r="10" /><circle cx="432" cy="292" r="10" />
      </g>
      <path className="diagram-sync" d="M292 180h56M320 152v56" />
    </svg>
  );
}

export function LocatorDiagram() {
  return (
    <svg {...common}>
      <path className="diagram-fill" d="M0 0h640v360H0z" />
      <path className="diagram-line" d="M-20 82c114-74 184 58 298-12S474 8 660 88M-30 274c120-80 224 46 330-28s206-38 370 32M86-20c64 98-52 168 18 268s32 106 12 132M516-20c-80 98 40 178-24 272s-24 96-8 128" />
      <path className="diagram-track" d="M-10 226c128-36 188-154 306-106s198 126 354 74" />
      <path className="diagram-solid" d="M320 92c-46 0-82 36-82 82 0 62 82 126 82 126s82-64 82-126c0-46-36-82-82-82Z" />
      <circle className="diagram-pin" cx="320" cy="172" r="30" />
      <circle className="diagram-accent" cx="320" cy="172" r="9" />
    </svg>
  );
}
