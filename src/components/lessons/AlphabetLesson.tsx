import { useState } from "react";
import type { AlphabetLetter } from "../../types/content";
import { SpeakButton } from "../SpeakButton";
import { AlphabetExpress } from "./AlphabetExpress";

const FILTERS: { key: AlphabetLetter["type"] | "tous"; label: string }[] = [
  { key: "tous", label: "Tous" },
  { key: "voyelle", label: "Voyelles" },
  { key: "consonne", label: "Consonnes" },
  { key: "signe", label: "Signes" },
];

export function AlphabetLesson({ letters, onDone }: { letters: AlphabetLetter[]; onDone: () => void }) {
  const [mode, setMode] = useState<"explorer" | "express">("explorer");
  const [filter, setFilter] = useState<AlphabetLetter["type"] | "tous">("tous");
  const shown = filter === "tous" ? letters : letters.filter((l) => l.type === filter);

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode("explorer")}
          className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-semibold border-2 transition ${
            mode === "explorer" ? "border-fuchsia-500 bg-fuchsia-50 text-fuchsia-700" : "border-gray-200 bg-white text-gray-500"
          }`}
        >
          📖 Explorer
        </button>
        <button
          onClick={() => setMode("express")}
          className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-semibold border-2 transition ${
            mode === "express" ? "border-fuchsia-500 bg-fuchsia-50 text-fuchsia-700" : "border-gray-200 bg-white text-gray-500"
          }`}
        >
          ⚡ Leçon express
        </button>
      </div>

      {mode === "express" ? (
        <AlphabetExpress letters={letters} onDone={onDone} />
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-4">
            Clique sur chaque lettre pour entendre sa prononciation. L'alphabet russe (cyrillique) compte 33 lettres.
          </p>
          <div className="flex gap-2 mb-4 flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition ${
                  filter === f.key
                    ? "bg-rose-600 text-white border-rose-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-rose-300"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {shown.map((letter) => (
              <div
                key={letter.upper}
                className="rounded-xl border border-gray-200 bg-white p-3 flex flex-col gap-2 hover:shadow-md transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-semibold text-gray-900 font-cyrillic">
                    {letter.upper}{letter.lower}
                  </span>
                  <SpeakButton text={letter.example.ru} id={`letter-${letter.upper}`} size="sm" />
                </div>
                <p className="text-xs text-gray-500">{letter.frenchSound}</p>
                <p className="text-sm text-gray-700">
                  <span className="font-cyrillic font-medium">{letter.example.ru}</span>{" "}
                  <span className="text-gray-400">— {letter.example.fr}</span>
                </p>
              </div>
            ))}
          </div>
          <button
            onClick={onDone}
            className="mt-6 px-5 py-2.5 rounded-full bg-fuchsia-600 active:scale-95 shadow-md shadow-fuchsia-200 text-white font-medium hover:bg-fuchsia-700 transition"
          >
            J'ai terminé cette leçon ✓
          </button>
        </>
      )}
    </div>
  );
}
