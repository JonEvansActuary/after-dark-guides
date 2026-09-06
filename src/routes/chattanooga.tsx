import { createFileRoute } from "@tanstack/react-router";
import { FieldGuide, parseGuideSearch } from "@/components/field-guide";
import { CHAT_REGIONS, chatDistricts } from "@/data/chattanooga-types";
import { CHAT_VENUES } from "@/data/chattanooga-venues";

const IDS = CHAT_REGIONS.map((r) => r.id);

export const Route = createFileRoute("/chattanooga")({
  head: () => ({
    meta: [{ title: "After Dark Chattanooga" }],
  }),
  validateSearch: (raw: Record<string, unknown>) => parseGuideSearch(raw, IDS, "chat-downtown"),
  component: Home,
});

function Home() {
  return (
    <FieldGuide
      city="chattanooga"
      path="/chattanooga"
      title="After Dark"
      eyebrow="Chattanooga field guide"
      defaultRegion="chat-downtown"
      regions={CHAT_REGIONS}
      districtsFor={chatDistricts}
      venues={CHAT_VENUES}
      methodText={
        <>
          <p>
            These are scene estimates, not a census. They synthesize venue type, dress codes, and typical Chattanooga night patterns (Southside Main Street vs downtown hotel whiskey vs North Shore patios vs St. Elmo vs Hamilton Place chains). Crowds swing on Riverbend, Nightfall Fridays, and any Saturday on Main.
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            <li>
              <span className="text-looks">Looks draw (1–10)</span> — how much the room typically pulls attractive women on a peak night. Dressy cocktail bars and dinner rooms score high; sports barns and 2am chains do not.
            </li>
            <li>
              <span className="text-ratio">Women : men (1–10)</span> — 10 is almost all women, 5 is even, 1 is almost all men.
            </li>
            <li>
              Tabs do not mix. Not Knoxville, not Dalton, not Rock City (Georgia).
            </li>
          </ul>
        </>
      }
      footer="Scores describe typical Thursday–Saturday nights unless noted. Tabs: Downtown (Market, Broad, Bluff View), Southside, North Shore, St. Elmo / Incline, East (Hamilton Place, Gunbarrel, Brainerd). Regions do not mix. Tennessee side of Lookout only — not Rock City. Snapshot 2026."
      search={Route.useSearch()}
    />
  );
}
