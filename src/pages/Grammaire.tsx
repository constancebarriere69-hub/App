import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { paliers } from "../data/paliers";
import { SpeakButton } from "../components/SpeakButton";
import { Mascot } from "../components/Mascot";
import { palierColorClasses } from "../lib/palierColors";
import type { CEFRLevel } from "../types/content";

const LEVEL_FILTERS: (CEFRLevel | "tous")[] = ["tous", "A1", "A2", "B1", "B2", "C1"];

export function Grammaire() {
  const [level, setLevel] = useState<CEFRLevel | "tous">("tous");
  const [query, setQuery] = useState("");

  const entries = useMemo(() => {
    const list = paliers.flatMap((p) =>
      p.grammar.map((g) => ({ palier: p, point: g }))
    );
    return list.filter(({ palier, point }) => {
      if (level !== "tous" && palier.level !== level) return false;
      if (query.trim().length === 0) return true;
      const q = query.trim().toLowerCase();
      return (
        point.title.toLowerCase().includes(q) ||
        point.explanation.toLowerCase().includes(q) ||
        point.examples.some((ex) => ex.ru.toLowerCase().includes(q) || ex.fr.toLowerCase().includes(q))
      );
    });
  }, [level, query]);

  return (
    <div>
      <section className="mb-6 flex items-center gap-4">
        <Mascot mood="thinking" size={72} />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Grammaire de A à Z</h1>
          <p className="text-gray-500 text-sm">Tous les points de grammaire des 17 paliers, réunis dans une seule fiche de référence.</p>
        </div>
      </section>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher (ex. « génitif », « futur »…)"
        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 mb-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
      />

      <div className="flex gap-2 mb-6 flex-wrap">
        {LEVEL_FILTERS.map((l) => (
          <button
            key={l}
            onClick={() => setLevel(l)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-semibold border transition ${
              level === l ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-600 border-gray-200 hover:border-fuchsia-300"
            }`}
          >
            {l === "tous" ? "Tous niveaux" : l}
          </button>
        ))}
      </div>

      {entries.length === 0 && <p className="text-sm text-gray-400 text-center py-10">Aucun résultat pour cette recherche.</p>}

      <div className="space-y-4">
        {entries.map(({ palier, point }, i) => {
          const colors = palierColorClasses[palier.color] ?? palierColorClasses.rose;
          return (
            <div key={`${palier.id}-${i}`} className="rounded-xl border border-gray-200 bg-white p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{point.title}</h3>
                <Link
                  to={`/palier/${palier.id}?tab=grammaire`}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors.badge} whitespace-nowrap`}
                >
                  P{palier.index} · {palier.level}
                </Link>
              </div>
              <p className="text-sm text-gray-600 mb-3">{point.explanation}</p>
              <ul className="space-y-1.5">
                {point.examples.map((ex, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm bg-amber-50/60 rounded-lg px-3 py-2">
                    <SpeakButton text={ex.ru} id={`gram-ref-${palier.id}-${i}-${j}`} size="sm" />
                    <span className="font-cyrillic font-medium text-gray-900">{ex.ru}</span>
                    <span className="text-gray-400">— {ex.fr}</span>
                  </li>
                ))}
              </ul>
              {point.tip && (
                <p className="mt-3 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                  💡 {point.tip}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
