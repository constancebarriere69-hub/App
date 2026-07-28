import { useSpeech } from "../hooks/useSpeech";

interface SpeakButtonProps {
  text: string;
  id: string;
  size?: "sm" | "md" | "lg";
  rate?: number;
  label?: string;
}

const sizeClasses: Record<NonNullable<SpeakButtonProps["size"]>, string> = {
  sm: "w-7 h-7 text-sm",
  md: "w-9 h-9 text-base",
  lg: "w-12 h-12 text-xl",
};

export function SpeakButton({ text, id, size = "md", rate, label }: SpeakButtonProps) {
  const { speak, supported, speakingId } = useSpeech();
  const isSpeaking = speakingId === id;

  if (!supported) return null;

  return (
    <button
      type="button"
      onClick={() => speak(text, id, { rate })}
      title="Écouter la prononciation"
      aria-label={label ?? `Écouter : ${text}`}
      className={`${sizeClasses[size]} inline-flex items-center justify-center rounded-full bg-white text-rose-600 border border-rose-200 shadow-sm hover:bg-rose-50 active:scale-95 transition ${
        isSpeaking ? "animate-speaking bg-rose-100" : ""
      }`}
    >
      🔊
    </button>
  );
}
