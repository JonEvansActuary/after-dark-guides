import { createFileRoute } from "@tanstack/react-router";
import { FieldGuide, parseGuideSearch } from "@/components/field-guide";
import { ORL_REGIONS, orlDistricts } from "@/data/orlando-types";
import { ORL_VENUES } from "@/data/orlando-venues";

const IDS = ORL_REGIONS.map((r) => r.id);

export const Route = createFileRoute("/orlando")({
  head: () => ({
    meta: [{ title: "After Dark Orlando" }],
  }),
  validateSearch: (raw: Record<string, unknown>) => parseGuideSearch(raw, IDS, "orl-downtown"),
  component: Home,
});

function Home() {
  return (
    <FieldGuide
      city="orlando"
      path="/orlando"
      title="After Dark"
      eyebrow="Orlando field guide"
      defaultRegion="orl-downtown"
      regions={ORL_REGIONS}
      districtsFor={orlDistricts}
      venues={ORL_VENUES}
      methodText={
        <>
          <p>
            These are scene estimates, not a census. They synthesize venue type, dress codes, and typical Orlando night patterns (Church Street and Orange vs Thornton Park vs Mills 50 vs Ivanhoe vs I-Drive / CityWalk). Crowds swing on convention weekends, park nights, and any Saturday on Mills.
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            <li>
              <span className="text-looks">Looks draw (1–10)</span> — how much the room typically pulls attractive women on a peak night.
            </li>
            <li>
              <span className="text-ratio">Women : men (1–10)</span> — 10 is almost all women, 5 is even, 1 is almost all men.
            </li>
            <li>
              Tabs do not mix. Not Winter Park, not Disney Springs / Lake Buena Vista, not Kissimmee, not Ocoee. I-Drive, Dr. Phillips / Restaurant Row, and Universal CityWalk are the city of Orlando. Winter Park Road is an Orlando street.
            </li>
          </ul>
        </>
      }
      footer="Scores describe typical Thursday–Saturday nights unless noted. Tabs: Downtown (Church, Orange, Wall Street, Pine), Thornton Park / Milk District, Mills 50, Ivanhoe Village, I-Drive / Dr. Phillips / CityWalk. Regions do not mix. City of Orlando only — not Disney Springs, not Winter Park. Snapshot 2026."
      search={Route.useSearch()}
    />
  );
}
