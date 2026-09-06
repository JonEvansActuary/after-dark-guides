import { createFileRoute } from "@tanstack/react-router";
import { FieldGuide, parseGuideSearch } from "@/components/field-guide";
import { AREAS_BY_REGION, REGIONS, type RegionId } from "@/data/types";
import { VENUES } from "@/data/venues";

const IDS = REGIONS.map((r) => r.id);

export const Route = createFileRoute("/knoxville")({
  head: () => ({
    meta: [{ title: "After Dark Knox" }],
  }),
  validateSearch: (raw: Record<string, unknown>) => parseGuideSearch(raw, IDS, "downtown"),
  component: Home,
});

function Home() {
  return (
    <FieldGuide
      city="knoxville"
      path="/knoxville"
      title="After Dark"
      eyebrow="Knoxville field guide"
      defaultRegion="downtown"
      regions={REGIONS}
      districtsFor={(id) => AREAS_BY_REGION[id as RegionId] ?? []}
      venues={VENUES}
      methodText={
        <>
          <p>
            These are scene estimates, not a census. They synthesize venue type, dress codes, public reviews, Reddit and local write-ups, and typical Knoxville night patterns (rooftops and Old City clubs vs breweries vs Strip dives). Crowds swing hard on Vols Saturdays, ladies’ nights, and First Friday.
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            <li>
              <span className="text-looks">Looks draw (1–10)</span> — how much the room typically pulls attractive women on a peak night. Dressy cocktail bars and dance floors score high; cigar rooms, sports bars, and 2am Taco Bell do not.
            </li>
            <li>
              <span className="text-ratio">Women : men (1–10)</span> — 10 is almost all women (bridal shops, pole studio), 5 is even, 1 is almost all men (cigar lounge, fly shop).
            </li>
            <li>
              Confidence is high where the scene is well documented, low for chains and daytime retail. Daytime shops are included because you asked for public places, not just bars.
            </li>
          </ul>
        </>
      }
      footer="Scores describe typical Thursday–Saturday nights unless noted. Pick a region tab first — Downtown, West (through Farragut), North (Fountain City to Halls), South (Sevier Ave to Chapman), or East (Magnolia to Holston) — then sort that tab only. Regions do not mix. Estimates, not a census. Snapshot 2026."
      search={Route.useSearch()}
    />
  );
}
