import { useState } from "react";
import type { SpellingWord } from "../../types/content";
import { useSpeech } from "../../hooks/useSpeech";

function normalize(s: string): string {
  return s.trim().toLowerCase().replace(/ё/g, "е");
}

export function SpellingLesson({
  words,
  onDone,
}: {
  words: SpellingWord[];
  onDone: (score: number) => void;
}) {
  const { speak, supported } = useSpeech();
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState<null | boolean>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const word = words[index];

  const check = () => {
    const isCorrect = normalize(input) === normalize(word.ru);
    setChecked(isCorrect);
    if (isCorrect) setCorrectCount((c) => c + 1);
  };

  const next = () => {
    if (index + 1 >= words.length) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setInput("");
    setChecked(null);
  };

  if (finished) {
    const score = Math.round((correctCount / words.length) * 100);
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
        <p className="text-4xl mb-2">{score >= 70 ? "🎉" : "💪"}</p>
        <p className="text-lg font-semibold text-gray-900">
          {correctCount} / {words.length} mots correctement écrits
        </p>
        <p className="text-sm text-gray-500 mb-4">Score : {score}%</p>
        <button
          onClick={() => onDone(score)}
          className="px-5 py-2.5 rounded-full bg-fuchsia-600 active:scale-95 shadow-md shadow-fuchsia-200 text-white font-medium hover:bg-fuchsia-700 transition"
        >
          Valider la dictée ✓
        </button>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-gray-500 mb-4">
        Dictée : écoute le mot russe puis écris-le en cyrillique. ({index + 1} / {words.length})
      </p>
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => speak(word.ru, `spell-${index}`, { rate: 0.8 })}
            disabled={!supported}
            className="w-14 h-14 rounded-full bg-fuchsia-600 text-white text-2xl flex items-center justify-center hover:bg-fuchsia-700 active:scale-95 shadow-md shadow-fuchsia-200 transition"
          >
            🔊
          </button>
          <div className="text-sm text-gray-500">
            Signification : <span className="text-gray-700 font-medium">{word.fr}</span>
            {word.hint && <div className="text-xs text-gray-400 mt-1">Indice : {word.hint}</div>}
          </div>
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Écris le mot en russe…"
          className="w-full font-cyrillic text-lg rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-rose-400"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (checked === null) check();
              else next();
            }
          }}
        />
        {checked !== null && (
          <div
            className={`mt-3 rounded-lg px-4 py-2 text-sm font-medium ${
              checked ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {checked ? "Correct ! ✓" : (
              <>
                Pas tout à fait — la bonne orthographe est :{" "}
                <span className="font-cyrillic font-semibold">{word.ru}</span>
              </>
            )}
          </div>
        )}
        <div className="mt-4 flex justify-end gap-2">
          {checked === null ? (
            <button
              onClick={check}
              className="px-5 py-2 rounded-full bg-gray-900 active:scale-95 text-white text-sm font-medium hover:bg-gray-700 transition"
            >
              Vérifier
            </button>
          ) : (
            <button
              onClick={next}
              className="px-5 py-2 rounded-full bg-fuchsia-600 active:scale-95 shadow-md shadow-fuchsia-200 text-white text-sm font-medium hover:bg-fuchsia-700 transition"
            >
              {index + 1 >= words.length ? "Voir le résultat" : "Mot suivant →"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
