import { useEffect } from "react";
import { X } from "lucide-react";
import { looksLabel, ratioLabel, combinedScore } from "@/data/types";
import type { Place } from "@/data/place";
import { ScoreMeter } from "./score-meter";

export function VenueDetail({
  venue,
  onClose,
}: {
  venue: Place;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg/70 p-4 pb-44 sm:p-6 sm:pb-44"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="venue-title"
        className="max-h-[min(85dvh,40rem)] w-full max-w-lg overflow-y-auto overscroll-contain rounded-lg border border-line bg-surface p-5 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-medium tracking-[0.14em] text-muted uppercase">
              {venue.area} · {venue.category}
            </p>
            <h2 id="venue-title" className="font-display mt-1 text-3xl leading-tight text-fg">
              {venue.name}
            </h2>
            <p className="mt-1 text-sm text-faint">{venue.address}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-11 shrink-0 items-center justify-center rounded-md border border-line text-muted hover:text-fg"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-5">
          <ScoreMeter
            label="Looks draw"
            value={venue.looks}
            tone="looks"
            caption={looksLabel(venue.looks)}
          />
          <ScoreMeter
            label="Women : men"
            value={venue.ratio}
            tone="ratio"
            caption={ratioLabel(venue.ratio)}
          />
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-md bg-raised p-3">
            <dt className="text-[11px] tracking-wide text-faint uppercase">Combined</dt>
            <dd className="font-display mt-1 text-2xl tabular-nums">
              {combinedScore(venue).toFixed(1)}
            </dd>
          </div>
          <div className="rounded-md bg-raised p-3">
            <dt className="text-[11px] tracking-wide text-faint uppercase">Peak</dt>
            <dd className="mt-1 text-sm leading-snug text-fg">{venue.peak}</dd>
          </div>
        </dl>

        <p className="mt-5 text-sm leading-relaxed text-muted">{venue.blurb}</p>
        <p className="mt-3 text-sm leading-relaxed text-fg">{venue.notes}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {venue.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-line px-2.5 py-1 text-[11px] text-muted"
            >
              {t}
            </span>
          ))}
          <span className="rounded-full border border-line px-2.5 py-1 text-[11px] text-faint">
            {venue.confidence} confidence
          </span>
        </div>
      </div>
    </div>
  );
}
