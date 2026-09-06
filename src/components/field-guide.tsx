import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Search, ChevronDown, X, MapPin, List } from "lucide-react";
import { isNightlife } from "@/data/venues";
import { CATEGORIES, combinedScore, type Category } from "@/data/types";
import { VenueCard } from "@/components/venue-card";
import { VenueDetail } from "@/components/venue-detail";
import { ScoreMeter } from "@/components/score-meter";
import { VenueMap } from "@/components/venue-map";
import { CityDock, type CityId } from "@/components/city-dock";
import { cn } from "@/lib/utils";
import type { Place } from "@/data/place";

export type GuideRegion = {
  id: string;
  tab: string;
  kicker: string;
  headline: string;
  range: string;
  blurb: string;
};

type SortKey = "combined" | "looks" | "ratio" | "name" | "area";
export type ViewKey = "list" | "ranks" | "areas" | "map";
export type Scope = "night" | "dining" | "all";

export const ALL_REGION = "all";

export type GuideSearch = {
  region?: string;
  scope?: Scope;
  view?: ViewKey;
  area?: string;
  q?: string;
  place?: string;
};

export function parseGuideSearch(
  raw: Record<string, unknown>,
  regionIds: readonly string[],
  defaultRegion: string,
): GuideSearch {
  const next: GuideSearch = {};
  if (raw.region === ALL_REGION) {
    next.region = ALL_REGION;
  } else if (typeof raw.region === "string" && regionIds.includes(raw.region) && raw.region !== defaultRegion) {
    next.region = raw.region;
  }
  if (raw.scope === "dining" || raw.scope === "all") next.scope = raw.scope;
  if (raw.view === "ranks" || raw.view === "areas" || raw.view === "map") next.view = raw.view;
  if (typeof raw.area === "string" && raw.area !== "" && raw.area !== "All") next.area = raw.area;
  if (typeof raw.q === "string" && raw.q.trim()) next.q = raw.q;
  if (typeof raw.place === "string" && raw.place.trim()) {
    next.place = raw.place.trim();
    next.view = "map";
  }
  return next;
}

export function guideHref(
  path: string,
  defaultRegion: string,
  next: { region?: string; scope?: Scope; view?: ViewKey; area?: string; q?: string; place?: string },
) {
  const p = new URLSearchParams();
  if (next.region && next.region !== defaultRegion) p.set("region", next.region);
  if (next.scope && next.scope !== "night") p.set("scope", next.scope);
  if (next.view && next.view !== "list") p.set("view", next.view);
  if (next.area && next.area !== "All") p.set("area", next.area);
  if (next.q?.trim()) p.set("q", next.q.trim());
  if (next.place?.trim()) p.set("place", next.place.trim());
  const s = p.toString();
  return s ? `${path}?${s}` : path;
}

