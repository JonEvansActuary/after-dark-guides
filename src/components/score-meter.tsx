import { cn } from "@/lib/utils";

export function ScoreMeter({
  label,
  value,
  tone,
  caption,
}: {
  label: string;
  value: number;
  tone: "looks" | "ratio";
  caption?: string;
}) {
  const pct = Math.max(0, Math.min(100, value * 10));
  return (
    <div className="min-w-0">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-xs font-medium tracking-wide text-muted uppercase">
          {label}
        </span>
        <span className="font-display text-lg tabular-nums leading-none text-fg">
          {value.toFixed(0)}
          <span className="text-faint text-xs">/10</span>
        </span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-line">
        <div
          className={cn(
            "h-full rounded-full transition-[width] duration-300 ease-out",
            tone === "looks" ? "bg-looks" : "bg-ratio",
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
      {caption ? (
        <p className="mt-1 truncate text-[11px] text-faint">{caption}</p>
      ) : null}
    </div>
  );
}
