import { useState } from "react";
import { aspectPairs } from "../data/aspects";
import { SpeakButton } from "../components/SpeakButton";
import { Mascot } from "../components/Mascot";
import { palierColorClasses } from "../lib/palierColors";
import type { CEFRLevel } from "../types/content";

const LEVEL_FILTERS: (CEFRLevel | "tous")[] = ["tous", "A2", "B1"];

export function Aspects() {
  const [level, setLevel] = useState<CEFRLevel | "tous">("tous");
  const shown = level === "tous" ? aspectPairs : aspectPairs.filter((p) => p.level === level);

  return (
    <div>
      <section className="mb-6 flex items-center gap-4">
        <Mascot mood="thinking" size={72} />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Aspects verbaux</h1>
          <p className="text-gray-500 text-sm">Imperfectif ou perfectif ? Le concept le plus difficile du russe pour un francophone.</p>
        </div>
      </section>

      <section className="mb-8 space-y-3">
        <div className="rounded-xl border border-sky-200 bg-sky-50 p-4">
          <h3 className="font-semibold text-sky-900 mb-1">🔵 Imperfectif</h3>
          <p className="text-sm text-sky-800">
            Décrit une action <strong>en cours</strong>, <strong>répétée</strong> ou <strong>habituelle</strong>, sans se soucier du résultat.
            C'est le seul aspect possible au présent.
          </p>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <h3 className="font-semibold text-emerald-900 mb-1">🟢 Perfectif</h3>
          <p className="text-sm text-emerald-800">
            Décrit une action <strong>ponctuelle</strong>, vue comme un tout <strong>achevé</strong>, avec un <strong>résultat</strong>.
            N'existe qu'au passé et au futur — jamais au présent.
          </p>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <h3 className="font-semibold text-amber-900 mb-1">💡 Comment reconnaître les couples</h3>
          <p className="text-sm text-amber-800">
            Le plus souvent, le perfectif s'obtient en ajoutant un préfixe à l'imperfectif (с-, по-, на-, про-...). Mais certains
            couples très courants sont irréguliers et changent complètement de racine — говорить/сказать, брать/взять — il faut
            les apprendre par cœur.
          </p>
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
        {shown.map((pair) => {
          const colors = palierColorClasses[pair.level === "A2" ? "sky" : "indigo"] ?? palierColorClasses.rose;
          return (
            <div key={pair.id} className="rounded-2xl border border-pink-100 bg-white p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-sky-100 text-sky-700">imperfectif</span>
                  <div className="flex items-center gap-1.5">
                    <SpeakButton text={pair.imperfective} id={`asp-imp-${pair.id}`} size="sm" />
                    <span className="font-cyrillic font-bold text-gray-900">{pair.imperfective}</span>
                  </div>
                  <span className="text-gray-300">↔</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">perfectif</span>
                  <div className="flex items-center gap-1.5">
                    <SpeakButton text={pair.perfective} id={`asp-perf-${pair.id}`} size="sm" />
                    <span className="font-cyrillic font-bold text-gray-900">{pair.perfective}</span>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors.badge} whitespace-nowrap`}>{pair.level}</span>
              </div>
              {pair.note && <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-3">💡 {pair.note}</p>}
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-sm bg-sky-50/60 rounded-lg px-3 py-2">
                  <SpeakButton text={pair.exampleImperfective.ru} id={`asp-ex-imp-${pair.id}`} size="sm" />
                  <div>
                    <p className="font-cyrillic text-gray-900">{pair.exampleImperfective.ru}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{pair.exampleImperfective.fr}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-sm bg-emerald-50/60 rounded-lg px-3 py-2">
                  <SpeakButton text={pair.examplePerfective.ru} id={`asp-ex-perf-${pair.id}`} size="sm" />
                  <div>
                    <p className="font-cyrillic text-gray-900">{pair.examplePerfective.ru}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{pair.examplePerfective.fr}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
