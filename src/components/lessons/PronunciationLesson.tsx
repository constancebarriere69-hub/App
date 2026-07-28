import type { PronunciationDrill } from "../../types/content";
import { SpeakButton } from "../SpeakButton";
import { PronunciationChecker } from "../PronunciationChecker";

export function PronunciationLesson({
  drill,
  onDone,
  onCheckResult,
}: {
  drill: PronunciationDrill;
  onDone: () => void;
  onCheckResult?: (score: number) => void;
}) {
  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-1">{drill.title}</h3>
      <p className="text-sm text-gray-600 mb-4">{drill.explanation}</p>
      <div className="space-y-3">
        {drill.items.map((item, i) => (
          <div key={i} className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex items-start gap-3">
              <SpeakButton text={item.ru} id={`pron-${i}`} size="lg" rate={0.75} />
              <div>
                <p className="font-cyrillic text-xl font-semibold text-gray-900">{item.ru}</p>
                <p className="text-sm text-gray-500">{item.frenchSound}</p>
                <p className="text-xs text-gray-400">{item.fr}</p>
              </div>
            </div>
            <div className="mt-3 pl-1">
              <PronunciationChecker targetText={item.ru} onResult={onCheckResult} />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-gray-400">
        Astuce : écoute plusieurs fois puis répète à voix haute avant de continuer.
      </p>
      <button
        onClick={onDone}
        className="mt-4 px-5 py-2.5 rounded-full bg-fuchsia-600 active:scale-95 shadow-md shadow-fuchsia-200 text-white font-medium hover:bg-fuchsia-700 transition"
      >
        J'ai terminé cette leçon ✓
      </button>
    </div>
  );
}
