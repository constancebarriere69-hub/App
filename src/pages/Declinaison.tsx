import { cases, declensions } from "../data/declension";
import { SpeakButton } from "../components/SpeakButton";
import { Mascot } from "../components/Mascot";
import { palierColorClasses } from "../lib/palierColors";

const GENDER_COLOR: Record<string, string> = { masculin: "sky", féminin: "rose", neutre: "amber" };

const CASE_ROWS: { key: keyof (typeof declensions)[number]["forms"]; label: string }[] = [
  { key: "nominatif", label: "Nominatif" },
  { key: "genitif", label: "Génitif" },
  { key: "datif", label: "Datif" },
  { key: "accusatif", label: "Accusatif" },
  { key: "instrumental", label: "Instrumental" },
  { key: "prepositionnel", label: "Prépositionnel" },
];

export function Declinaison() {
  return (
    <div>
      <section className="mb-6 flex items-center gap-4">
        <Mascot mood="thinking" size={72} />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Déclinaison</h1>
          <p className="text-gray-500 text-sm">Les 6 cas russes, expliqués et déclinés sur des noms représentatifs.</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="font-heading font-bold text-gray-900 mb-3">Les 6 cas</h2>
        <div className="space-y-3">
          {cases.map((c) => (
            <div key={c.id} className="rounded-xl border border-gray-200 bg-white p-4">
              <div className="flex items-center justify-between mb-1.5">
                <h3 className="font-semibold text-gray-900">
                  {c.nameFr} <span className="font-cyrillic text-gray-400 text-sm font-normal">— {c.name}</span>
                </h3>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-fuchsia-100 text-fuchsia-700 whitespace-nowrap font-cyrillic">
                  {c.question}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{c.usage}</p>
              <div className="flex items-center gap-2 text-sm bg-amber-50/60 rounded-lg px-3 py-2">
                <SpeakButton text={c.example.ru} id={`case-${c.id}`} size="sm" />
                <span className="font-cyrillic font-medium text-gray-900">{c.example.ru}</span>
                <span className="text-gray-400">— {c.example.fr}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-heading font-bold text-gray-900 mb-3">Tableaux de déclinaison</h2>
        <div className="space-y-5">
          {declensions.map((d) => {
            const colors = palierColorClasses[GENDER_COLOR[d.gender] ?? "rose"] ?? palierColorClasses.rose;
            return (
              <div key={d.id} className="rounded-2xl border border-pink-100 bg-white p-5">
                <div className="flex items-center gap-2 mb-1">
                  <SpeakButton text={d.word} id={`decl-${d.id}`} size="sm" />
                  <h3 className="font-heading font-bold text-lg text-gray-900 font-cyrillic">{d.word}</h3>
                  <span className="text-sm text-gray-400">{d.wordFr}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colors.badge} ml-auto whitespace-nowrap`}>
                    {d.gender}
                  </span>
                </div>
                {d.note && <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mt-2 mb-3">💡 {d.note}</p>}
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {CASE_ROWS.map(({ key, label }) => (
                    <div key={key} className="flex items-center gap-2 text-sm bg-gray-50 rounded-lg px-3 py-2">
                      <SpeakButton text={d.forms[key]} id={`decl-${d.id}-${key}`} size="sm" />
                      <div>
                        <p className="font-cyrillic font-semibold text-gray-900">{d.forms[key]}</p>
                        <p className="text-[11px] text-gray-400">{label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