export function FieldGuide({
  city,
  path,
  title,
  eyebrow,
  defaultRegion,
  regions,
  districtsFor,
  venues,
  methodText,
  footer,
  search,
}: {
  city: CityId;
  path: string;
  title: string;
  eyebrow: string;
  defaultRegion: string;
  regions: readonly GuideRegion[];
  districtsFor: (id: string) => readonly string[];
  venues: Place[];
  methodText: ReactNode;
  footer: string;
  search: GuideSearch;
}) {
  const placed = search.place ? venues.find((v) => v.id === search.place) : undefined;
  const citywide = search.region === ALL_REGION;
  const region = citywide
    ? ALL_REGION
    : placed && regions.some((r) => r.id === placed.region)
      ? placed.region
      : search.region && regions.some((r) => r.id === search.region)
        ? search.region
        : defaultRegion;
  const scope = search.scope ?? "night";
  const view = search.place ? "map" : (search.view ?? "list");
  const [q, setQ] = useState(search.q ?? "");
  const [cat, setCat] = useState<Category | "All">("All");
  const [minLooks, setMinLooks] = useState(0);
  const [minRatio, setMinRatio] = useState(0);
  const [sort, setSort] = useState<SortKey>("combined");
  const [open, setOpen] = useState<Place | null>(placed ?? null);
  const [full, setFull] = useState(false);
  const [method, setMethod] = useState(false);
  const lastPlace = useRef<string | undefined>(undefined);
  const mapBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (search.place) {
      if (search.place !== lastPlace.current) {
        lastPlace.current = search.place;
        const v = venues.find((x) => x.id === search.place);
        if (v) {
          setOpen(v);
          setFull(false);
        }
      }
    } else if (lastPlace.current) {
      lastPlace.current = undefined;
      setOpen(null);
      setFull(false);
    }
  }, [search.place, venues]);

  const clearPick = () => {
    lastPlace.current = undefined;
    setOpen(null);
    setFull(false);
  };

  const regionTab = (id: string) => regions.find((r) => r.id === id)?.tab ?? id;
  const citywideMeta: GuideRegion = {
    id: ALL_REGION,
    tab: "All",
    kicker: "Citywide",
    headline: "The whole city, scored.",
    range: regions.map((r) => r.tab).join(" · "),
    blurb:
      "Every neighborhood in this guide in one directory. Same two scores. Other cities stay on their own tabs.",
  };
  const current = citywide ? citywideMeta : (regions.find((r) => r.id === region) ?? regions[0]);
  const districts = citywide
    ? unique(regions.flatMap((r) => [...districtsFor(r.id)]))
    : [...districtsFor(region)];
  const area = districts.includes(search.area ?? "") ? search.area! : "All";
  const pool = useMemo(
    () => (citywide ? venues : venues.filter((v) => v.region === region)),
    [venues, region, citywide],
  );

  const hrefFor = (next: { region?: string; scope?: Scope; view?: ViewKey; area?: string; q?: string; place?: string }) =>
    guideHref(path, defaultRegion, next);

  const placeHref = (v: Place) => hrefFor({ region, scope, view: "map", place: v.id });
  const overline = (v: Place) => (citywide ? `${regionTab(v.region)} · ${v.area}` : v.area);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    const rows = pool.filter((v) => {
      if (area !== "All" && v.area !== area) return false;
      if (cat !== "All" && v.category !== cat) return false;
      if (scope === "night" && !isNightlife(v)) return false;
      if (
        scope === "dining" &&
        v.category !== "Restaurant" &&
        v.category !== "Cafe" &&
        v.category !== "Coffee" &&
        v.category !== "Dessert" &&
        !isNightlife(v)
      )
        return false;
      if (v.looks < minLooks || v.ratio < minRatio) return false;
      if (!query) return true;
      return (
        v.name.toLowerCase().includes(query) ||
        v.blurb.toLowerCase().includes(query) ||
        v.address.toLowerCase().includes(query) ||
        v.tags.some((t) => t.includes(query)) ||
        v.category.toLowerCase().includes(query)
      );
    });
    if (open && !rows.some((v) => v.id === open.id) && (citywide || open.region === region)) rows.push(open);
    rows.sort((a, b) => {
      if (sort === "looks") return b.looks - a.looks || a.name.localeCompare(b.name);
      if (sort === "ratio") return b.ratio - a.ratio || a.name.localeCompare(b.name);
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "area") {
        const ra = overline(a).localeCompare(overline(b));
        return ra || a.name.localeCompare(b.name);
      }
      return combinedScore(b) - combinedScore(a) || b.looks - a.looks;
    });
    return rows;
  }, [pool, q, area, cat, scope, minLooks, minRatio, sort, open, region, citywide]);

  const night = pool.filter(isNightlife);
  const topLooks = [...night].sort((a, b) => b.looks - a.looks || b.ratio - a.ratio).slice(0, 12);
  const topRatio = [...night].sort((a, b) => b.ratio - a.ratio || b.looks - a.looks).slice(0, 12);
  const topCombo = [...night].sort((a, b) => combinedScore(b) - combinedScore(a)).slice(0, 12);

  const tabHref = (id: string) => hrefFor({ region: id, scope, view: view === "map" ? "map" : view, q });
  const scopeHref = (s: Scope) => hrefFor({ region, scope: s, view, area, q });
  const viewHref = (v: ViewKey) => hrefFor({ region, scope, view: v, area, q });
  const areaHref = (a: string) => hrefFor({ region, scope, view, area: a, q });
  const listHref = viewHref("list");
  const dockRegions = [{ id: ALL_REGION, tab: "All" }, ...regions];

  useLayoutEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (view === "map" && mapBox.current) {
      mapBox.current.scrollIntoView({ block: "start" });
    }
  }, [region, scope, view, area, search.place]);

  return (
    <div className="min-h-screen bg-bg pb-72 text-fg" data-citywide={citywide ? "1" : "0"}>
      <div className="mx-auto max-w-6xl px-4 pt-3 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-medium tracking-[0.22em] text-accent uppercase">{eyebrow}</p>
            <h1 className="font-display text-2xl leading-none sm:text-3xl">{title}</h1>
          </div>
          <p className="hidden text-right text-xs leading-relaxed text-muted lg:block">
            {pool.length} places in {current.tab} · {districts.length} districts
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
        <form method="get" action={path} className="relative block">
          {region !== defaultRegion ? <input type="hidden" name="region" value={region} /> : null}
          {scope !== "night" ? <input type="hidden" name="scope" value={scope} /> : null}
          {view !== "list" ? <input type="hidden" name="view" value={view} /> : null}
          {area !== "All" ? <input type="hidden" name="area" value={area} /> : null}
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-faint" />
          <input
            name="q"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={citywide ? "Search this city…" : "Search this region…"}
            className="h-11 w-full rounded-md border border-line bg-surface pr-3 pl-10 text-sm text-fg placeholder:text-faint outline-none focus:border-accent"
          />
        </form>
        <div className="mt-3 flex flex-wrap gap-2">
          {(["night", "dining", "all"] as const).map((s) => (
            <Chip key={s} active={scope === s} href={scopeHref(s)}>
              {s === "night" ? "Nightlife" : s === "dining" ? "Eat & drink" : "All public"}
            </Chip>
          ))}
          {(["list", "map", "ranks", "areas"] as const).map((s) => (
            <Chip key={s} active={view === s} href={viewHref(s)}>
              {s === "list" ? "Directory" : s === "map" ? "Map" : s === "ranks" ? "Leaderboards" : "By district"}
            </Chip>
          ))}
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        {view !== "map" ? (
          <>
            <section className="max-w-2xl">
              <p className="text-[11px] font-medium tracking-[0.18em] text-accent uppercase">{current.kicker}</p>
              <p className="font-display mt-2 text-3xl leading-tight sm:text-4xl">{current.headline}</p>
              <p className="mt-3 text-sm text-faint">{current.range}</p>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{current.blurb}</p>
            </section>

            <button type="button" onClick={() => setMethod((m) => !m)} className="mt-5 flex items-center gap-2 text-sm text-accent">
              How the scores work
              <ChevronDown className={cn("size-4 transition-transform", method && "rotate-180")} />
            </button>
            {method ? (
              <div className="mt-3 max-w-3xl rounded-lg border border-line bg-surface p-4 text-sm leading-relaxed text-muted">
                {methodText}
              </div>
            ) : null}

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Stat n={pool.length} label={citywide ? "Places in city" : "Places in region"} />
              <Stat n={night.length} label="Nightlife rooms" />
              <Stat n={districts.length} label="Districts" />
              <Stat n="Thu–Sat" label="Peak window" />
            </div>
          </>
        ) : null}

        <div className={view === "map" ? "mt-3 rounded-lg border border-line bg-surface p-4" : "mt-8 rounded-lg border border-line bg-surface p-4"}>
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              <Chip active={area === "All"} href={areaHref("All")}>
                All districts
              </Chip>
              {districts.map((a) => (
                <Chip key={a} active={area === a} href={areaHref(a)}>
                  {a}
                </Chip>
              ))}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <label className="flex min-w-0 flex-1 items-center gap-3 text-xs text-muted">
                <span className="w-20 shrink-0">Looks ≥ {minLooks}</span>
                <input type="range" min={0} max={9} value={minLooks} onChange={(e) => setMinLooks(Number(e.target.value))} className="h-11 w-full accent-looks" />
              </label>
              <label className="flex min-w-0 flex-1 items-center gap-3 text-xs text-muted">
                <span className="w-24 shrink-0">Ratio ≥ {minRatio}</span>
                <input type="range" min={0} max={9} value={minRatio} onChange={(e) => setMinRatio(Number(e.target.value))} className="h-11 w-full accent-ratio" />
              </label>
              <select value={cat} onChange={(e) => setCat(e.target.value as Category | "All")} className="h-11 rounded-md border border-line bg-surface px-3 text-sm text-fg">
                <option value="All">All types</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="h-11 rounded-md border border-line bg-surface px-3 text-sm text-fg">
                <option value="combined">Sort: combined</option>
                <option value="looks">Sort: looks draw</option>
                <option value="ratio">Sort: women:men</option>
                <option value="area">Sort: district</option>
                <option value="name">Sort: name</option>
              </select>
            </div>
          </div>
        </div>

        {view === "ranks" ? (
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            <RankCol title="Highest looks draw" sub="Nightlife only · tap for the map" items={topLooks} metric="looks" hrefFor={placeHref} overline={overline} />
            <RankCol title="Highest women:men" sub="Nightlife only · tap for the map" items={topRatio} metric="ratio" hrefFor={placeHref} overline={overline} />
            <RankCol title="Best combined" sub="0.55 looks + 0.45 ratio · tap for the map" items={topCombo} metric="combo" hrefFor={placeHref} overline={overline} />
          </div>
        ) : view === "areas" ? (
          <div className="mt-8 space-y-10">
            {citywide && area === "All"
              ? regions.map((r) => {
                  const items = filtered.filter((v) => v.region === r.id);
                  if (!items.length) return null;
                  return (
                    <section key={r.id}>
                      <div className="mb-4 flex items-end justify-between">
                        <h2 className="font-display text-3xl">{r.tab}</h2>
                        <p className="text-xs text-faint">{items.length} listed</p>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {items.map((v) => (
                          <VenueCard key={v.id} venue={v} href={placeHref(v)} overline={overline(v)} />
                        ))}
                      </div>
                    </section>
                  );
                })
              : (area === "All" ? districts : [area]).map((a) => {
                  const items = filtered.filter((v) => v.area === a);
                  if (!items.length) return null;
                  return (
                    <section key={a}>
                      <div className="mb-4 flex items-end justify-between">
                        <h2 className="font-display text-3xl">{a}</h2>
                        <p className="text-xs text-faint">{items.length} listed</p>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {items.map((v) => (
                          <VenueCard key={v.id} venue={v} href={placeHref(v)} overline={overline(v)} />
                        ))}
                      </div>
                    </section>
                  );
                })}
          </div>
        ) : view === "map" ? (
          <div className="mt-4" ref={mapBox}>
            {filtered.length === 0 ? (
              <p className="py-16 text-center text-muted">No places match those filters.</p>
            ) : (
              <>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <a
                    href={listHref}
                    data-map-directory
                    className="inline-flex h-11 items-center gap-2 rounded-md bg-accent px-4 text-sm font-medium text-bg no-underline"
                  >
                    <List className="size-4" />
                    Directory
                  </a>
                  <p className="text-sm text-faint">{filtered.length} on the map</p>
                </div>
                <div className="relative">
                  <VenueMap key={`${region}-${open?.id ?? "all"}`} places={filtered} selectedId={open?.id} onOpen={setOpen} />
                  {open ? (
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1100] p-3">
                      <MapPick
                        venue={open}
                        listHref={listHref}
                        closeHref={hrefFor({ region, scope, view: "map", area, q })}
                        onClose={clearPick}
                        onDetails={() => setFull(true)}
                      />
                    </div>
                  ) : (
                    <p className="mt-3 text-sm text-faint">Tap a pin — or a directory listing — to zoom to that room.</p>
                  )}
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            <p className="mt-5 text-sm text-faint">
              {filtered.length} {filtered.length === 1 ? "place" : "places"} · tap a listing for the map
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {filtered.map((v) => (
                <VenueCard key={v.id} venue={v} href={placeHref(v)} overline={overline(v)} />
              ))}
            </div>
            {filtered.length === 0 ? <p className="py-16 text-center text-muted">No places match those filters.</p> : null}
          </>
        )}

        {view !== "map" ? (
          <footer className="mt-16 border-t border-line py-8 text-xs leading-relaxed text-faint">{footer}</footer>
        ) : null}
      </main>

      {full && open ? <VenueDetail venue={open} onClose={() => setFull(false)} /> : null}
      <CityDock current={city} regions={dockRegions} region={region} tabHref={tabHref} />
    </div>
  );
}

