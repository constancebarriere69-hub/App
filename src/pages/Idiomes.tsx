import { useState } from "react";
import { idioms } from "../data/idioms";
import { SpeakButton } from "../components/SpeakButton";
import { Mascot } from "../components/Mascot";
import { palierColorClasses } from "../lib/palierColors";
import type { CEFRLevel } from "../types/content";

const LEVEL_FILTERS: (CEFRLevel | "tous")[] = ["tous", "B1", "B2", "C1"];
const LEVEL_COLOR: Record<string, string> = { B1: "indigo", B2: "purple", C1: "green" };

export function Idiomes() {
  const [level, setLevel] = useState<CEFRLevel | "tous">("tous");
  const shown = level === "tous" ? idioms : idioms.filter((i) => i.level === level);

  return (
    <div>
      <section className="mb-6 flex items-center gap-4">
        <Mascot mood="excited" size={72} />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Expressions idiomatiques</h1>
          <p className="text-gray-500 text-sm">Les tournures que la grammaire n'enseigne jamais — à apprendre par cœur.</p>
        </div>
      </section>

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

      <div className="space-y-4">
        {shown.map((idiom) => {
          const colors = palierColorClasses[LEVEL_COLOR[idiom.level] ?? "rose"] ?? palierColorClasses.rose;
          return (
            <div key={idiom.id} className="rounded-2xl border border-pink-100 bg-white p-5">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <SpeakButton text={idiom.ru} id={`idiom-${idiom.id}`} size="sm" />
                  <h3 className="font-heading font-bold text-lg text-gray-900 font-cyrillic">{idiom.ru}</h3>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors.badge} whitespace-nowrap`}>{idiom.level}</span>
              </div>
              <p className="text-xs text-gray-400 italic mb-1">« {idiom.literal} »</p>
              <p className="text-sm text-gray-700 mb-3">{idiom.meaning}</p>
              {idiom.example && (
                <div className="flex items-start gap-2 text-sm bg-amber-50/60 rounded-lg px-3 py-2">
                  <SpeakButton text={idiom.example.ru} id={`idiom-ex-${idiom.id}`} size="sm" />
                  <div>
                    <p className="font-cyrillic text-gray-900">{idiom.example.ru}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{idiom.example.fr}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
