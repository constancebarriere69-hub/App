import { paliers } from "../data/paliers";
import { literature } from "../data/literature";
import { dialogues } from "../data/dialogues";
import { useProgressStore } from "../store/progress";
import { getLevelInfo } from "../lib/levels";
import { computeBadges } from "../lib/badges";
import { ProgressBar } from "../components/ProgressBar";
import { Mascot } from "../components/Mascot";
import { palierColorClasses } from "../lib/palierColors";

function lastNDays(n: number): string[] {
  const days: string[] = [];
  const cursor = new Date();
  for (let i = 0; i < n; i++) {
    days.unshift(cursor.toISOString().slice(0, 10));
    cursor.setDate(cursor.getDate() - 1);
  }
  return days;
}

const WEEKDAY_LABELS = ["L", "M", "M", "J", "V", "S", "D"];

export function Progres() {
  const xp = useProgressStore((s) => s.xp);
  const streak = useProgressStore((s) => s.getStreak());
  const visitedDates = useProgressStore((s) => s.visitedDates);
  const progress = useProgressStore((s) => s.progress);
  const readWorks = useProgressStore((s) => s.readWorks);
  const dialoguesDone = useProgressStore((s) => s.dialoguesDone);
  const getPalierCompletion = useProgressStore((s) => s.getPalierCompletion);

  const { current, next, progressToNext } = getLevelInfo(xp);
  const badges = computeBadges(progress, streak, readWorks, paliers, literature.length, dialoguesDone, dialogues.length);
  const unlockedCount = badges.filter((b) => b.unlocked).length;

  const days = lastNDays(28);
  const visitedSet = new Set(visitedDates);

  return (
    <div>
      <section className="mb-6 flex items-center gap-4">
        <Mascot mood="proud" size={72} />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-heading">Tes progrès</h1>
          <p className="text-gray-500 text-sm">Niveau, badges et série — regarde comme tu as grandi !</p>
        </div>
      </section>

      <section className="rounded-2xl bg-gradient-to-br from-fuchsia-500 to-rose-400 text-white p-6 mb-6">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm uppercase tracking-wide text-white/80">Niveau {current.level}</p>
          <p className="text-sm font-semibold">{xp} XP</p>
        </div>
        <p className="text-2xl font-bold font-heading mb-3">{current.title}</p>
        <div className="w-full h-3 rounded-full bg-white/25 overflow-hidden">
          <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${progressToNext * 100}%` }} />
        </div>
        <p className="text-xs text-white/80 mt-2">
          {next ? `Encore ${next.minXp - xp} XP avant le niveau ${next.level} — ${next.title}` : "Niveau maximum atteint, bravo !"}
        </p>
      </section>

      <section className="grid sm:grid-cols-2 gap-4 mb-6">
        <div className="rounded-2xl border border-pink-100 bg-white p-4">
          <p className="text-xs text-gray-400 mb-1">Série en cours</p>
          <p className="text-2xl font-bold text-orange-600">🔥 {streak} {streak > 1 ? "jours" : "jour"}</p>
        </div>
        <div className="rounded-2xl border border-pink-100 bg-white p-4">
          <p className="text-xs text-gray-400 mb-1">Badges débloqués</p>
          <p className="text-2xl font-bold text-gray-900">{unlockedCount} / {badges.length}</p>
        </div>
      </section>

      <section className="rounded-2xl border border-pink-100 bg-white p-5 mb-6">
        <h2 className="font-heading font-bold text-gray-900 mb-3">Les 4 dernières semaines</h2>
        <div className="grid grid-cols-7 gap-1.5">
          {WEEKDAY_LABELS.map((d, i) => (
            <div key={i} className="text-center text-[10px] text-gray-300 font-semibold">
              {d}
            </div>
          ))}
          {days.map((day) => (
            <div
              key={day}
              title={day}
              className={`aspect-square rounded-md ${
                visitedSet.has(day) ? "bg-gradient-to-br from-fuchsia-400 to-rose-400" : "bg-gray-100"
              }`}
            />
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="font-heading font-bold text-gray-900 mb-3">Badges</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`rounded-xl border p-3 text-center transition ${
                badge.unlocked ? "border-amber-200 bg-amber-50" : "border-gray-100 bg-gray-50 opacity-60"
              }`}
            >
              <p className={`text-3xl mb-1 ${badge.unlocked ? "" : "grayscale"}`}>{badge.icon}</p>
              <p className="text-xs font-bold text-gray-800">{badge.title}</p>
              <p className="text-[11px] text-gray-500 mt-0.5">{badge.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-heading font-bold text-gray-900 mb-3">Vue d'ensemble des paliers</h2>
        <div className="space-y-2">
          {paliers.map((p) => {
            const completion = getPalierCompletion(p.id, p);
            const colors = palierColorClasses[p.color] ?? palierColorClasses.rose;
            return (
              <div key={p.id} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${colors.badge} whitespace-nowrap`}>
                  P{p.index}
                </span>
                <span className="text-sm text-gray-700 flex-1 truncate">{p.title}</span>
                <div className="w-24">
                  <ProgressBar value={completion} colorClass={colors.bar} />
                </div>
                <span className="text-xs text-gray-400 w-9 text-right">{Math.round(completion * 100)}%</span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
