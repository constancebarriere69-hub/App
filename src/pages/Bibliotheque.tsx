import { useState } from "react";
import { Link } from "react-router-dom";
import { literature } from "../data/literature";
import { russianHistory } from "../data/russianHistory";
import { useProgressStore } from "../store/progress";
import { Mascot } from "../components/Mascot";
import { palierColorClasses } from "../lib/palierColors";
import type { LiteraryDifficulty, LiteraryWork } from "../types/content";

const DIFFICULTY_STYLES: Record<LiteraryDifficulty, { badge: string; recommended: string }> = {
  facile: { badge: "bg-emerald-100 text-emerald-700", recommended: "Dès le palier 1" },
  intermédiaire: { badge: "bg-amber-100 text-amber-700", recommended: "Dès le palier 6" },
  avancé: { badge: "bg-rose-100 text-rose-700", recommended: "Dès le palier 9" },
};

const TYPE_ICON: Record<LiteraryWork["type"], string> = {
  comptine: "🎵",
  conte: "🦊",
  récit: "📗",
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
  { key: "récit", label: "📗 Récits" },
  { key: "poème", label: "🕊️ Poèmes" },
  { key: "prose", label: "📕 Prose" },
];

const LEVEL_COLOR: Record<string, string> = { A1: "rose", A2: "sky", B1: "indigo", B2: "purple", C1: "green" };

export function Bibliotheque() {
  const [mode, setMode] = useState<"litterature" | "histoire">("litterature");
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
            Comptines, contes, récits, poèmes et prose pour la langue — et l'histoire de la Russie pour la culture.
          </p>
        </div>
      </section>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setMode("litterature")}
          className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-semibold border-2 transition ${
            mode === "litterature" ? "border-fuchsia-500 bg-fuchsia-50 text-fuchsia-700" : "border-gray-200 bg-white text-gray-500"
          }`}
        >
          📖 Littérature
        </button>
        <button
          onClick={() => setMode("histoire")}
          className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-semibold border-2 transition ${
            mode === "histoire" ? "border-fuchsia-500 bg-fuchsia-50 text-fuchsia-700" : "border-gray-200 bg-white text-gray-500"
          }`}
        >
          🏛️ Histoire de la Russie
        </button>
      </div>

      {mode === "litterature" ? (
        <>
          <div className="rounded-2xl bg-white border border-pink-100 p-3 mb-6 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {readWorks.length} / {literature.length + russianHistory.length} pages découvertes
            </p>
            <div className="w-32 h-2 rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-fuchsia-400 to-rose-400"
                style={{ width: `${literature.length ? (readWorks.length / (literature.length + russianHistory.length)) * 100 : 0}%` }}
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
        </>
      ) : (
        <div>
          <p className="text-sm text-gray-500 mb-4">
            Les grandes étapes de l'histoire russe, du IXe siècle à nos jours, en russe simple avec traduction.
          </p>
          <div className="space-y-3">
            {russianHistory.map((period) => {
              const colors = palierColorClasses[LEVEL_COLOR[period.level] ?? "rose"];
              const isRead = readWorks.includes(period.id);
              return (
                <Link
                  key={period.id}
                  to={`/histoire-russie/${period.id}`}
                  className="flex items-center gap-4 rounded-2xl border border-pink-100 bg-white p-4 hover:shadow-md transition"
                >
                  <span className="text-3xl">{period.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-gray-400">{period.years}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${colors.badge}`}>{period.level}</span>
                      {isRead && <span className="text-[10px] font-bold text-emerald-600">Lu ✓</span>}
                    </div>
                    <h3 className="font-heading font-bold text-gray-900">{period.title}</h3>
                  </div>
                  <span className="text-gray-300">→</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
