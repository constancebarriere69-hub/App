export type BearFurColor = "brown" | "golden" | "chocolate" | "polar" | "gray" | "rose" | "sky" | "mint";
export type BearAccessory = "none" | "bow" | "flower" | "glasses" | "star";

export const BEAR_FUR_COLORS: BearFurColor[] = ["brown", "golden", "chocolate", "polar", "gray", "rose", "sky", "mint"];
export const BEAR_ACCESSORIES: BearAccessory[] = ["none", "bow", "flower", "glasses", "star"];

// Les profils créés avant ce système stockaient un emoji dans `avatar` : on
// retombe sur une couleur par défaut si la valeur ne correspond à aucun préréglage.
export function resolveFurColor(value?: string): BearFurColor {
  return (BEAR_FUR_COLORS as string[]).includes(value ?? "") ? (value as BearFurColor) : "brown";
}

export function resolveAccessory(value?: string): BearAccessory {
  return (BEAR_ACCESSORIES as string[]).includes(value ?? "") ? (value as BearAccessory) : "none";
}

const FUR_GRADIENTS: Record<BearFurColor, { light: string; mid: string; dark: string; ear: string }> = {
  brown: { light: "#f2cd9e", mid: "#d9a066", dark: "#bd8149", ear: "#a8703f" },
  golden: { light: "#ffe9b8", mid: "#f5c14d", dark: "#d99a1c", ear: "#c4841a" },
  chocolate: { light: "#d3ac86", mid: "#8b5e34", dark: "#6b4423", ear: "#5a3a1d" },
  polar: { light: "#ffffff", mid: "#f0ede6", dark: "#d8d2c2", ear: "#cfc6ae" },
  gray: { light: "#f0f0f2", mid: "#c2c2c8", dark: "#96969e", ear: "#84848c" },
  rose: { light: "#ffe3ee", mid: "#ff9fc0", dark: "#f06795", ear: "#e0567f" },
  sky: { light: "#e3f6ff", mid: "#8fd3f4", dark: "#4fb3e8", ear: "#3a9dd4" },
  mint: { light: "#e3fbef", mid: "#8de3b0", dark: "#4bc98a", ear: "#38b378" },
};

export function AvatarBear({
  furColor = "brown",
  accessory = "none",
  size = 56,
  className = "",
}: {
  furColor?: BearFurColor;
  accessory?: BearAccessory;
  size?: number;
  className?: string;
}) {
  const colors = FUR_GRADIENTS[furColor] ?? FUR_GRADIENTS.brown;
  const gradId = `bearFur-${furColor}`;
  const earGradId = `bearEar-${furColor}`;

  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} role="img" aria-label="Avatar ours">
      <defs>
        <radialGradient id={gradId} cx="38%" cy="30%" r="75%">
          <stop offset="0%" stopColor={colors.light} />
          <stop offset="55%" stopColor={colors.mid} />
          <stop offset="100%" stopColor={colors.dark} />
        </radialGradient>
        <radialGradient id={earGradId} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor={colors.mid} />
          <stop offset="100%" stopColor={colors.ear} />
        </radialGradient>
      </defs>

      {/* oreilles */}
      <circle cx="22" cy="26" r="14" fill={`url(#${earGradId})`} />
      <circle cx="78" cy="26" r="14" fill={`url(#${earGradId})`} />
      <circle cx="22" cy="27" r="7" fill="#f6dcb8" opacity="0.85" />
      <circle cx="78" cy="27" r="7" fill="#f6dcb8" opacity="0.85" />

      {/* tête */}
      <circle cx="50" cy="52" r="34" fill={`url(#${gradId})`} />
      <ellipse cx="37" cy="38" rx="12" ry="8" fill="#ffffff" opacity="0.18" />

      {/* joues */}
      <ellipse cx="25" cy="58" rx="7" ry="5" fill="#ffb3c1" opacity="0.55" />
      <ellipse cx="75" cy="58" rx="7" ry="5" fill="#ffb3c1" opacity="0.55" />

      {/* museau */}
      <ellipse cx="50" cy="62" rx="18" ry="13" fill="#f6dcb8" />
      <ellipse cx="50" cy="56" rx="5.6" ry="4.1" fill="#5b3a29" />
      <path d="M41 65 Q50 71 59 65" stroke="#5b3a29" strokeWidth="2.4" fill="none" strokeLinecap="round" />

      {/* yeux */}
      {accessory === "glasses" ? (
        <>
          <circle cx="36" cy="45" r="8" fill="none" stroke="#3a3a3a" strokeWidth="2.2" />
          <circle cx="64" cy="45" r="8" fill="none" stroke="#3a3a3a" strokeWidth="2.2" />
          <path d="M44 45 L56 45" stroke="#3a3a3a" strokeWidth="2.2" />
          <circle cx="36" cy="45" r="3.6" fill="#2b1c14" />
          <circle cx="64" cy="45" r="3.6" fill="#2b1c14" />
        </>
      ) : (
        <>
          <circle cx="37" cy="44" r="4.6" fill="#2b1c14" />
          <circle cx="63" cy="44" r="4.6" fill="#2b1c14" />
          <circle cx="38.6" cy="42.5" r="1.5" fill="#fff" />
          <circle cx="64.6" cy="42.5" r="1.5" fill="#fff" />
        </>
      )}

      {accessory === "bow" && (
        <path
          d="M50 16 L38 9 Q34 8 35 13 Q36 17 42 17 L50 16 L58 17 Q64 17 65 13 Q66 8 62 9 Z"
          fill="#e0453c"
          stroke="#c6362e"
          strokeWidth="0.8"
        />
      )}

      {accessory === "flower" && (
        <g transform="translate(76 16)">
          <circle cx="0" cy="-6" r="4" fill="#ff9fc0" />
          <circle cx="5.6" cy="-2" r="4" fill="#ff9fc0" />
          <circle cx="3.6" cy="4.8" r="4" fill="#ff9fc0" />
          <circle cx="-3.6" cy="4.8" r="4" fill="#ff9fc0" />
          <circle cx="-5.6" cy="-2" r="4" fill="#ff9fc0" />
          <circle cx="0" cy="0" r="3.4" fill="#ffd166" />
        </g>
      )}

      {accessory === "star" && (
        <path
          d="M78 14 l2.2 4.6 5 0.7 -3.6 3.6 0.9 5 -4.5 -2.4 -4.5 2.4 0.9 -5 -3.6 -3.6 5 -0.7 z"
          fill="#ffd166"
        />
      )}
    </svg>
  );
}
