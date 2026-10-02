import type { AvatarLook } from '@/lib/hq/types'

export type AvatarState = 'idle' | 'thinking' | 'talking'

const INK = '#1B2233'
const NAVY = '#243334'
const SKY = '#7DF4FF'

function shade(hex: string, amount: number): string {
  const n = parseInt(hex.slice(1), 16)
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)))
  const r = clamp(((n >> 16) & 255) * (1 + amount))
  const g = clamp(((n >> 8) & 255) * (1 + amount))
  const b = clamp((n & 255) * (1 + amount))
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}

/**
 * Mini-avatar animé (style figurine de jeu vidéo) : grosse tête, yeux, bouche,
 * mains et pieds. `state` pilote l'animation : respiration, réflexion ou parole.
 */
export function AgentAvatar({
  look,
  state = 'idle',
  size = 160,
  title,
}: {
  look: AvatarLook
  state?: AvatarState
  size?: number
  title?: string
}) {
  const jacketDark = shade(look.jacket, -0.12)
  const skinDark = shade(look.skin, -0.14)
  const lightJacket = look.jacket.toLowerCase() === '#e5e2e1'

  return (
    <svg
      viewBox="0 0 200 260"
      width={size}
      height={(size * 260) / 200}
      className={`hq-av hq-av--${state}`}
      role="img"
      aria-label={title}
    >
      {title && <title>{title}</title>}

      <ellipse className="hq-av-shadow" cx="100" cy="248" rx="46" ry="7" fill={NAVY} opacity="0.13" />

      <g className="hq-av-body">
        {/* Jambes et pieds */}
        <rect x="75" y="176" width="22" height="50" rx="9" fill={look.pants} />
        <rect x="103" y="176" width="22" height="50" rx="9" fill={look.pants} />
        <rect x="66" y="216" width="33" height="17" rx="8.5" fill={NAVY} />
        <rect x="101" y="216" width="33" height="17" rx="8.5" fill={NAVY} />
        <rect x="70" y="218" width="12" height="4" rx="2" fill="#fff" opacity="0.25" />
        <rect x="105" y="218" width="12" height="4" rx="2" fill="#fff" opacity="0.25" />

        {/* Bras gauche */}
        <g className="hq-av-arm-l">
          <rect x="45" y="124" width="21" height="54" rx="10.5" fill={jacketDark} />
          <circle cx="55.5" cy="182" r="10.5" fill={look.skin} />
          <circle cx="55.5" cy="186" r="4" fill={skinDark} opacity="0.5" />
        </g>

        {/* Buste */}
        <rect
          x="61"
          y="116"
          width="78"
          height="76"
          rx="24"
          fill={look.jacket}
          stroke={lightJacket ? '#B9CACB' : 'none'}
          strokeWidth="2"
        />
        <path d="M86 118 L100 146 L114 118 Z" fill={lightJacket ? '#00A8B2' : '#FFFFFF'} />
        <path d="M86 118 L100 146 L94 118 Z" fill={lightJacket ? '#00828A' : '#E2E8F0'} />
        <rect x="64" y="176" width="72" height="8" rx="4" fill={jacketDark} opacity="0.55" />
        <circle cx="123" cy="138" r="7" fill={lightJacket ? '#00A8B2' : SKY} />
        <path d="M120 139 l2.5 2.5 l4.5 -5" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />

        {/* Bras droit (salue au survol) */}
        <g className="hq-av-arm-r">
          <rect x="134" y="124" width="21" height="54" rx="10.5" fill={jacketDark} />
          {look.accessory === 'cap-magnifier' && (
            <g>
              <line x1="146" y1="182" x2="160" y2="158" stroke={NAVY} strokeWidth="5" strokeLinecap="round" />
              <circle cx="166" cy="148" r="13" fill={SKY} fillOpacity="0.55" stroke={NAVY} strokeWidth="5" />
              <path d="M160 143 q4 -4 9 -2" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </g>
          )}
          <circle cx="144.5" cy="182" r="10.5" fill={look.skin} />
          <circle cx="144.5" cy="186" r="4" fill={skinDark} opacity="0.5" />
        </g>

        {/* Cou */}
        <rect x="90" y="106" width="20" height="16" rx="6" fill={skinDark} />

        {/* Tête */}
        <g className="hq-av-head">
          <circle cx="53" cy="74" r="9" fill={skinDark} />
          <circle cx="147" cy="74" r="9" fill={skinDark} />
          <rect x="52" y="28" width="96" height="86" rx="40" fill={look.skin} />
          <ellipse cx="78" cy="44" rx="17" ry="7" fill="#fff" opacity="0.16" />

          {look.hairStyle === 'short' && (
            <path
              d="M52 66 Q48 24 100 22 Q152 24 148 66 Q142 46 124 42 Q104 52 80 44 Q60 48 52 66 Z"
              fill={look.hair}
            />
          )}
          {look.hairStyle === 'bun' && (
            <>
              <circle cx="100" cy="16" r="15" fill={look.hair} />
              <path d="M52 68 Q50 26 100 24 Q150 26 148 68 Q146 46 128 40 Q100 34 72 42 Q56 50 52 68 Z" fill={look.hair} />
            </>
          )}

          {look.accessory === 'cap-magnifier' && (
            <>
              <path d="M54 50 Q56 20 100 18 Q144 20 146 50 Q100 40 54 50 Z" fill="#00A8B2" />
              <path d="M110 46 Q146 42 170 50 Q166 58 146 56 Q126 54 110 52 Z" fill="#00828A" />
              <circle cx="100" cy="20" r="4" fill="#fff" />
            </>
          )}

          {/* Sourcils */}
          <path d="M74 60 q8 -5 15 0" stroke={look.hair} strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M111 60 q7 -5 15 0" stroke={look.hair} strokeWidth="3.5" fill="none" strokeLinecap="round" />

          {/* Yeux */}
          <g className="hq-av-eyes">
            <ellipse cx="82" cy="74" rx="6.5" ry="8.5" fill={INK} />
            <ellipse cx="118" cy="74" rx="6.5" ry="8.5" fill={INK} />
            <circle cx="84.5" cy="70.5" r="2.4" fill="#fff" />
            <circle cx="120.5" cy="70.5" r="2.4" fill="#fff" />
          </g>

          {/* Joues */}
          <circle cx="71" cy="90" r="6.5" fill="#F9A8A8" opacity="0.5" />
          <circle cx="129" cy="90" r="6.5" fill="#F9A8A8" opacity="0.5" />

          {/* Bouche : sourire au repos, bouche qui parle en réponse */}
          <path className="hq-av-smile" d="M90 93 Q100 103 110 93" stroke="#7A2E2E" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <ellipse className="hq-av-talk" cx="100" cy="97" rx="7" ry="5" fill="#7A2E2E" />

          {look.accessory === 'headset' && (
            <>
              <path d="M49 72 Q48 16 100 14 Q152 16 151 72" stroke="#D7E3E4" strokeWidth="6" fill="none" strokeLinecap="round" />
              <rect x="40" y="60" width="15" height="28" rx="7" fill="#D7E3E4" />
              <rect x="145" y="60" width="15" height="28" rx="7" fill="#D7E3E4" />
              <path d="M48 86 Q54 106 82 104" stroke="#D7E3E4" strokeWidth="4" fill="none" strokeLinecap="round" />
              <circle cx="84" cy="104" r="5" fill="#00A8B2" />
            </>
          )}
        </g>
      </g>

      {/* Bulle de réflexion */}
      <g className="hq-av-dots">
        <circle cx="158" cy="26" r="5" fill="#00A8B2" />
        <circle cx="172" cy="16" r="6" fill="#00A8B2" />
        <circle cx="188" cy="8" r="7" fill="#00A8B2" />
      </g>
    </svg>
  )
}
