import { useState } from "react";
import { Link } from "react-router-dom";
import { paliers } from "../data/paliers";
import { useProgressStore } from "../store/progress";
import { palierColorClasses } from "../lib/palierColors";
import { SpeakButton } from "./SpeakButton";
import type { CEFRLevel } from "../types/content";

const LEVEL_ORDER: CEFRLevel[] = ["A1", "A2", "B1", "B2", "C1"];

const CROSS_REFS = [
  { to: "/grammaire", icon: "📚", label: "Grammaire" },
  { to: "/conjugaison", icon: "🔀", label: "Conjugaison" },
  { to: "/declinaison", icon: "🧠", label: "Déclinaison" },
  { to: "/prepositions", icon: "🧭", label: "Prépositions" },
  { to: "/aspects", icon: "⚖️", label: "Aspects" },
  { to: "/verbes-mouvement", icon: "🚶", label: "Mouvement" },
  { to: "/idiomes", icon: "💬", label: "Expressions" },
  { to: "/nombres", icon: "🔢", label: "Nombres" },
];

export function RevisionFiches() {
  const progress = useProgressStore((s) => s.progress);
  const getPalierCompletion = useProgressStore((s) => s.getPalierCompletion);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const started = paliers.filter((p) => showAll || progress[p.id]);

  return (
    <div>
      <section className="mb-6 rounded-xl border border-sky-200 bg-sky-50 p-4">
        <h3 className="font-semibold text-sky-900 mb-1">🧭 Fiches transversales</h3>
        <p className="text-xs text-sky-800 mb-3">Les grands sujets de grammaire, tous niveaux confondus.</p>
        <div className="grid grid-cols-4 gap-2">
          {CROSS_REFS.map((ref) => (
            <Link
              key={ref.to}
              to={ref.to}
              className="rounded-xl bg-white border border-sky-100 p-2.5 text-center hover:shadow-sm transition"
            >
              <p className="text-xl mb-0.5">{ref.icon}</p>
              <p className="text-[10px] font-semibold text-gray-700">{ref.label}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading font-bold text-gray-900">Fiches par leçon</h2>
        <button onClick={() => setShowAll((v) => !v)} className="text-xs font-semibold text-fuchsia-600 hover:text-fuchsia-700">
          {showAll ? "N'afficher que mes leçons" : "Afficher tous les paliers"}
        </button>
      </div>

      {started.length === 0 ? (
        <div className="rounded-2xl border border-pink-100 bg-white p-8 text-center">
          <p className="text-sm text-gray-500">
            Commence un palier pour que sa fiche de révision apparaisse ici — grammaire, prononciation et carte mentale résumées en
            un coup d'œil.
          </p>
        </div>
      ) : (
        LEVEL_ORDER.map((level) => {
          const levelPaliers = started.filter((p) => p.level === level);
          if (levelPaliers.length === 0) return null;
          return (
            <section key={level} className="mb-6">
              <h3 className="text-sm font-semibold text-gray-400 mb-2">Niveau {level}</h3>
              <div className="space-y-2">
                {levelPaliers.map((palier) => {
                  const colors = palierColorClasses[palier.color] ?? palierColorClasses.rose;
                  const completion = getPalierCompletion(palier.id, palier);
                  const isOpen = expanded === palier.id;
                  return (
                    <div key={palier.id} className="rounded-2xl border border-pink-100 bg-white overflow-hidden">
                      <button
                        onClick={() => setExpanded(isOpen ? null : palier.id)}
                        className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-gray-50/60 transition"
                      >
                        <div className="flex items-center gap-3">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors.badge} whitespace-nowrap`}>
                            P{palier.index}
                          </span>
                          <div>
                            <p className="font-semibold text-gray-900">{palier.title}</p>
                            <p className="text-xs text-gray-400">{palier.subtitle}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs text-gray-400">{Math.round(completion * 100)}%</span>
                          <span className={`text-gray-400 transition ${isOpen ? "rotate-180" : ""}`}>▾</span>
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-4 border-t border-gray-100 pt-3">
                          {palier.grammar.length > 0 && (
                            <div className="mb-4">
                              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Grammaire</p>
                              <div className="space-y-2">
                                {palier.grammar.map((point, i) => (
                                  <div key={i} className="rounded-lg border border-gray-100 px-3 py-2.5">
                                    <p className="font-semibold text-sm text-gray-900">{point.title}</p>
                                    <p className="text-xs text-gray-600 mt-0.5">{point.explanation}</p>
                                    {point.examples[0] && (
                                      <div className="mt-1.5 flex items-center gap-2 text-xs bg-amber-50/60 rounded-lg px-2.5 py-1.5">
                                        <SpeakButton text={point.examples[0].ru} id={`fiche-gram-${palier.id}-${i}`} size="sm" />
                                        <span className="font-cyrillic font-medium text-gray-900">{point.examples[0].ru}</span>
                                        <span className="text-gray-400">— {point.examples[0].fr}</span>
                                      </div>
                                    )}
                                    {point.tip && <p className="text-[11px] text-amber-700 mt-1.5">💡 {point.tip}</p>}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="mb-4">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Prononciation</p>
                            <div className="rounded-lg border border-gray-100 px-3 py-2.5">
                              <p className="font-semibold text-sm text-gray-900">{palier.pronunciation.title}</p>
                              <p className="text-xs text-gray-600 mt-0.5 mb-2">{palier.pronunciation.explanation}</p>
                              <div className="flex flex-wrap gap-1.5">
                                {palier.pronunciation.items.map((item, i) => (
                                  <span
                                    key={i}
                                    className="inline-flex items-center gap-1 text-xs bg-sky-50 text-sky-800 rounded-full px-2.5 py-1"
                                  >
                                    <span className="font-cyrillic font-medium">{item.ru}</span>
                                    <span className="text-sky-400">[{item.frenchSound}]</span>
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="mb-1">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Carte mentale</p>
                            <div className="rounded-lg border border-gray-100 px-3 py-2.5">
                              <p className="font-semibold text-sm text-gray-900 mb-1.5">{palier.mindMap.center}</p>
                              <ul className="space-y-1">
                                {palier.mindMap.branches.map((branch, i) => (
                                  <li key={i} className="text-xs text-gray-600">
                                    <span className="font-semibold text-gray-800">{branch.label} :</span> {branch.children.join(", ")}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <Link
                            to={`/palier/${palier.id}`}
                            className="inline-block mt-3 text-xs font-semibold text-fuchsia-600 hover:text-fuchsia-700"
                          >
                            Revoir la leçon complète →
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })
      )}
    </div>
  );
}
