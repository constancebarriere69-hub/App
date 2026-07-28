import { useState } from "react";
import { Link } from "react-router-dom";
import { getIdiomOfTheDay } from "../data/idioms";
import { SpeakButton } from "./SpeakButton";

export function IdiomOfTheDay() {
  const [idiom] = useState(getIdiomOfTheDay);
  const [revealed, setRevealed] = useState(false);

  return (
    <section className="rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-rose-400 text-white p-5 mb-8 overflow-hidden relative">
      <div className="absolute -top-4 -right-4 text-7xl opacity-15 select-none">💬</div>
      <div className="flex items-center justify-between mb-2 relative">
        <p className="text-xs uppercase tracking-wide text-white/80 font-semibold">✨ Expression du jour</p>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20">{idiom.level}</span>
      </div>
      <div className="flex items-center gap-2 mb-2 relative">
        <span className="text-white/90">
          <SpeakButton text={idiom.ru} id={`idiom-of-day-${idiom.id}`} size="sm" />
        </span>
        <p className="font-cyrillic text-xl font-bold">{idiom.ru}</p>
      </div>
      {revealed ? (
        <div className="relative">
          <p className="text-sm text-white/80 italic mb-1">« {idiom.literal} »</p>
          <p className="text-sm text-white/95 mb-3">{idiom.meaning}</p>
        </div>
      ) : (
        <button
          onClick={() => setRevealed(true)}
          className="text-xs font-semibold underline decoration-white/50 underline-offset-2 mb-3 relative"
        >
          Voir le sens 👁️
        </button>
      )}
      <Link to="/idiomes" className="text-xs font-semibold underline decoration-white/50 underline-offset-2 relative block">
        Découvrir toutes les expressions →
      </Link>
    </section>
  );
}
