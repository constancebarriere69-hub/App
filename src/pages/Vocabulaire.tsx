import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { vocabThemes, getVocabThemeById } from "../data/thematicVocab";
import { useSrsStore } from "../store/srs";
import { SpeakButton } from "../components/SpeakButton";
import { Mascot } from "../components/Mascot";
import { palierColorClasses } from "../lib/palierColors";

const LEVEL_COLOR: Record<string, string> = { A1: "rose", A2: "sky", B1: "indigo", B2: "purple", C1: "green" };

function ThemeCard({ id }: { id: string }) {
  const theme = getVocabThemeById(id);
  const ensureCards = useSrsStore((s) => s.ensureCards);
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  if (!theme) return <Navigate to="/vocabulaire" replace />;

  const addToRevision = () => {
    ensureCards(theme.words.map((w) => ({ ...w, palierId: `theme-${theme.id}` })));
  };

  return (
    <div>
      <Link to="/vocabulaire" className="text-sm text-gray-400 hover:text-gray-600">
        ← Retour au vocabulaire
      </Link>
      <div className="mt-3 mb-6 flex items-center gap-3">
        <span className="text-4xl">{theme.icon}</span>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">{theme.title}</h1>
          <p className="text-sm text-gray-500">{theme.words.length} mots · niveau {theme.level}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {theme.words.map((word, i) => {
          const isFlipped = flipped.has(i);
          const toggle = () =>
            setFlipped((s) => {
              const next = new Set(s);
              if (next.has(i)) next.delete(i);
              else next.add(i);
              return next;
            });
          return (
            <div
              key={word.ru}
              role="button"
              tabIndex={0}
              onClick={toggle}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggle();
                }
              }}
              className="rounded-xl border border-gray-200 bg-white p-4 text-left hover:shadow-md transition min-h-28 flex flex-col justify-between cursor-pointer"
            >
              {!isFlipped ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="font-cyrillic text-xl font-semibold text-gray-900">{word.ru}</span>
                    <span onClick={(e) => e.stopPropagation()}>
                      <SpeakButton text={word.ru} id={`theme-${theme.id}-${i}`} size="sm" />
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">{word.transcription}</p>
                </>
              ) : (
                <>
                  <span className="text-lg font-medium text-gray-900">{word.fr}</span>
                  <p className="text-xs text-gray-400 mt-2 font-cyrillic">{word.ru}</p>
                </>
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={addToRevision}
        className="px-6 py-3 rounded-full bg-fuchsia-600 text-white font-semibold hover:bg-fuchsia-700 active:scale-95 transition"
      >
        Ajouter à la révision ⚡
      </button>
    </div>
  );
}

export function Vocabulaire() {
  const { id } = useParams<{ id?: string }>();
  if (id) return <ThemeCard id={id} />;

  return (
    <div>
      <section className="mb-6 flex items-center gap-4">
        <Mascot mood="happy" size={72} />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Vocabulaire thématique</h1>
          <p className="text-gray-500 text-sm">Des mots utiles au quotidien, classés par thème, accessibles à tout moment.</p>
        </div>
      </section>

      <div className="grid sm:grid-cols-2 gap-4">
        {vocabThemes.map((theme) => {
          const colors = palierColorClasses[LEVEL_COLOR[theme.level] ?? "rose"];
          return (
            <Link
              key={theme.id}
              to={`/vocabulaire/${theme.id}`}
              className="rounded-2xl border border-pink-100 bg-white p-5 hover:shadow-lg hover:-translate-y-0.5 transition"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{theme.icon}</span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors.badge}`}>{theme.level}</span>
              </div>
              <h3 className="font-heading font-bold text-lg text-gray-900">{theme.title}</h3>
              <p className="text-sm text-gray-500">{theme.words.length} mots</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
