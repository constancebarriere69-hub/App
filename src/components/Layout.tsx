import { Link, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useProgressStore } from "../store/progress";
import { BottomNav } from "./BottomNav";
import { CelebrationOverlay } from "./CelebrationOverlay";
import { Mascot } from "./Mascot";

export function Layout() {
  const visitToday = useProgressStore((s) => s.visitToday);
  const streak = useProgressStore((s) => s.getStreak());
  const xp = useProgressStore((s) => s.xp);

  useEffect(() => {
    visitToday();
  }, [visitToday]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-white text-gray-800 print:bg-none print:bg-white">
      <header className="sticky top-0 z-30 backdrop-blur bg-white/85 border-b border-pink-100 pt-safe print:hidden">
        <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg text-gray-900 font-heading">
            <Mascot mood="happy" size={34} />
            <span className="hidden xs:inline">Русский каждый день</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-full bg-fuchsia-50 border border-fuchsia-100 px-2.5 py-1 text-xs font-bold text-fuchsia-600">
              <span>✨</span>
              <span>{xp} XP</span>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-orange-50 border border-orange-100 px-2.5 py-1 text-xs font-bold text-orange-600">
              <span>🔥</span>
              <span>{streak}</span>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-6 pb-28">
        <Outlet />
      </main>
      <BottomNav />
      <CelebrationOverlay />
    </div>
  );
}
