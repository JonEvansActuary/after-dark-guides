import { cn } from "@/lib/utils";

export const CITIES = [
  { id: "beach", href: "/", label: "Beach", short: "Beach" },
  { id: "knoxville", href: "/knoxville", label: "Knoxville", short: "Knox" },
  { id: "nashville", href: "/nashville", label: "Nashville", short: "Nash" },
  { id: "atlanta", href: "/atlanta", label: "Atlanta", short: "ATL" },
] as const;

export type CityId = (typeof CITIES)[number]["id"];

export function CityDock({
  current,
  regions,
  region,
  tabHref,
}: {
  current: CityId;
  regions: readonly { id: string; tab: string }[];
  region: string;
  tabHref: (id: string) => string;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 bg-gradient-to-t from-bg from-70% to-transparent px-3 pb-[max(4.75rem,env(safe-area-inset-bottom))] pt-3">
      <nav
        className="mx-auto mb-2 flex max-w-2xl overflow-hidden rounded-lg border border-line bg-surface"
        aria-label="City"
      >
        {CITIES.map((c) => {
          const on = c.id === current;
          return (
            <a
              key={c.id}
              href={c.href}
              aria-current={on ? "page" : undefined}
              className={cn(
                "inline-flex h-12 min-w-0 flex-1 items-center justify-center px-1 text-[11px] font-medium no-underline sm:px-2 sm:text-sm",
                on ? "bg-accent text-bg" : "text-muted",
              )}
            >
              <span className="sm:hidden">{c.short}</span>
              <span className="hidden sm:inline">{c.label}</span>
            </a>
          );
        })}
      </nav>
      <nav
        className="mx-auto flex max-w-2xl overflow-hidden rounded-lg border border-line bg-surface"
        aria-label="Region"
      >
        {regions.map((r) => (
          <a
            key={r.id}
            href={tabHref(r.id)}
            aria-current={region === r.id ? "page" : undefined}
            className={cn(
              "inline-flex h-12 min-w-0 flex-1 items-center justify-center px-1 text-[11px] font-medium no-underline sm:text-sm",
              region === r.id ? "bg-accent text-bg" : "text-muted",
            )}
          >
            {r.tab}
          </a>
        ))}
      </nav>
    </div>
  );
}
