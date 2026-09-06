import { createFileRoute } from "@tanstack/react-router";
import { FieldGuide, parseGuideSearch } from "@/components/field-guide";
import { LOU_REGIONS, louDistricts } from "@/data/louisville-types";
import { LOU_VENUES } from "@/data/louisville-venues";

const IDS = LOU_REGIONS.map((r) => r.id);

export const Route = createFileRoute("/louisville")({
  head: () => ({
    meta: [{ title: "After Dark Louisville" }],
  }),
  validateSearch: (raw: Record<string, unknown>) => parseGuideSearch(raw, IDS, "lou-downtown"),
  component: Home,
});

function Home() {
  return (
    <FieldGuide
      city="louisville"
      path="/louisville"
      title="After Dark"
      eyebrow="Louisville field guide"
      defaultRegion="lou-downtown"
      regions={LOU_REGIONS}
      districtsFor={louDistricts}
      venues={LOU_VENUES}
      methodText={
        <>
          <p>
            These are scene estimates, not a census. They synthesize venue type, dress codes, and typical Louisville night patterns (Whiskey Row and Hell or High Water vs NuLu vs the Bardstown crawl vs Germantown vs Frankfort Avenue). Crowds swing on Derby week, Cards nights, and any Saturday on Bardstown Road.
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            <li>
              <span className="text-looks">Looks draw (1–10)</span> — how much the room typically pulls attractive women on a peak night.
            </li>
            <li>
              <span className="text-ratio">Women : men (1–10)</span> — 10 is almost all women, 5 is even, 1 is almost all men.
            </li>
            <li>
              Tabs do not mix. Not Lexington. Not Jeffersonville or New Albany, Indiana.
            </li>
          </ul>
        </>
      }
      footer="Scores describe typical Thursday–Saturday nights unless noted. Tabs: Downtown / Whiskey Row, NuLu, the Highlands, Germantown / Schnitzelburg, Crescent Hill / Frankfort Ave. Regions do not mix. Kentucky side of the river only. Snapshot 2026."
      search={Route.useSearch()}
    />
  );
}
