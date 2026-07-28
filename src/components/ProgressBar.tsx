interface ProgressBarProps {
  value: number; // 0..1
  colorClass?: string;
  className?: string;
}

export function ProgressBar({ value, colorClass = "bg-rose-500", className = "" }: ProgressBarProps) {
  const pct = Math.round(Math.min(1, Math.max(0, value)) * 100);
  return (
    <div className={`w-full h-2.5 rounded-full bg-gray-200/70 overflow-hidden ${className}`}>
      <div
        className={`h-full rounded-full ${colorClass} transition-all duration-500`}
        style={{ width: `${pct}%` }}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}
