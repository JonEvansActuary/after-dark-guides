import { createFileRoute } from "@tanstack/react-router";
import { FieldGuide, parseGuideSearch } from "@/components/field-guide";
import { BEACH_REGIONS, beachDistricts } from "@/data/beach-types";
import { BEACH_VENUES } from "@/data/beach-venues";

const IDS = BEACH_REGIONS.map((r) => r.id);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "After Dark Beach" }],
  }),
  validateSearch: (raw: Record<string, unknown>) => parseGuideSearch(raw, IDS, "sunny-isles"),
  component: Home,
});

function Home() {
  return (
    <FieldGuide
      city="beach"
      path="/"
      title="After Dark"
      eyebrow="Miami Beach field guide"
      defaultRegion="sunny-isles"
      regions={BEACH_REGIONS}
      districtsFor={beachDistricts}
      venues={BEACH_VENUES}
      methodText={
        <>
          <p>
            These are scene estimates, not a census. They synthesize venue type, dress codes, hotel doors, and typical Beach patterns (LIV and Faena vs Ocean Drive vs Bal Harbour lunch vs Sunny Isles hotel bars). Crowds swing hard on Art Basel, boat-show week, and any sold-out Sunday at Nikki.
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
      footer="Scores describe typical Thursday–Saturday (and Sunday beach-club) unless noted. Tabs run north to south: Sunny Isles → Bal Harbour/Surfside/Haulover → North Beach → Mid-Beach → South Beach. Regions do not mix. This is the barrier island only — not Brickell, Wynwood, or downtown Miami. Snapshot 2026."
      search={Route.useSearch()}
    />
  );
}
