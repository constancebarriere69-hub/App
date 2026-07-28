import { useState } from "react";
import { Link } from "react-router-dom";
import { literature } from "../data/literature";
import { useProgressStore } from "../store/progress";
import { Mascot } from "../components/Mascot";
import type { LiteraryDifficulty, LiteraryWork } from "../types/content";

const DIFFICULTY_STYLES: Record<LiteraryDifficulty, { badge: string; recommended: string }> = {
  facile: { badge: "bg-emerald-100 text-emerald-700", recommended: "Dès le palier 1" },
  intermédiaire: { badge: "bg-amber-100 text-amber-700", recommended: "Dès le palier 6" },
  avancé: { badge: "bg-rose-100 text-rose-700", recommended: "Dès le palier 9" },
};

const TYPE_ICON: Record<LiteraryWork["type"], string> = {
  comptine: "🎵",
  conte: "🦊",
  poème: "🕊️",
  prose: "📕",
};

const DIFFICULTY_FILTERS: { key: LiteraryDifficulty | "toutes"; label: string }[] = [
  { key: "toutes", label: "Toutes" },
  { key: "facile", label: "Facile" },
  { key: "intermédiaire", label: "Intermédiaire" },
  { key: "avancé", label: "Avancé" },
];

const TYPE_FILTERS: { key: LiteraryWork["type"] | "tous"; label: string }[] = [
  { key: "tous", label: "Tous les types" },
  { key: "comptine", label: "🎵 Comptines" },
  { key: "conte", label: "🦊 Contes" },
  { key: "poème", label: "🕊️ Poèmes" },
  { key: "prose", label: "📕 Prose" },
];

export function Bibliotheque() {
  const [difficulty, setDifficulty] = useState<LiteraryDifficulty | "toutes">("toutes");
  const [type, setType] = useState<LiteraryWork["type"] | "tous">("tous");
  const readWorks = useProgressStore((s) => s.readWorks);

  const shown = literature.filter(
    (w) => (difficulty === "toutes" || w.difficulty === difficulty) && (type === "tous" || w.type === type)
  );

  return (
    <div>
      <section className="mb-6 flex items-center gap-4">
        <Mascot mood="proud" size={64} />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Библиотека — Bibliothèque russe</h1>
          <p className="text-gray-500 text-sm">
            Comptines et contes pour débuter, poèmes et extraits de romans pour progresser jusqu'au niveau C1.
          </p>
        </div>
      </section>

      <div className="rounded-2xl bg-white border border-pink-100 p-3 mb-6 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {readWorks.length} / {literature.length} œuvres découvertes
        </p>
        <div className="w-32 h-2 rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-fuchsia-400 to-rose-400"
            style={{ width: `${literature.length ? (readWorks.length / literature.length) * 100 : 0}%` }}
          />
        </div>
      </div>

      <div className="flex gap-2 mb-3 flex-wrap">
        {TYPE_FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setType(f.key)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-semibold border transition ${
              type === f.key
                ? "bg-fuchsia-600 text-white border-fuchsia-600"
                : "bg-white text-gray-600 border-gray-200 hover:border-fuchsia-300"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {DIFFICULTY_FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setDifficulty(f.key)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-semibold border transition ${
              difficulty === f.key
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-600 border-gray-200 hover:border-fuchsia-300"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {shown.map((work) => {
          const style = DIFFICULTY_STYLES[work.difficulty];
          const isRead = readWorks.includes(work.id);
          return (
            <Link
              key={work.id}
              to={`/bibliotheque/${work.id}`}
              className="rounded-2xl border border-pink-100 bg-white p-5 hover:shadow-lg hover:-translate-y-0.5 transition relative overflow-hidden"
            >
              {isRead && (
                <span className="absolute top-3 right-3 text-xs font-bold text-emerald-600 bg-emerald-50 rounded-full px-2 py-0.5">
                  Lu ✓
                </span>
              )}
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${style.badge}`}>
                {TYPE_ICON[work.type]} {work.difficulty} · {style.recommended}
              </span>
              <h3 className="font-heading font-bold text-lg text-gray-900 mt-3">{work.title}</h3>
              <p className="text-sm text-gray-500">
                {work.author} <span className="text-gray-300">·</span> {work.authorDates}
              </p>
              <p className="font-literary text-gray-600 italic mt-3 text-sm">« {work.text[0].fr} »</p>
            </Link>
          );
        })}
        {shown.length === 0 && (
          <p className="text-sm text-gray-400 col-span-2 text-center py-8">Aucune œuvre ne correspond à ces filtres.</p>
        )}
      </div>
    </div>
  );
}
