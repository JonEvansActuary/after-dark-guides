import { createFileRoute } from "@tanstack/react-router";
import { FieldGuide, parseGuideSearch } from "@/components/field-guide";
import { ASH_REGIONS, ashDistricts } from "@/data/asheville-types";
import { ASH_VENUES } from "@/data/asheville-venues";

const IDS = ASH_REGIONS.map((r) => r.id);

export const Route = createFileRoute("/asheville")({
  head: () => ({
    meta: [{ title: "After Dark Asheville" }],
  }),
  validateSearch: (raw: Record<string, unknown>) => parseGuideSearch(raw, IDS, "ash-downtown"),
  component: Home,
});

function Home() {
  return (
    <FieldGuide
      city="asheville"
      path="/asheville"
      title="After Dark"
      eyebrow="Asheville field guide"
      defaultRegion="ash-downtown"
      regions={ASH_REGIONS}
      districtsFor={ashDistricts}
      venues={ASH_VENUES}
      methodText={
        <>
          <p>
            These are scene estimates, not a census. They synthesize venue type, dress codes, and typical Asheville night patterns (Pack Square cocktails vs South Slope taps vs West Asheville’s Haywood Road vs the River Arts District vs Biltmore Village). Crowds swing on leaf season, any Saturday on Lexington, and brewery-tour weekends.
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            <li>
              <span className="text-looks">Looks draw (1–10)</span> — how much the room typically pulls attractive women on a peak night.
            </li>
            <li>
              <span className="text-ratio">Women : men (1–10)</span> — 10 is almost all women, 5 is even, 1 is almost all men.
            </li>
            <li>
              Tabs do not mix. Not Hendersonville, not Black Mountain, not Weaverville, not Greenville SC, not Sierra Nevada Mills River. Biltmore Village is Asheville. Hendersonville Road in South Asheville is an Asheville street.
            </li>
          </ul>
        </>
      }
      footer="Scores describe typical Thursday–Saturday nights unless noted. Tabs: Downtown (Pack Square, Lexington, Broadway, Patton), South Slope, West Asheville (Haywood Road), River Arts District, Biltmore Village / Estate. Regions do not mix. North Carolina city of Asheville only. Snapshot 2026."
      search={Route.useSearch()}
    />
  );
}
