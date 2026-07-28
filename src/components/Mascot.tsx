export type MascotMood = "happy" | "excited" | "sleepy" | "proud" | "listening" | "thinking";

interface MascotProps {
  mood?: MascotMood;
  size?: number;
  className?: string;
  animated?: boolean;
}

// Миша — le petit ours mascotte de l'application, avec son écharpe russe.
// Dégradés pour le pelage, corps assis avec pattes, et six expressions.
export function Mascot({ mood = "happy", size = 96, className = "", animated = false }: MascotProps) {
  const eyesOpen = mood !== "sleepy";
  const gradId = "mishaFur";
  const earGradId = "mishaEar";

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`${className} ${animated ? "animate-bounce-in" : ""}`}
      role="img"
      aria-label="Миша, la mascotte ours"
    >
      <defs>
        <radialGradient id={gradId} cx="38%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#f2cd9e" />
          <stop offset="55%" stopColor="#d9a066" />
          <stop offset="100%" stopColor="#bd8149" />
        </radialGradient>
        <radialGradient id={earGradId} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#cf9a63" />
          <stop offset="100%" stopColor="#a8703f" />
        </radialGradient>
      </defs>

      {/* pattes / corps assis */}
      <ellipse cx="50" cy="97" rx="22" ry="7" fill="#00000012" />
      <ellipse cx="36" cy="93" rx="7" ry="6" fill={`url(#${gradId})`} />
      <ellipse cx="64" cy="93" rx="7" ry="6" fill={`url(#${gradId})`} />
      <ellipse cx="36" cy="94.5" rx="3.4" ry="2.6" fill="#f2cd9e" opacity="0.7" />
      <ellipse cx="64" cy="94.5" rx="3.4" ry="2.6" fill="#f2cd9e" opacity="0.7" />
      <path d="M27 88 Q50 100 73 88 L73 78 Q50 90 27 78 Z" fill={`url(#${gradId})`} />

      {/* oreilles */}
      <circle cx="24" cy="23" r="12.5" fill={`url(#${earGradId})`} />
      <circle cx="76" cy="23" r="12.5" fill={`url(#${earGradId})`} />
      <circle cx="24" cy="24" r="6.2" fill="#f6dcb8" />
      <circle cx="76" cy="24" r="6.2" fill="#f6dcb8" />

      {/* tête */}
      <circle cx="50" cy="49" r="29.5" fill={`url(#${gradId})`} />
      <ellipse cx="39" cy="36" rx="11" ry="7" fill="#ffffff" opacity="0.18" />

      {mood === "listening" && (
        <>
          <path d="M13 30 Q8 23 13 15" stroke="#ff9fb8" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8" />
          <path d="M87 30 Q92 23 87 15" stroke="#ff9fb8" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8" />
        </>
      )}

      {/* sourcils */}
      {mood === "excited" && (
        <>
          <path d="M30 30 Q35 26 41 29" stroke="#5b3a29" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M59 29 Q65 26 70 30" stroke="#5b3a29" strokeWidth="2" fill="none" strokeLinecap="round" />
        </>
      )}
      {mood === "thinking" && (
        <>
          <path d="M30 29 L41 27" stroke="#5b3a29" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M59 32 L70 30" stroke="#5b3a29" strokeWidth="2" fill="none" strokeLinecap="round" />
        </>
      )}

      {/* joues roses */}
      <ellipse cx="26" cy="55" rx="6.5" ry="4.5" fill="#ffb3c1" opacity="0.65" />
      <ellipse cx="74" cy="55" rx="6.5" ry="4.5" fill="#ffb3c1" opacity="0.65" />

      {/* museau */}
      <ellipse cx="50" cy="58" rx="16" ry="12" fill="#f6dcb8" />
      <ellipse cx="50" cy="52.5" rx="5.2" ry="3.8" fill="#5b3a29" />

      {/* bouche */}
      {mood === "excited" && (
        <path d="M39 61 Q50 73 61 61" stroke="#5b3a29" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      )}
      {mood === "listening" && <ellipse cx="50" cy="63" rx="3.4" ry="4.2" fill="#5b3a29" />}
      {mood === "thinking" && <path d="M45 64 Q50 62 56 64" stroke="#5b3a29" strokeWidth="2.2" fill="none" strokeLinecap="round" />}
      {(mood === "happy" || mood === "proud" || mood === "sleepy") && (
        <path d="M41 60 Q50 65 59 60" stroke="#5b3a29" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      )}

      {/* yeux */}
      {mood === "thinking" ? (
        <>
          <circle cx="35" cy="41" r="4.3" fill="#2b1c14" />
          <circle cx="61" cy="41" r="4.3" fill="#2b1c14" />
          <circle cx="33.3" cy="39.7" r="1.3" fill="#fff" />
          <circle cx="59.3" cy="39.7" r="1.3" fill="#fff" />
        </>
      ) : eyesOpen ? (
        <>
          <circle cx="36" cy="41" r={mood === "listening" ? 5.2 : 4.3} fill="#2b1c14" />
          <circle cx="64" cy="41" r={mood === "listening" ? 5.2 : 4.3} fill="#2b1c14" />
          <circle cx="37.5" cy="39.5" r="1.4" fill="#fff" />
          <circle cx="65.5" cy="39.5" r="1.4" fill="#fff" />
        </>
      ) : (
        <>
          <path d="M31 41 Q36 45 41 41" stroke="#2b1c14" strokeWidth="2.1" fill="none" strokeLinecap="round" />
          <path d="M59 41 Q64 45 69 41" stroke="#2b1c14" strokeWidth="2.1" fill="none" strokeLinecap="round" />
        </>
      )}

      {mood === "excited" && (
        <>
          <path d="M14 28 L18 22 L22 28" stroke="#f4b23a" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M78 28 L82 22 L86 28" stroke="#f4b23a" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}

      {mood === "proud" && (
        <path
          d="M84 12 l2.2 4.6 5 0.7 -3.6 3.6 0.9 5 -4.5 -2.4 -4.5 2.4 0.9 -5 -3.6 -3.6 5 -0.7 z"
          fill="#ffd166"
        />
      )}

      {mood === "thinking" && (
        <>
          <circle cx="82" cy="18" r="2.2" fill="#c9c9c9" />
          <circle cx="88" cy="12" r="1.6" fill="#c9c9c9" />
          <circle cx="92" cy="7" r="1.1" fill="#c9c9c9" />
        </>
      )}

      {/* écharpe */}
      <path d="M26 78 Q50 89 74 78 L74 71 Q50 80 26 71 Z" fill="#e0453c" />
      <circle cx="34" cy="76" r="1.5" fill="#fff" />
      <circle cx="50" cy="80" r="1.5" fill="#fff" />
      <circle cx="66" cy="76" r="1.5" fill="#fff" />
    </svg>
  );
}
