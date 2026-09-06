import { createFileRoute } from "@tanstack/react-router";
import { FieldGuide, parseGuideSearch } from "@/components/field-guide";
import { LEX_REGIONS, lexDistricts } from "@/data/lexington-types";
import { LEX_VENUES } from "@/data/lexington-venues";

const IDS = LEX_REGIONS.map((r) => r.id);

export const Route = createFileRoute("/lexington")({
  head: () => ({
    meta: [{ title: "After Dark Lexington" }],
  }),
  validateSearch: (raw: Record<string, unknown>) => parseGuideSearch(raw, IDS, "lex-downtown"),
  component: Home,
});

function Home() {
  return (
    <FieldGuide
      city="lexington"
      path="/lexington"
      title="After Dark"
      eyebrow="Lexington field guide"
      defaultRegion="lex-downtown"
      regions={LEX_REGIONS}
      districtsFor={lexDistricts}
      venues={LEX_VENUES}
      methodText={
        <>
          <p>
            These are scene estimates, not a census. They synthesize venue type, dress codes, and typical Lexington night patterns (Cheapside and Rupp vs the Distillery District vs campus Two Keys vs Chevy Chase vs Hamburg). Crowds swing on UK basketball nights and any Saturday on Manchester.
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            <li>
              <span className="text-looks">Looks draw (1–10)</span> — how much the room typically pulls attractive women on a peak night.
            </li>
            <li>
              <span className="text-ratio">Women : men (1–10)</span> — 10 is almost all women, 5 is even, 1 is almost all men.
            </li>
            <li>
              Tabs do not mix. Not Louisville, not Keeneland, not Versailles.
            </li>
          </ul>
        </>
      }
      footer="Scores describe typical Thursday–Saturday nights unless noted. Tabs: Downtown (Cheapside, Short, Vine), Distillery District / North Limestone, Campus (Euclid, Woodland), Chevy Chase / Tates Creek, Hamburg / Palomar. Regions do not mix. Not Louisville. Snapshot 2026."
      search={Route.useSearch()}
    />
  );
}
