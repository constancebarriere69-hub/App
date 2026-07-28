import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { verbConjugations, getVerbById } from "../data/conjugation";
import { SpeakButton } from "../components/SpeakButton";
import { Mascot } from "../components/Mascot";
import { palierColorClasses } from "../lib/palierColors";
import type { VerbConjugation } from "../types/content";

const GROUP_FILTERS: (VerbConjugation["group"] | "tous")[] = ["tous", "I", "II", "irrégulier"];
const GROUP_COLOR: Record<VerbConjugation["group"], string> = { I: "sky", II: "indigo", irrégulier: "rose" };

const PERSON_LABELS: { key: keyof VerbConjugation["forms"]; label: string }[] = [
  { key: "ya", label: "я" },
  { key: "ty", label: "ты" },
  { key: "on", label: "он / она / оно" },
  { key: "my", label: "мы" },
  { key: "vy", label: "вы" },
  { key: "oni", label: "они" },
];

const PAST_LABELS: { key: keyof VerbConjugation["past"]; label: string }[] = [
  { key: "m", label: "masculin (он)" },
  { key: "f", label: "féminin (она)" },
  { key: "n", label: "neutre (оно)" },
  { key: "pl", label: "pluriel (они)" },
];

function VerbDetail({ id }: { id: string }) {
  const verb = getVerbById(id);
  if (!verb) return <Navigate to="/conjugaison" replace />;
  const colors = palierColorClasses[GROUP_COLOR[verb.group]] ?? palierColorClasses.rose;

  return (
    <div>
      <Link to="/conjugaison" className="text-sm text-gray-400 hover:text-gray-600 print:hidden">
        ← Retour à la conjugaison
      </Link>

      <div className="mt-3 mb-6 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div className="flex items-center gap-3">
          <SpeakButton text={verb.infinitive} id={`verb-inf-${verb.id}`} size="lg" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-heading font-cyrillic">{verb.infinitive}</h1>
            <p className="text-sm text-gray-500">
              {verb.infinitiveFr} · <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${colors.badge}`}>groupe {verb.group}</span> · {verb.level}
            </p>
          </div>
        </div>
        <button
          onClick={() => window.print()}
          className="shrink-0 text-xs px-3 py-2 rounded-full border border-gray-200 text-gray-600 hover:border-fuchsia-300"
        >
          🖨️ Fiche imprimable
        </button>
      </div>

      {/* Fiche imprimable */}
      <div className="hidden print:block mb-4">
        <h1 className="text-xl font-bold">Conjugaison — {verb.infinitive} ({verb.infinitiveFr})</h1>
        <p className="text-xs text-gray-500">Русский каждый день · groupe {verb.group} · niveau {verb.level}</p>
      </div>

      <div className="rounded-2xl border border-pink-100 bg-white p-5 mb-4">
        <h3 className="font-heading font-bold text-gray-900 mb-3">{verb.tenseLabel}</h3>
        <div className="space-y-1.5">
          {PERSON_LABELS.map(({ key, label }) => (
            <div key={key} className="flex items-center gap-2 text-sm bg-fuchsia-50/60 rounded-lg px-3 py-2">
              <span className="print:hidden">
                <SpeakButton text={verb.forms[key]} id={`verb-${verb.id}-${key}`} size="sm" />
              </span>
              <span className="text-gray-400 w-28 shrink-0">{label}</span>
              <span className="font-cyrillic font-semibold text-gray-900">{verb.forms[key]}</span>
            </div>
          ))}
        </div>
        {verb.note && (
          <p className="mt-3 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">💡 {verb.note}</p>
        )}
      </div>

      <div className="rounded-2xl border border-pink-100 bg-white p-5 mb-4">
        <h3 className="font-heading font-bold text-gray-900 mb-3">Passé</h3>
        <div className="grid grid-cols-2 gap-2">
          {PAST_LABELS.map(({ key, label }) => (
            <div key={key} className="flex items-center gap-2 text-sm bg-gray-50 rounded-lg px-3 py-2">
              <span className="print:hidden">
                <SpeakButton text={verb.past[key]} id={`verb-past-${verb.id}-${key}`} size="sm" />
              </span>
              <div>
                <p className="font-cyrillic font-semibold text-gray-900">{verb.past[key]}</p>
                <p className="text-[11px] text-gray-400">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {verb.imperative && (
        <div className="rounded-2xl border border-pink-100 bg-white p-5 mb-4">
          <h3 className="font-heading font-bold text-gray-900 mb-3">Impératif</h3>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="print:hidden">
                <SpeakButton text={verb.imperative.ty} id={`verb-imp-ty-${verb.id}`} size="sm" />
              </span>
              <span className="font-cyrillic font-semibold">{verb.imperative.ty}</span>
              <span className="text-gray-400">(ты)</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="print:hidden">
                <SpeakButton text={verb.imperative.vy} id={`verb-imp-vy-${verb.id}`} size="sm" />
              </span>
              <span className="font-cyrillic font-semibold">{verb.imperative.vy}</span>
              <span className="text-gray-400">(вы)</span>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-pink-100 bg-white p-5">
        <h3 className="font-heading font-bold text-gray-900 mb-2">Exemple</h3>
        <div className="flex items-center gap-2">
          <span className="print:hidden">
            <SpeakButton text={verb.example.ru} id={`verb-ex-${verb.id}`} size="sm" />
          </span>
          <div>
            <p className="font-cyrillic text-gray-900">{verb.example.ru}</p>
            <p className="text-sm text-gray-400">{verb.example.fr}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Conjugaison() {
  const { id } = useParams<{ id?: string }>();
  const [group, setGroup] = useState<VerbConjugation["group"] | "tous">("tous");
  const [query, setQuery] = useState("");

  const shown = useMemo(() => {
    return verbConjugations.filter((v) => {
      if (group !== "tous" && v.group !== group) return false;
      if (query.trim().length === 0) return true;
      const q = query.trim().toLowerCase();
      return v.infinitive.toLowerCase().includes(q) || v.infinitiveFr.toLowerCase().includes(q);
    });
  }, [group, query]);

  if (id) return <VerbDetail id={id} />;

  return (
    <div>
      <section className="mb-6 flex items-center gap-4">
        <Mascot mood="thinking" size={72} />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Conjugaison</h1>
          <p className="text-gray-500 text-sm">Les verbes russes essentiels, au présent, au passé et à l'impératif.</p>
        </div>
      </section>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher un verbe (ru ou fr)…"
        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 mb-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
      />

      <div className="flex gap-2 mb-6 flex-wrap">
        {GROUP_FILTERS.map((g) => (
          <button
            key={g}
            onClick={() => setGroup(g)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-semibold border transition ${
              group === g ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-600 border-gray-200 hover:border-fuchsia-300"
            }`}
          >
            {g === "tous" ? "Tous les groupes" : `Groupe ${g}`}
          </button>
        ))}
      </div>

      {shown.length === 0 && <p className="text-sm text-gray-400 text-center py-10">Aucun verbe ne correspond à cette recherche.</p>}

      <div className="grid sm:grid-cols-2 gap-4">
        {shown.map((verb) => {
          const colors = palierColorClasses[GROUP_COLOR[verb.group]] ?? palierColorClasses.rose;
          return (
            <Link
              key={verb.id}
              to={`/conjugaison/${verb.id}`}
              className="rounded-2xl border border-pink-100 bg-white p-5 hover:shadow-lg hover:-translate-y-0.5 transition"
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors.badge}`}>
                  Groupe {verb.group} · {verb.level}
                </span>
              </div>
              <h3 className="font-heading font-bold text-lg text-gray-900 font-cyrillic">{verb.infinitive}</h3>
              <p className="text-sm text-gray-500">{verb.infinitiveFr}</p>
              <p className="text-xs text-gray-400 mt-2 font-cyrillic">
                я {verb.forms.ya} · ты {verb.forms.ty} · он {verb.forms.on}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
