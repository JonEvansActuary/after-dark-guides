import { createFileRoute } from "@tanstack/react-router";
import { FieldGuide, parseGuideSearch } from "@/components/field-guide";
import { ATL_REGIONS, atlDistricts } from "@/data/atlanta-types";
import { ATL_VENUES } from "@/data/atlanta-venues";

const IDS = ATL_REGIONS.map((r) => r.id);

export const Route = createFileRoute("/atlanta")({
  head: () => ({
    meta: [{ title: "After Dark Atlanta" }],
  }),
  validateSearch: (raw: Record<string, unknown>) => parseGuideSearch(raw, IDS, "atl-midtown"),
  component: Home,
});

function Home() {
  return (
    <FieldGuide
      city="atlanta"
      path="/atlanta"
      title="After Dark"
      eyebrow="Atlanta field guide"
      defaultRegion="atl-midtown"
      regions={ATL_REGIONS}
      districtsFor={atlDistricts}
      venues={ATL_VENUES}
      methodText={
        <>
          <p>
            These are scene estimates, not a census. They synthesize venue type, dress codes, and typical Atlanta night patterns (10th & Piedmont vs Buckhead Village vs BeltLine east vs Brady Avenue). Crowds swing hard on Pride, Freaknik-weekend leftovers, Falcons/United nights, and any Saturday after 11 at Tongue & Groove.
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            <li>
              <span className="text-looks">Looks draw (1–10)</span> — how much the room typically pulls attractive women on a peak night. Dressy cocktail bars and dance floors score high; cigar rooms, sports bars, and 2am Taco Bell do not.
            </li>
            <li>
              <span className="text-ratio">Women : men (1–10)</span> — 10 is almost all women (bridal shops, pole studio), 5 is even, 1 is almost all men (cigar lounge, fly shop).
            </li>
            <li>
              Confidence is high where the scene is well documented, low for chains and daytime retail. City of Atlanta only — not Decatur, not The Battery, not Buford Highway as a tab.
            </li>
          </ul>
        </>
      }
      footer="Scores describe typical Thursday–Saturday nights unless noted. Tabs: Midtown (10th & Piedmont, Crescent, Colony Square), Buckhead, Eastside (Edgewood to EAV), West Midtown, Downtown. Regions do not mix. Not Decatur, not Cobb. Snapshot 2026."
      search={Route.useSearch()}
    />
  );
}
