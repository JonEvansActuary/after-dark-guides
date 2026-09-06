import { MapPin } from "lucide-react";
import { looksLabel, ratioLabel } from "@/data/types";
import type { Place } from "@/data/place";
import { ScoreMeter } from "./score-meter";
import { cn } from "@/lib/utils";

export function VenueCard({
  venue,
  href,
  onOpen,
  overline,
}: {
  venue: Place;
  href?: string;
  onOpen?: (v: Place) => void;
  overline?: string;
}) {
  const className = cn(
    "flex w-full flex-col rounded-lg border border-line bg-surface p-4 text-left no-underline transition-colors duration-150 select-none hover:border-accent/40 hover:bg-raised",
  );

  const inner = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-medium tracking-[0.14em] text-muted uppercase">
            {overline ?? venue.area}
          </p>
          <h3 className="font-display mt-1 text-xl leading-snug text-fg">{venue.name}</h3>
          <p className="mt-1 text-xs text-faint">
            {venue.category} · {venue.address}
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-line px-2 py-1 text-[10px] tracking-wide text-muted uppercase">
          {venue.confidence}
        </span>
      </div>
      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">{venue.blurb}</p>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <ScoreMeter label="Looks draw" value={venue.looks} tone="looks" caption={looksLabel(venue.looks)} />
        <ScoreMeter label="Women : men" value={venue.ratio} tone="ratio" caption={ratioLabel(venue.ratio)} />
      </div>
      <p className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-accent uppercase">
        <MapPin className="size-3.5" />
        Show on map
      </p>
    </>
  );

  if (href) {
    return (
      <a href={href} className={className} data-venue-id={venue.id}>
        {inner}
      </a>
    );
  }

  return (
    <button type="button" onClick={() => onOpen?.(venue)} className={className} data-venue-id={venue.id}>
      {inner}
    </button>
  );
}
