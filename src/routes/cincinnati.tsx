import { createFileRoute } from "@tanstack/react-router";
import { FieldGuide, parseGuideSearch } from "@/components/field-guide";
import { CIN_REGIONS, cinDistricts } from "@/data/cincinnati-types";
import { CIN_VENUES } from "@/data/cincinnati-venues";

const IDS = CIN_REGIONS.map((r) => r.id);

export const Route = createFileRoute("/cincinnati")({
  head: () => ({
    meta: [{ title: "After Dark Cincinnati" }],
  }),
  validateSearch: (raw: Record<string, unknown>) => parseGuideSearch(raw, IDS, "cin-otr"),
  component: Home,
});

function Home() {
  return (
    <FieldGuide
      city="cincinnati"
      path="/cincinnati"
      title="After Dark"
      eyebrow="Cincinnati field guide"
      defaultRegion="cin-otr"
      regions={CIN_REGIONS}
      districtsFor={cinDistricts}
      venues={CIN_VENUES}
      methodText={
        <>
          <p>
            These are scene estimates, not a census. They synthesize venue type, dress codes, and typical Cincinnati night patterns (OTR’s Vine crawl vs the Banks on Reds nights vs Northside vs Oakley/Hyde Park vs Clifton). Crowds swing on Opening Day, Music Hall, and any Saturday on Vine.
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            <li>
              <span className="text-looks">Looks draw (1–10)</span> — how much the room typically pulls attractive women on a peak night.
            </li>
            <li>
              <span className="text-ratio">Women : men (1–10)</span> — 10 is almost all women, 5 is even, 1 is almost all men.
            </li>
            <li>
              Ohio side only. Newport and Covington are Kentucky — not this guide. Not Norwood. Not Lexington.
            </li>
          </ul>
        </>
      }
      footer="Scores describe typical Thursday–Saturday nights unless noted. Tabs: Over-the-Rhine, Downtown / Banks / Mount Adams, Northside, East (Oakley, Hyde Park, Mt. Lookout, East End), Clifton / CUF. Regions do not mix. City of Cincinnati, Ohio — not NKY, not West Chester. Snapshot 2026."
      search={Route.useSearch()}
    />
  );
}
