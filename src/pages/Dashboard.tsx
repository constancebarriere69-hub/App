import { Link } from "react-router-dom";
import { paliers } from "../data/paliers";
import { literature } from "../data/literature";
import { useProgressStore } from "../store/progress";
import { useProfilesStore } from "../store/profiles";
import { ProgressBar } from "../components/ProgressBar";
import { palierColorClasses } from "../lib/palierColors";
import { Mascot } from "../components/Mascot";
import { IdiomOfTheDay } from "../components/IdiomOfTheDay";
import { getLevelInfo } from "../lib/levels";
import type { LessonProgress } from "../store/progress";
import type { Palier } from "../types/content";

const STEP_LABELS: { key: keyof LessonProgress; label: string; tab: string; needsAlphabet?: boolean }[] = [
  { key: "alphabet", label: "l'alphabet", tab: "alphabet", needsAlphabet: true },
  { key: "grammar", label: "la grammaire", tab: "grammaire" },
  { key: "pronunciation", label: "la prononciation", tab: "prononciation" },
  { key: "spelling", label: "l'orthographe", tab: "orthographe" },
  { key: "vocabulary", label: "le vocabulaire", tab: "vocabulaire" },
  { key: "mindMap", label: "la fiche mentale", tab: "fiche" },
  { key: "writingPracticeDone", label: "les exercices d'écriture", tab: "ecriture" },
  { key: "storyRead", label: "l'histoire à lire", tab: "histoire" },
  { key: "storyWriteDone", label: "l'histoire à écrire", tab: "histoire" },
  { key: "podcastListened", label: "le podcast", tab: "podcast" },
  { key: "conversationDone", label: "la conversation", tab: "conversation" },
];

const LEVEL_ORDER = ["A1", "A2", "B1", "B2", "C1"] as const;
const LEVEL_DESCRIPTIONS: Record<string, string> = {
  A1: "Les tout premiers pas : alphabet, salutations, phrases simples.",
  A2: "Se débrouiller au quotidien : cas, achats, routine.",
  B1: "Raconter le passé et l'avenir, se déplacer avec aisance.",
  B2: "Nuancer sa pensée : participes, gérondifs, hypothèses.",
  C1: "Un russe soutenu et naturel : passif, discours rapporté, idiomes.",
};

function findRecommendation(allPaliers: Palier[], progressOf: (id: string) => LessonProgress) {
  for (const palier of allPaliers) {
    const lp = progressOf(palier.id);
    for (const step of STEP_LABELS) {
      if (step.needsAlphabet && !palier.alphabet) continue;
      if (!lp[step.key]) {
        return { palier, step };
      }
    }
  }
  return null;
}

