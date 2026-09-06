import { createFileRoute } from "@tanstack/react-router";
import { FieldGuide, parseGuideSearch } from "@/components/field-guide";
import { NASH_REGIONS, nashDistricts } from "@/data/nashville-types";
import { NASH_VENUES } from "@/data/nashville-venues";

const IDS = NASH_REGIONS.map((r) => r.id);

export const Route = createFileRoute("/nashville")({
  head: () => ({
    meta: [{ title: "After Dark Nashville" }],
  }),
  validateSearch: (raw: Record<string, unknown>) => parseGuideSearch(raw, IDS, "nash-downtown"),
  component: Home,
});

function Home() {
  return (
    <FieldGuide
      city="nashville"
      path="/nashville"
      title="After Dark"
      eyebrow="Nashville field guide"
      defaultRegion="nash-downtown"
      regions={NASH_REGIONS}
      districtsFor={nashDistricts}
      venues={NASH_VENUES}
      methodText={
        <>
          <p>
            These are scene estimates, not a census. They synthesize venue type, dress codes, bachelorette physics, and typical Nashville night patterns (Lower Broadway celebrity honky-tonks vs Printers Alley vs East cocktail dens vs Gulch dates). Crowds swing hard on CMA week, Preds nights, and any Saturday after 9 on Broadway.
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            <li>
              <span className="text-looks">Looks draw (1–10)</span> — how much the room typically pulls attractive women on a peak night. Dressy cocktail bars and dance floors score high; cigar rooms, sports bars, and 2am Taco Bell do not.
            </li>
            <li>
              <span className="text-ratio">Women : men (1–10)</span> — 10 is almost all women (bridal shops, pole studio), 5 is even, 1 is almost all men (cigar lounge, fly shop).
            </li>
            <li>
              Confidence is high where the scene is well documented, low for chains and daytime retail. Tabs do not mix: Broadway stays on Downtown, East stays East.
            </li>
          </ul>
        </>
      }
      footer="Scores describe typical Thursday–Saturday nights unless noted. Tabs: Downtown (Broadway, 2nd, Printers Alley, Germantown), Gulch & SoBro, East Nashville, Midtown / West End, South (12 South, WeHo, Berry Hill, Green Hills). Regions do not mix. Not Franklin, not Music Valley. Snapshot 2026."
      search={Route.useSearch()}
    />
  );
}