function unique(items: string[]) {
  const seen = new Set<string>();
  return items.filter((x) => {
    if (seen.has(x)) return false;
    seen.add(x);
    return true;
  });
}

function MapPick({
  venue,
  listHref,
  closeHref,
  onClose,
  onDetails,
}: {
  venue: Place;
  listHref: string;
  closeHref: string;
  onClose: () => void;
  onDetails: () => void;
}) {
  return (
    <div
      className="pointer-events-auto rounded-lg border border-accent/40 bg-surface/95 px-3 py-2 shadow-lg backdrop-blur-sm"
      data-map-pick={venue.id}
      role="region"
      aria-label={`${venue.name} on the map`}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="min-w-0 flex-1">
          <p className="inline-flex items-center gap-1.5 text-[10px] font-medium tracking-[0.14em] text-accent uppercase">
            <MapPin className="size-3.5" />
            {venue.area}
          </p>
          <h3 className="font-display truncate text-lg leading-tight text-fg">{venue.name}</h3>
          <p className="truncate text-xs text-faint">
            {venue.category} · {venue.address}
          </p>
        </div>
        <div className="hidden shrink-0 text-right sm:block">
          <p className="font-display text-lg tabular-nums text-looks">{venue.looks.toFixed(1)}</p>
          <p className="text-[10px] tracking-wide text-faint uppercase">Looks</p>
        </div>
        <div className="hidden shrink-0 text-right sm:block">
          <p className="font-display text-lg tabular-nums text-ratio">{venue.ratio.toFixed(1)}</p>
          <p className="text-[10px] tracking-wide text-faint uppercase">W:M</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={listHref}
            data-map-directory
            className="inline-flex h-11 min-w-0 flex-1 items-center justify-center rounded-md bg-accent px-3 text-sm font-medium text-bg no-underline sm:flex-none"
          >
            Directory
          </a>
          <button
            type="button"
            onClick={onDetails}
            className="inline-flex h-11 min-w-0 flex-1 items-center justify-center rounded-md border border-line bg-raised px-3 text-sm text-fg sm:flex-none"
          >
            Details
          </button>
          <a
            href={closeHref}
            onClick={onClose}
            className="flex size-11 shrink-0 items-center justify-center rounded-md border border-line text-muted no-underline hover:text-fg"
            aria-label="Clear selection"
          >
            <X className="size-5" />
          </a>
        </div>
      </div>
    </div>
  );
}

