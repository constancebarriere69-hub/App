import { NavLink } from "react-router-dom";

const TABS = [
  { to: "/", label: "Accueil", icon: "🏠", end: true },
  { to: "/dialogue", label: "Dialogue", icon: "🎙️", end: false },
  { to: "/bibliotheque", label: "Lecture", icon: "📖", end: false },
  { to: "/progres", label: "Progrès", icon: "🏆", end: false },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/90 backdrop-blur border-t border-pink-100 pb-safe print:hidden">
      <div className="max-w-5xl mx-auto grid grid-cols-4">
        {TABS.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 py-2.5 text-xs font-semibold transition ${
                isActive ? "text-fuchsia-600" : "text-gray-400"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className={`text-xl transition ${isActive ? "scale-110" : ""}`}>{tab.icon}</span>
                {tab.label}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