export function Dashboard() {
  const getLessonProgress = useProgressStore((s) => s.getLessonProgress);
  const getPalierCompletion = useProgressStore((s) => s.getPalierCompletion);
  const getOverallCompletion = useProgressStore((s) => s.getOverallCompletion);
  const streak = useProgressStore((s) => s.getStreak());
  const xp = useProgressStore((s) => s.xp);
  const readWorksCount = useProgressStore((s) => s.readWorks.length);
  // Souscription pour re-render quand la progression change.
  useProgressStore((s) => s.progress);
  const profiles = useProfilesStore((s) => s.profiles);
  const activeProfileId = useProfilesStore((s) => s.activeProfileId);
  const activeProfile = profiles.find((p) => p.id === activeProfileId);

  const recommendation = findRecommendation(paliers, getLessonProgress);
  const overall = getOverallCompletion(paliers);
  const { current, next, progressToNext } = getLevelInfo(xp);

  return (
    <div>
      <section className="mb-6 flex items-center gap-4">
        <Mascot mood="excited" size={72} className="animate-bounce-in" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1 font-heading">
            Привет{activeProfile && activeProfile.name !== "Moi" ? `, ${activeProfile.name}` : ""} ! 👋
          </h1>
          <p className="text-gray-500 text-sm">
            Apprends le russe un peu chaque jour : alphabet, grammaire, prononciation, orthographe, poésie et podcasts.
          </p>
        </div>
      </section>

      <section className="rounded-2xl bg-gradient-to-br from-fuchsia-500 via-rose-400 to-orange-300 text-white p-5 mb-6">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs uppercase tracking-wide text-white/80">Niveau {current.level}</p>
          <Link to="/progres" className="text-xs font-semibold underline decoration-white/50 underline-offset-2">
            Voir mes progrès →
          </Link>
        </div>
        <p className="text-xl font-bold font-heading mb-2">{current.title}</p>
        <div className="w-full h-2.5 rounded-full bg-white/25 overflow-hidden">
          <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${progressToNext * 100}%` }} />
        </div>
        <p className="text-xs text-white/80 mt-2">
          {next ? `${xp} XP · encore ${next.minXp - xp} XP avant le niveau ${next.level}` : `${xp} XP · niveau maximum !`}
        </p>
      </section>

      <section className="grid grid-cols-3 gap-3 mb-6">
        <div className="rounded-xl border border-pink-100 bg-white p-3 text-center">
          <p className="text-xl">🔥</p>
          <p className="text-lg font-bold text-orange-600">{streak}</p>
          <p className="text-[11px] text-gray-400">{streak > 1 ? "jours de suite" : "jour"}</p>
        </div>
        <div className="rounded-xl border border-pink-100 bg-white p-3 text-center">
          <p className="text-xl">🎯</p>
          <p className="text-lg font-bold text-gray-900">{Math.round(overall * 100)}%</p>
          <p className="text-[11px] text-gray-400">progression</p>
        </div>
        <div className="rounded-xl border border-pink-100 bg-white p-3 text-center">
          <p className="text-xl">📖</p>
          <p className="text-lg font-bold text-gray-900">{readWorksCount}/{literature.length}</p>
          <p className="text-[11px] text-gray-400">œuvres lues</p>
        </div>
      </section>

      {recommendation && (
        <section className="mb-8">
          <Link
            to={`/palier/${recommendation.palier.id}?tab=${recommendation.step.tab}`}
            className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-gray-900 to-gray-700 text-white p-5 hover:opacity-95 transition"
          >
            <Mascot mood="happy" size={48} />
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-300 mb-1">Leçon du jour</p>
              <p className="text-lg font-semibold font-heading">
                Palier {recommendation.palier.index} · continue avec {recommendation.step.label}
              </p>
              <p className="text-sm text-gray-300 mt-1">{recommendation.palier.title} →</p>
            </div>
          </Link>
        </section>
      )}

      <section className="mb-8">
        <Link
          to="/dialogue"
          className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-rose-400 text-white p-5 hover:opacity-95 transition"
        >
          <Mascot mood="listening" size={52} />
          <div>
            <p className="font-heading font-bold">🎙️ Dialogue vocal</p>
            <p className="text-sm text-white/90">Parle à voix haute avec Миша et vis de vraies conversations en russe →</p>
          </div>
        </Link>
      </section>

      <section className="mb-8">
        <Link
          to="/bibliotheque"
          className="flex items-center gap-4 rounded-2xl border border-fuchsia-100 bg-fuchsia-50/60 p-5 hover:shadow-md transition"
        >
          <span className="text-3xl">🕊️</span>
          <div>
            <p className="font-heading font-bold text-gray-900">Bibliothèque russe</p>
            <p className="text-sm text-gray-500">Poésie, récits et histoire de la Russie, du plus simple au plus exigeant →</p>
          </div>
        </Link>
      </section>

      <IdiomOfTheDay />

      <section className="grid grid-cols-4 gap-2 mb-8">
        <Link
          to="/palier/palier-1?tab=alphabet"
          className="rounded-2xl border border-pink-100 bg-white p-3 text-center hover:shadow-md transition"
        >
          <p className="text-2xl mb-1">🔤</p>
          <p className="text-[11px] font-semibold text-gray-800">Alphabet</p>
        </Link>
        <Link
          to="/revision"
          className="rounded-2xl border border-pink-100 bg-white p-3 text-center hover:shadow-md transition"
        >
          <p className="text-2xl mb-1">⚡</p>
          <p className="text-[11px] font-semibold text-gray-800">Réviser</p>
        </Link>
        <Link
          to="/grammaire"
          className="rounded-2xl border border-pink-100 bg-white p-3 text-center hover:shadow-md transition"
        >
          <p className="text-2xl mb-1">📚</p>
          <p className="text-[11px] font-semibold text-gray-800">Grammaire</p>
        </Link>
        <Link
          to="/conjugaison"
          className="rounded-2xl border border-pink-100 bg-white p-3 text-center hover:shadow-md transition"
        >
          <p className="text-2xl mb-1">🔀</p>
          <p className="text-[11px] font-semibold text-gray-800">Conjugaison</p>
        </Link>
        <Link
          to="/declinaison"
          className="rounded-2xl border border-pink-100 bg-white p-3 text-center hover:shadow-md transition"
        >
          <p className="text-2xl mb-1">🧠</p>
          <p className="text-[11px] font-semibold text-gray-800">Déclinaison</p>
        </Link>
        <Link
          to="/nombres"
          className="rounded-2xl border border-pink-100 bg-white p-3 text-center hover:shadow-md transition"
        >
          <p className="text-2xl mb-1">🔢</p>
          <p className="text-[11px] font-semibold text-gray-800">Nombres</p>
        </Link>
        <Link
          to="/vocabulaire"
          className="rounded-2xl border border-pink-100 bg-white p-3 text-center hover:shadow-md transition"
        >
          <p className="text-2xl mb-1">🧩</p>
          <p className="text-[11px] font-semibold text-gray-800">Vocabulaire</p>
        </Link>
        <Link
          to="/idiomes"
          className="rounded-2xl border border-pink-100 bg-white p-3 text-center hover:shadow-md transition"
        >
          <p className="text-2xl mb-1">💬</p>
          <p className="text-[11px] font-semibold text-gray-800">Expressions</p>
        </Link>
      </section>

      {LEVEL_ORDER.map((level) => {
        const levelPaliers = paliers.filter((p) => p.level === level);
        if (levelPaliers.length === 0) return null;
        const levelCompletion =
          levelPaliers.reduce((sum, p) => sum + getPalierCompletion(p.id, p), 0) / levelPaliers.length;
        return (
          <section key={level} className="mb-8">
            <div className="flex items-baseline justify-between mb-1">
              <h2 className="text-xl font-semibold text-gray-900 font-heading">
                Niveau {level}
                {levelCompletion >= 1 && <span className="ml-2 text-sm">✅</span>}
              </h2>
              <span className="text-xs text-gray-400">{Math.round(levelCompletion * 100)}%</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">{LEVEL_DESCRIPTIONS[level]}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {levelPaliers.map((palier) => {
                const completion = getPalierCompletion(palier.id, palier);
                const colors = palierColorClasses[palier.color] ?? palierColorClasses.rose;
                return (
                  <Link
                    key={palier.id}
                    to={`/palier/${palier.id}`}
                    className="rounded-2xl border border-pink-100 bg-white p-5 hover:shadow-lg hover:-translate-y-0.5 transition"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors.badge}`}>
                        Palier {palier.index}
                      </span>
                      <span className="text-xs text-gray-400">
                        {completion >= 1 ? "✅" : `${Math.round(completion * 100)}%`}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 font-heading">{palier.title}</h3>
                    <p className="text-sm text-gray-500 mb-3">{palier.subtitle}</p>
                    <ProgressBar value={completion} colorClass={colors.bar} />
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