function Stat({ n, label }: { n: number | string; label: string }) {
  return (
    <div className="rounded-lg border border-line bg-surface px-4 py-3">
      <p className="font-display text-2xl tabular-nums text-fg">{n}</p>
      <p className="mt-1 text-[11px] tracking-wide text-muted uppercase">{label}</p>
    </div>
  );
}

function Chip({
  active,
  href,
  children,
}: {
  active: boolean;
  href?: string;
  children: ReactNode;
}) {
  const className = cn(
    "inline-flex h-11 shrink-0 items-center rounded-full border px-3 text-xs font-medium whitespace-nowrap no-underline select-none",
    active ? "border-accent bg-accent text-bg" : "border-line bg-surface text-muted",
  );
  if (href) {
    return (
      <a href={href} className={className} aria-current={active ? "page" : undefined}>
        {children}
      </a>
    );
  }
  return <span className={className}>{children}</span>;
}

function RankCol({
  title,
  sub,
  items,
  metric,
  hrefFor,
  overline,
}: {
  title: string;
  sub: string;
  items: Place[];
  metric: "looks" | "ratio" | "combo";
  hrefFor: (v: Place) => string;
  overline: (v: Place) => string;
}) {
  return (
    <section>
      <h2 className="font-display text-2xl">{title}</h2>
      <p className="mt-1 text-xs text-faint">{sub}</p>
      <ol className="mt-4 space-y-2">
        {items.map((v, i) => (
          <li key={v.id}>
            <a
              href={hrefFor(v)}
              className="flex w-full items-center gap-3 rounded-md border border-line bg-surface px-3 py-2.5 text-left no-underline hover:border-accent/40"
            >
              <span className="font-display w-6 text-lg text-faint tabular-nums">{i + 1}</span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm text-fg">{v.name}</span>
                <span className="block truncate text-[11px] text-faint">{overline(v)}</span>
              </span>
              <span className="w-16 shrink-0">
                {metric === "looks" ? (
                  <ScoreMeter label="" value={v.looks} tone="looks" />
                ) : metric === "ratio" ? (
                  <ScoreMeter label="" value={v.ratio} tone="ratio" />
                ) : (
                  <span className="font-display text-lg tabular-nums">{combinedScore(v).toFixed(1)}</span>
                )}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
