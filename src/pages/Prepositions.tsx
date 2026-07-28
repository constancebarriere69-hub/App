import { useState } from "react";
import { prepositions, CASE_LABELS } from "../data/prepositions";
import { SpeakButton } from "../components/SpeakButton";
import { Mascot } from "../components/Mascot";
import { palierColorClasses } from "../lib/palierColors";
import type { GrammarCase } from "../types/content";

const CASE_FILTERS: (GrammarCase | "toutes")[] = [
  "toutes",
  "genitif",
  "datif",
  "accusatif",
  "instrumental",
  "prepositionnel",
];

const CASE_COLORS: Record<GrammarCase, string> = {
  genitif: "rose",
  datif: "sky",
  accusatif: "amber",
  instrumental: "emerald",
  prepositionnel: "violet",
};

export function Prepositions() {
  const [caseFilter, setCaseFilter] = useState<GrammarCase | "toutes">("toutes");

  const shown =
    caseFilter === "toutes"
      ? prepositions
      : prepositions.filter((p) => p.senses.some((s) => s.case === caseFilter));

  return (
    <div>
      <section className="mb-6 flex items-center gap-4">
        <Mascot mood="thinking" size={72} />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Prépositions</h1>
          <p className="text-gray-500 text-sm">Chaque préposition impose un cas — et certaines en changent selon le sens.</p>
        </div>
      </section>

      <section className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <h3 className="font-semibold text-amber-900 mb-1">💡 Le piège classique</h3>
        <p className="text-sm text-amber-800">
          В et на demandent l'<strong>accusatif</strong> quand il y a un déplacement (« je vais dans... »), et le{" "}
          <strong>prépositionnel</strong> quand il n'y a pas de mouvement (« je suis dans... »). Le même réflexe s'applique à под et
          за. C'est le cas qui porte le sens, pas la préposition seule.
        </p>
      </section>

      <div className="flex gap-2 mb-6 flex-wrap">
        {CASE_FILTERS.map((c) => (
          <button
            key={c}
            onClick={() => setCaseFilter(c)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-semibold border transition ${
              caseFilter === c ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-600 border-gray-200 hover:border-fuchsia-300"
            }`}
          >
            {c === "toutes" ? "Toutes" : CASE_LABELS[c]}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {shown.map((prep) => (
          <div key={prep.id} className="rounded-2xl border border-pink-100 bg-white p-5">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <SpeakButton text={prep.ru.split(" / ")[0]} id={`prep-${prep.id}`} size="sm" />
                <span className="font-cyrillic font-bold text-lg text-gray-900">{prep.ru}</span>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">{prep.level}</span>
            </div>
            {prep.note && <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-3">💡 {prep.note}</p>}
            <div className="space-y-2">
              {prep.senses.map((sense, i) => {
                const colors = palierColorClasses[CASE_COLORS[sense.case]] ?? palierColorClasses.rose;
                return (
                  <div key={i} className="rounded-lg border border-gray-100 px-3 py-2.5">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colors.badge}`}>{CASE_LABELS[sense.case]}</span>
                      <span className="text-sm text-gray-700">{sense.meaning}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm bg-gray-50 rounded-lg px-3 py-2">
                      <SpeakButton text={sense.example.ru} id={`prep-ex-${prep.id}-${i}`} size="sm" />
                      <div>
                        <p className="font-cyrillic text-gray-900">{sense.example.ru}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{sense.example.fr}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
