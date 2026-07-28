import { useState } from "react";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import { similarityScore } from "../lib/similarity";

interface PronunciationCheckerProps {
  targetText: string;
  onResult?: (score: number) => void;
}

function feedbackFor(score: number): { label: string; className: string } {
  if (score >= 85) return { label: "Excellent ! Прекрасно !", className: "bg-emerald-50 text-emerald-700 border-emerald-200" };
  if (score >= 60) return { label: "Bien ! Continue à t'entraîner.", className: "bg-amber-50 text-amber-700 border-amber-200" };
  return { label: "Réessaie, écoute encore une fois le modèle.", className: "bg-rose-50 text-rose-700 border-rose-200" };
}

export function PronunciationChecker({ targetText, onResult }: PronunciationCheckerProps) {
  const { supported, listening, error, listen } = useSpeechRecognition();
  const [heard, setHeard] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);

  if (!supported) {
    return (
      <p className="text-xs text-gray-400 italic">
        🎤 Correction vocale non disponible sur ce navigateur (essaie avec Chrome sur ordinateur ou Android).
      </p>
    );
  }

  const handleClick = () => {
    setHeard(null);
    setScore(null);
    listen((transcript) => {
      const s = similarityScore(targetText, transcript);
      setHeard(transcript);
      setScore(s);
      onResult?.(s);
    });
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={listening}
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition active:scale-95 ${
          listening
            ? "bg-rose-100 border-rose-300 text-rose-600 animate-speaking"
            : "bg-white border-gray-200 text-gray-600 hover:border-fuchsia-300"
        }`}
      >
        {listening ? "🎙️ Je t'écoute…" : "🎤 Vérifier ma prononciation"}
      </button>
      {error && <p className="text-xs text-rose-500 mt-1">Micro non accessible : autorise l'accès au micro et réessaie.</p>}
      {score !== null && (
        <div className={`mt-2 rounded-lg border px-3 py-2 text-xs ${feedbackFor(score).className}`}>
          <p className="font-semibold">{feedbackFor(score).label} — {score}%</p>
          {heard && <p className="mt-0.5 opacity-80 font-cyrillic">J'ai entendu : « {heard} »</p>}
        </div>
      )}
    </div>
  );
}
