import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getLiteraryWorkById } from "../data/literature";
import { useProgressStore } from "../store/progress";
import { useSpeech } from "../hooks/useSpeech";
import { SpeakButton } from "../components/SpeakButton";
import { Mascot } from "../components/Mascot";
import { XP_VALUES, randomCheer } from "../lib/xp";

export function LiteraryWorkPage() {
  const { id } = useParams<{ id: string }>();
  const work = id ? getLiteraryWorkById(id) : undefined;
  const [showTranslation, setShowTranslation] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const { speakSequence, speakingId, cancel, supported } = useSpeech();
  const readWorks = useProgressStore((s) => s.readWorks);
  const markLiteraryRead = useProgressStore((s) => s.markLiteraryRead);

  if (!work) return <Navigate to="/bibliotheque" replace />;
  const isRead = readWorks.includes(work.id);

  const playAll = () => {
    setIsPlaying(true);
    const items = work.text.map((line, i) => ({ id: `lit-${i}`, text: line.ru }));
    speakSequence(items, undefined, () => setIsPlaying(false));
  };

  const stop = () => {
    cancel();
    setIsPlaying(false);
  };

  return (
    <div>
      <Link to="/bibliotheque" className="text-sm text-gray-400 hover:text-gray-600">
        ← Retour à la bibliothèque
      </Link>

      <div className="mt-3 mb-6 flex items-start gap-4">
        <Mascot mood={isRead ? "proud" : "happy"} size={56} />
        <div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-fuchsia-100 text-fuchsia-700">
            {work.type} · {work.difficulty}
          </span>
          <h1 className="text-2xl font-bold text-gray-900 font-heading mt-2">{work.title}</h1>
          <p className="text-gray-500 text-sm">
            {work.author} ({work.authorDates}) · {work.year}
          </p>
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
                ▶ Écouter la lecture
              </button>
            ) : (
              <button
                onClick={stop}
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
          {work.text.map((line, i) => (
            <div
              key={i}
              className={`flex items-start gap-2 rounded-lg px-2 py-1.5 transition ${
                speakingId === `lit-${i}` ? "bg-fuchsia-50 ring-1 ring-fuchsia-200" : ""
              }`}
            >
              <SpeakButton text={line.ru} id={`lit-${i}`} size="sm" rate={0.85} />
              <div>
                <p className="font-literary text-lg text-gray-900 leading-snug">{line.ru}</p>
                {showTranslation && <p className="font-literary text-sm text-gray-400 italic">{line.fr}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-pink-100 bg-white p-6 mb-6">
        <h3 className="font-heading font-bold text-gray-900 mb-3">Glossaire</h3>
        <div className="flex flex-wrap gap-2">
          {work.vocab.map((v) => (
            <span
              key={v.ru}
              className="text-xs bg-pink-50 border border-pink-100 rounded-full px-3 py-1.5 text-gray-700"
            >
              <span className="font-cyrillic font-semibold">{v.ru}</span>
              <span className="text-gray-400"> — {v.fr}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-pink-100 bg-white p-6 mb-6">
        <h3 className="font-heading font-bold text-gray-900 mb-2">À propos</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{work.note}</p>
      </div>

      <button
        onClick={() =>
          markLiteraryRead(work.id, XP_VALUES.literaryWork, isRead ? randomCheer() : `Œuvre découverte ! ${randomCheer()}`)
        }
        className="px-6 py-3 rounded-full bg-fuchsia-600 text-white font-semibold hover:bg-fuchsia-700 transition"
      >
        {isRead ? "Relire pour réviser ✓" : "J'ai découvert cette œuvre ✓"}
      </button>
    </div>
  );
}
