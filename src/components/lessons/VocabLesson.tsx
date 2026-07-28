import { useState } from "react";
import type { VocabItem } from "../../types/content";
import { SpeakButton } from "../SpeakButton";

function Flashcard({ item, id }: { item: VocabItem; id: string }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      onClick={() => setFlipped((f) => !f)}
      className="rounded-xl border border-gray-200 bg-white p-4 text-left hover:shadow-md transition min-h-28 flex flex-col justify-between"
    >
      {!flipped ? (
        <>
          <div className="flex items-center justify-between">
            <span className="font-cyrillic text-xl font-semibold text-gray-900">{item.ru}</span>
            <span onClick={(e) => e.stopPropagation()}>
              <SpeakButton text={item.ru} id={id} size="sm" />
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-2">{item.transcription} · clique pour la traduction</p>
        </>
      ) : (
        <>
          <span className="text-lg font-medium text-gray-900">{item.fr}</span>
          <p className="text-xs text-gray-400 mt-2 font-cyrillic">{item.ru}</p>
        </>
      )}
    </button>
  );
}

export function VocabLesson({ items, onDone }: { items: VocabItem[]; onDone: () => void }) {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-4">
        Vocabulaire du palier : clique sur une carte pour voir la traduction, écoute la prononciation.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {items.map((item, i) => (
          <Flashcard key={item.ru} item={item} id={`vocab-${i}`} />
        ))}
      </div>
      <button
        onClick={onDone}
        className="mt-6 px-5 py-2.5 rounded-full bg-fuchsia-600 active:scale-95 shadow-md shadow-fuchsia-200 text-white font-medium hover:bg-fuchsia-700 transition"
      >
        J'ai appris ce vocabulaire ✓
      </button>
    </div>
  );
}
