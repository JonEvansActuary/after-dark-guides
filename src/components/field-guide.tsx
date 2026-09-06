import { useLayoutEffect, useMemo, useState, type ReactNode } from "react";
import { Search, ChevronDown } from "lucide-react";
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

export type GuideSearch = {
  region?: string;
  scope?: Scope;
  view?: ViewKey;
  area?: string;
  q?: string;
};

export function parseGuideSearch(
  raw: Record<string, unknown>,
  regionIds: readonly string[],
  defaultRegion: string,
): GuideSearch {
  const next: GuideSearch = {};
  if (typeof raw.region === "string" && regionIds.includes(raw.region) && raw.region !== defaultRegion) {
    next.region = raw.region;
  }
  if (raw.scope === "dining" || raw.scope === "all") next.scope = raw.scope;
  if (raw.view === "ranks" || raw.view === "areas" || raw.view === "map") next.view = raw.view;
  if (typeof raw.area === "string" && raw.area !== "" && raw.area !== "All") next.area = raw.area;
  if (typeof raw.q === "string" && raw.q.trim()) next.q = raw.q;
  return next;
}

export function guideHref(
  path: string,
  defaultRegion: string,
  next: { region?: string; scope?: Scope; view?: ViewKey; area?: string; q?: string },
) {
  const p = new URLSearchParams();
  if (next.region && next.region !== defaultRegion) p.set("region", next.region);
  if (next.scope && next.scope !== "night") p.set("scope", next.scope);
  if (next.view && next.view !== "list") p.set("view", next.view);
  if (next.area && next.area !== "All") p.set("area", next.area);
  if (next.q?.trim()) p.set("q", next.q.trim());
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
  const region = search.region && regions.some((r) => r.id === search.region) ? search.region : defaultRegion;
  const scope = search.scope ?? "night";
  const view = search.view ?? "list";
  const [q, setQ] = useState(search.q ?? "");
  const [cat, setCat] = useState<Category | "All">("All");
  const [minLooks, setMinLooks] = useState(0);
  const [minRatio, setMinRatio] = useState(0);
  const [sort, setSort] = useState<SortKey>("combined");
  const [open, setOpen] = useState<Place | null>(null);
  const [method, setMethod] = useState(false);

  const current = regions.find((r) => r.id === region) ?? regions[0];
  const districts = districtsFor(region);
  const area = districts.includes(search.area ?? "") ? search.area! : "All";
  const pool = useMemo(() => venues.filter((v) => v.region === region), [venues, region]);

  const hrefFor = (next: { region?: string; scope?: Scope; view?: ViewKey; area?: string; q?: string }) =>
    guideHref(path, defaultRegion, next);

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
    rows.sort((a, b) => {
      if (sort === "looks") return b.looks - a.looks || a.name.localeCompare(b.name);
      if (sort === "ratio") return b.ratio - a.ratio || a.name.localeCompare(b.name);
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "area") return a.area.localeCompare(b.area) || a.name.localeCompare(b.name);
      return combinedScore(b) - combinedScore(a) || b.looks - a.looks;
    });
    return rows;
  }, [pool, q, area, cat, scope, minLooks, minRatio, sort]);

  const night = pool.filter(isNightlife);
  const topLooks = [...night].sort((a, b) => b.looks - a.looks || b.ratio - a.ratio).slice(0, 12);
  const topRatio = [...night].sort((a, b) => b.ratio - a.ratio || b.looks - a.looks).slice(0, 12);
  const topCombo = [...night].sort((a, b) => combinedScore(b) - combinedScore(a)).slice(0, 12);

  const tabHref = (id: string) => hrefFor({ region: id, scope, view, q });
  const scopeHref = (s: Scope) => hrefFor({ region, scope: s, view, area, q });
  const viewHref = (v: ViewKey) => hrefFor({ region, scope, view: v, area, q });
  const areaHref = (a: string) => hrefFor({ region, scope, view, area: a, q });

  useLayoutEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [region, scope, view, area]);

  return (
    <div className="min-h-screen bg-bg pb-56 text-fg">
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
            placeholder="Search this region…"
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
              <Stat n={pool.length} label="Places in region" />
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
            <RankCol title="Highest looks draw" sub="Nightlife only" items={topLooks} metric="looks" onOpen={setOpen} />
            <RankCol title="Highest women:men" sub="Nightlife only" items={topRatio} metric="ratio" onOpen={setOpen} />
            <RankCol title="Best combined" sub="0.55 looks + 0.45 ratio" items={topCombo} metric="combo" onOpen={setOpen} />
          </div>
        ) : view === "areas" ? (
          <div className="mt-8 space-y-10">
            {(area === "All" ? districts : [area]).map((a) => {
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
                      <VenueCard key={v.id} venue={v} onOpen={setOpen} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : view === "map" ? (
          <div className="mt-4">
            {filtered.length === 0 ? (
              <p className="py-16 text-center text-muted">No places match those filters.</p>
            ) : (
              <VenueMap key={region} places={filtered} selectedId={open?.id} onOpen={setOpen} />
            )}
          </div>
        ) : (
          <>
            <p className="mt-5 text-sm text-faint">
              {filtered.length} {filtered.length === 1 ? "place" : "places"}
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {filtered.map((v) => (
                <VenueCard key={v.id} venue={v} onOpen={setOpen} />
              ))}
            </div>
            {filtered.length === 0 ? <p className="py-16 text-center text-muted">No places match those filters.</p> : null}
          </>
        )}

        {view !== "map" ? (
          <footer className="mt-16 border-t border-line py-8 text-xs leading-relaxed text-faint">{footer}</footer>
        ) : null}
      </main>

      {open ? <VenueDetail venue={open} onClose={() => setOpen(null)} /> : null}
      <CityDock current={city} regions={regions} region={region} tabHref={tabHref} />
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
  return (
    <span className={className}>{children}</span>
  );
}

function RankCol({
  title,
  sub,
  items,
  metric,
  onOpen,
}: {
  title: string;
  sub: string;
  items: Place[];
  metric: "looks" | "ratio" | "combo";
  onOpen: (v: Place) => void;
}) {
  return (
    <section>
      <h2 className="font-display text-2xl">{title}</h2>
      <p className="mt-1 text-xs text-faint">{sub}</p>
      <ol className="mt-4 space-y-2">
        {items.map((v, i) => (
          <li key={v.id}>
            <button
              type="button"
              onClick={() => onOpen(v)}
              className="flex w-full items-center gap-3 rounded-md border border-line bg-surface px-3 py-2.5 text-left hover:border-accent/40"
            >
              <span className="font-display w-6 text-lg text-faint tabular-nums">{i + 1}</span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm text-fg">{v.name}</span>
                <span className="block truncate text-[11px] text-faint">{v.area}</span>
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
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}
