import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getHistoryPeriodById, russianHistory } from "../data/russianHistory";
import { useProgressStore } from "../store/progress";
import { useSpeech } from "../hooks/useSpeech";
import { SpeakButton } from "../components/SpeakButton";
import { Mascot } from "../components/Mascot";
import { XP_VALUES, randomCheer } from "../lib/xp";

export function RussianHistoryPage() {
  const { id } = useParams<{ id: string }>();
  const period = id ? getHistoryPeriodById(id) : undefined;
  const [showTranslation, setShowTranslation] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const { speakSequence, speakingId, cancel, supported } = useSpeech();
  const readWorks = useProgressStore((s) => s.readWorks);
  const markLiteraryRead = useProgressStore((s) => s.markLiteraryRead);

  if (!period) return <Navigate to="/bibliotheque" replace />;
  const isRead = readWorks.includes(period.id);

  const idx = russianHistory.findIndex((p) => p.id === period.id);
  const prev = russianHistory[idx - 1];
  const next = russianHistory[idx + 1];

  const playAll = () => {
    setIsPlaying(true);
    const items = period.paragraphs.map((p, i) => ({ id: `hist-${i}`, text: p.ru }));
    speakSequence(items, undefined, () => setIsPlaying(false));
  };

  return (
    <div>
      <Link to="/bibliotheque" className="text-sm text-gray-400 hover:text-gray-600">
        ← Retour à la bibliothèque
      </Link>

      <div className="mt-3 mb-6 flex items-start gap-4">
        <Mascot mood={isRead ? "proud" : "thinking"} size={56} />
        <div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">
            {period.years} · {period.level}
          </span>
          <h1 className="text-2xl font-bold text-gray-900 font-heading mt-2">
            {period.icon} {period.title}
          </h1>
        </div>
      </div>

      <div className="rounded-2xl border border-pink-100 bg-white p-6 mb-6">
        <div className="flex items-center gap-2 mb-5">
          {supported &&
            (!isPlaying ? (
              <button
                onClick={playAll}
                className="px-5 py-2.5 rounded-full bg-fuchsia-600 text-white font-semibold hover:bg-fuchsia-700 transition"
              >
                ▶ Écouter le récit
              </button>
            ) : (
              <button
                onClick={() => {
                  cancel();
                  setIsPlaying(false);
                }}
                className="px-5 py-2.5 rounded-full bg-gray-900 text-white font-semibold hover:bg-gray-700 transition"
              >
                ⏹ Arrêter
              </button>
            ))}
          <button
            onClick={() => setShowTranslation((v) => !v)}
            className="text-xs px-3 py-2 rounded-full border border-gray-200 text-gray-600 hover:border-fuchsia-300"
          >
            {showTranslation ? "Masquer la traduction" : "Voir la traduction"}
          </button>
        </div>

        <div className="space-y-3">
          {period.paragraphs.map((p, i) => (
            <div
              key={i}
              className={`flex items-start gap-2 rounded-lg px-2 py-1.5 transition ${
                speakingId === `hist-${i}` ? "bg-fuchsia-50 ring-1 ring-fuchsia-200" : ""
              }`}
            >
              <SpeakButton text={p.ru} id={`hist-${i}`} size="sm" />
              <div>
                <p className="font-cyrillic text-lg text-gray-900">{p.ru}</p>
                {showTranslation && <p className="text-sm text-gray-400">{p.fr}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-pink-100 bg-white p-6 mb-6">
        <h3 className="font-heading font-bold text-gray-900 mb-3">À retenir</h3>
        <ul className="space-y-1.5">
          {period.keyFacts.map((fact, i) => (
            <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
              <span className="text-fuchsia-500">•</span>
              {fact}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-pink-100 bg-white p-6 mb-6">
        <h3 className="font-heading font-bold text-gray-900 mb-3">Vocabulaire</h3>
        <div className="flex flex-wrap gap-2">
          {period.vocab.map((v) => (
            <span key={v.ru} className="text-xs bg-amber-50 border border-amber-100 rounded-full px-3 py-1.5 text-gray-700">
              <span className="font-cyrillic font-semibold">{v.ru}</span>
              <span className="text-gray-400"> — {v.fr}</span>
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={() => markLiteraryRead(period.id, XP_VALUES.literaryWork, isRead ? randomCheer() : `Page d'histoire découverte ! ${randomCheer()}`)}
        className="px-6 py-3 rounded-full bg-fuchsia-600 text-white font-semibold hover:bg-fuchsia-700 transition"
      >
        {isRead ? "Relire pour réviser ✓" : "J'ai découvert cette page ✓"}
      </button>

      <div className="mt-10 flex items-center justify-between border-t border-gray-100 pt-6">
        {prev ? (
          <Link to={`/histoire-russie/${prev.id}`} className="text-sm text-gray-500 hover:text-gray-800">
            ← {prev.years} · {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/histoire-russie/${next.id}`} className="text-sm text-gray-500 hover:text-gray-800">
            {next.years} · {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
