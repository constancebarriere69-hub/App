import type { MindMap } from "../../types/content";

const PETAL_COLORS = [
  "border-rose-300 bg-rose-50",
  "border-amber-300 bg-amber-50",
  "border-sky-300 bg-sky-50",
  "border-emerald-300 bg-emerald-50",
  "border-violet-300 bg-violet-50",
];

export function MindMapView({ mindMap, onDone }: { mindMap: MindMap; onDone: () => void }) {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-6">
        Fiche mentale récapitulative du palier — pour réviser d'un coup d'œil.
      </p>

      <div className="flex flex-col items-center">
        <div className="rounded-2xl bg-gray-900 text-white px-6 py-3 font-semibold text-lg shadow-lg">
          {mindMap.center}
        </div>
        <div className="w-px h-6 bg-gray-300" />

        <div className="grid sm:grid-cols-2 gap-4 w-full">
          {mindMap.branches.map((branch, i) => (
            <div key={branch.label} className="flex flex-col items-center">
              <div className="w-px h-4 bg-gray-300 hidden sm:block" />
              <div
                className={`w-full rounded-xl border-2 ${PETAL_COLORS[i % PETAL_COLORS.length]} p-4`}
              >
                <p className="font-semibold text-gray-800 mb-2">{branch.label}</p>
                <div className="flex flex-wrap gap-1.5">
                  {branch.children.map((child) => (
                    <span
                      key={child}
                      className="text-xs font-cyrillic bg-white/80 border border-gray-200 rounded-full px-2.5 py-1 text-gray-700"
                    >
                      {child}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onDone}
        className="mt-6 px-5 py-2.5 rounded-full bg-fuchsia-600 active:scale-95 shadow-md shadow-fuchsia-200 text-white font-medium hover:bg-fuchsia-700 transition"
      >
        Fiche révisée ✓
      </button>
    </div>
  );
}
