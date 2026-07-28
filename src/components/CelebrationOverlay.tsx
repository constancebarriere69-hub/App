import { useEffect, useState } from "react";
import { useCelebrationStore } from "../store/celebration";
import { Mascot } from "./Mascot";

const CONFETTI_COLORS = ["#ff7aa2", "#ffd166", "#8ecae6", "#95d5b2", "#c8b6ff", "#ffadad"];

interface Particle {
  id: string;
  left: number;
  color: string;
  delay: number;
  size: number;
}

function Confetti() {
  const trigger = useCelebrationStore((s) => s.confettiTrigger);
  const big = useCelebrationStore((s) => s.confettiBig);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (trigger === 0) return;
    const count = big ? 64 : 28;
    const next = Array.from({ length: count }).map((_, i) => ({
      id: `${trigger}-${i}`,
      left: Math.random() * 100,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      delay: Math.random() * 0.25,
      size: 6 + Math.random() * 6,
    }));
    setParticles(next);
    const t = setTimeout(() => setParticles([]), 1700);
    return () => clearTimeout(t);
  }, [trigger, big]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-x-0 top-0 h-0 z-[60] pointer-events-none overflow-visible">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute top-0 animate-confetti rounded-sm"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.45,
            background: p.color,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function Toast() {
  const toast = useCelebrationStore((s) => s.toast);
  const clearToast = useCelebrationStore((s) => s.clearToast);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => clearToast(), toast.levelUp ? 3200 : 2000);
    return () => clearTimeout(t);
  }, [toast, clearToast]);

  if (!toast) return null;

  return (
    <div className="fixed top-safe inset-x-0 z-[60] flex justify-center px-4 pointer-events-none" style={{ top: "max(1rem, env(safe-area-inset-top))" }}>
      <div
        key={toast.id}
        className="animate-bounce-in pointer-events-auto flex items-center gap-3 rounded-2xl bg-white shadow-xl ring-1 ring-pink-100 px-4 py-3 max-w-sm"
      >
        <Mascot mood={toast.levelUp ? "proud" : "excited"} size={40} />
        <div>
          {toast.levelUp ? (
            <>
              <p className="text-sm font-bold text-amber-600 font-heading">Niveau supérieur !</p>
              <p className="text-xs text-gray-500">
                Niveau {toast.levelUp.level} · {toast.levelUp.title}
              </p>
            </>
          ) : (
            <p className="text-sm font-semibold text-gray-800">{toast.message}</p>
          )}
        </div>
        <span className="ml-auto text-sm font-bold text-rose-500 whitespace-nowrap">+{toast.xp} XP</span>
      </div>
    </div>
  );
}

export function CelebrationOverlay() {
  return (
    <>
      <Confetti />
      <Toast />
    </>
  );
}
