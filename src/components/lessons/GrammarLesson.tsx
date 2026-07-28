import type { GrammarPoint } from "../../types/content";
import { SpeakButton } from "../SpeakButton";

export function GrammarLesson({ points, onDone }: { points: GrammarPoint[]; onDone: () => void }) {
  return (
    <div className="space-y-5">
      {points.map((point, i) => (
        <div key={point.title} className="rounded-xl border border-gray-200 bg-white p-4">
          <h3 className="font-semibold text-gray-900 mb-1">{point.title}</h3>
          <p className="text-sm text-gray-600 mb-3">{point.explanation}</p>
          <ul className="space-y-1.5">
            {point.examples.map((ex, j) => (
              <li key={j} className="flex items-center gap-2 text-sm bg-amber-50/60 rounded-lg px-3 py-2">
                <SpeakButton text={ex.ru} id={`grammar-${i}-${j}`} size="sm" />
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
      ))}
      <button
        onClick={onDone}
        className="mt-2 px-5 py-2.5 rounded-full bg-fuchsia-600 active:scale-95 shadow-md shadow-fuchsia-200 text-white font-medium hover:bg-fuchsia-700 transition"
      >
        J'ai terminé cette leçon ✓
      </button>
    </div>
  );
}
