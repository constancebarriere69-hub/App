import { useMemo, useState } from "react";
import type { VocabItem } from "../../types/content";

interface WritingPracticeProps {
  vocabulary: VocabItem[];
  sentences: string[];
  onDone: (score: number) => void;
}

type Exercise =
  | { kind: "translate"; fr: string; ru: string }
  | { kind: "reorder"; sentence: string; tokens: { id: number; text: string }[] };

function normalizeWord(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/[.,!?;:]+$/g, "");
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickRandom<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n);
}

export function WritingPractice({ vocabulary, sentences, onDone }: WritingPracticeProps) {
  const exercises: Exercise[] = useMemo(() => {
    const translations: Exercise[] = pickRandom(vocabulary, Math.min(5, vocabulary.length)).map((v) => ({
      kind: "translate" as const,
      fr: v.fr,
      ru: v.ru,
    }));

    const candidateSentences = sentences
      .map((s) => s.replace(/[."!?]+$/g, "").trim())
      .filter((s) => {
        const wordCount = s.split(/\s+/).length;
        return wordCount >= 3 && wordCount <= 8;
      });

    const reorders: Exercise[] = pickRandom(candidateSentences, Math.min(3, candidateSentences.length)).map(
      (sentence) => ({
        kind: "reorder" as const,
        sentence,
        tokens: shuffle(sentence.split(/\s+/).map((text, id) => ({ id, text }))),
      })
    );

    return shuffle([...translations, ...reorders]);
  }, [vocabulary, sentences]);

  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [built, setBuilt] = useState<{ id: number; text: string }[]>([]);
  const [usedIds, setUsedIds] = useState<Set<number>>(new Set());
  const [checked, setChecked] = useState<boolean | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const exercise = exercises[index];

  const check = () => {
    if (!exercise) return;
    let isCorrect = false;
    if (exercise.kind === "translate") {
      isCorrect = normalizeWord(input) === normalizeWord(exercise.ru);
    } else {
      const answer = built.map((t) => normalizeWord(t.text)).join(" ");
      isCorrect = answer === normalizeWord(exercise.sentence).replace(/[.,!?;:]/g, "");
    }
    setChecked(isCorrect);
    if (isCorrect) setCorrectCount((c) => c + 1);
  };

  const next = () => {
    if (index + 1 >= exercises.length) {
      setFinished(true);
      onDone(Math.round((correctCount / exercises.length) * 100));
      return;
    }
    setIndex((i) => i + 1);
    setInput("");
    setBuilt([]);
    setUsedIds(new Set());
    setChecked(null);
  };

  if (exercises.length === 0) {
    return <p className="text-sm text-gray-400">Pas assez de contenu pour générer des exercices ici.</p>;
  }

  if (finished) {
    const score = Math.round((correctCount / exercises.length) * 100);
    return (
      <div className="rounded-2xl border border-pink-100 bg-white p-6 text-center">
        <p className="text-3xl mb-2">{score >= 70 ? "🎉" : "💪"}</p>
        <p className="text-lg font-bold text-gray-900">
          {correctCount} / {exercises.length} exercices réussis
        </p>
        <p className="text-sm text-gray-500">Score : {score}%</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-gray-500 mb-4">
        Exercice {index + 1} / {exercises.length}
      </p>

      <div className="rounded-2xl border border-pink-100 bg-white p-5">
        {exercise.kind === "translate" ? (
          <>
            <p className="text-xs text-gray-400 mb-1">Traduis en russe :</p>
            <p className="text-lg font-semibold text-gray-900 mb-3">{exercise.fr}</p>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={checked !== null}
              placeholder="Écris ta réponse en russe…"
              className="w-full font-cyrillic text-lg rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 disabled:bg-gray-50"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (checked === null) check();
                  else next();
                }
              }}
            />
          </>
        ) : (
          <>
            <p className="text-xs text-gray-400 mb-2">Remets les mots dans l'ordre :</p>
            <div className="min-h-12 rounded-lg border border-dashed border-gray-300 p-2 mb-3 flex flex-wrap gap-2">
              {built.map((t) => (
                <button
                  key={t.id}
                  disabled={checked !== null}
                  onClick={() => {
                    setBuilt((b) => b.filter((x) => x.id !== t.id));
                    setUsedIds((s) => {
                      const next = new Set(s);
                      next.delete(t.id);
                      return next;
                    });
                  }}
                  className="font-cyrillic text-sm bg-fuchsia-100 text-fuchsia-800 rounded-full px-3 py-1"
                >
                  {t.text}
                </button>
              ))}
              {built.length === 0 && <span className="text-xs text-gray-300 italic">Clique les mots ci-dessous…</span>}
            </div>
            <div className="flex flex-wrap gap-2">
              {exercise.tokens
                .filter((t) => !usedIds.has(t.id))
                .map((t) => (
                  <button
                    key={t.id}
                    disabled={checked !== null}
                    onClick={() => {
                      setBuilt((b) => [...b, t]);
                      setUsedIds((s) => new Set(s).add(t.id));
                    }}
                    className="font-cyrillic text-sm bg-white border border-gray-200 rounded-full px-3 py-1 hover:border-fuchsia-300"
                  >
                    {t.text}
                  </button>
                ))}
            </div>
          </>
        )}

        {checked !== null && (
          <div
            className={`mt-3 rounded-lg px-4 py-2 text-sm font-medium ${
              checked ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {checked ? (
              "Correct ! ✓"
            ) : (
              <>
                Pas tout à fait — la bonne réponse est :{" "}
                <span className="font-cyrillic font-semibold">
                  {exercise.kind === "translate" ? exercise.ru : exercise.sentence}
                </span>
              </>
            )}
          </div>
        )}

        <div className="mt-4 flex justify-end gap-2">
          {checked === null ? (
            <button
              onClick={check}
              disabled={exercise.kind === "translate" ? input.trim().length === 0 : built.length === 0}
              className="px-5 py-2 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 active:scale-95 transition disabled:opacity-40"
            >
              Vérifier
            </button>
          ) : (
            <button
              onClick={next}
              className="px-5 py-2 rounded-full bg-fuchsia-600 text-white text-sm font-medium hover:bg-fuchsia-700 active:scale-95 transition"
            >
              {index + 1 >= exercises.length ? "Voir le résultat" : "Suivant →"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
