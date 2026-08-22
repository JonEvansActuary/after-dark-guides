import type { Category, Confidence } from "./types";
import type { Place } from "./place";

export const BEACH_REGIONS = [
  {
    id: "sunny-isles",
    tab: "Isles",
    kicker: "Sunny Isles Beach",
    headline: "Sunny Isles, scored.",
    range: "Collins Ave high-rises, Acqualina, town center, the north end of the strip",
    blurb:
      "The north gate of this guide: Sunny Isles Beach hotel dining, oceanfront lounges, and a quieter night than South Beach. Same two scores. This tab only.",
  },
  {
    id: "bal-harbour",
    tab: "Harbour",
    kicker: "Haulover to Surfside",
    headline: "Bal Harbour, scored.",
    range: "Haulover Park, Bal Harbour Shops, Surf Club, Surfside, St. Regis",
    blurb:
      "Between Sunny Isles and the City of Miami Beach: Haulover, Bal Harbour luxury retail, the Surf Club, and Surfside. No South Beach mixing.",
  },
  {
    id: "north-beach",
    tab: "North",
    kicker: "North Beach",
    headline: "North Beach, scored.",
    range: "71st Street, North Shore, Normandy Isle, Ocean Terrace, the bandshell",
    blurb:
      "Miami Beach’s residential north: 71st Street kitchens, the bandshell, North Shore open space. Locals more than bottle service.",
  },
  {
    id: "mid-beach",
    tab: "Mid",
    kicker: "Fontainebleau to Faena",
    headline: "Mid-Beach, scored.",
    range: "Fontainebleau, LIV, Eden Roc, Faena, Broken Shaker, 41st, the boardwalk",
    blurb:
      "The hotel-club belt: LIV, Faena, Freehand’s courtyard, Soho Beach House. Where Mid-Beach tries to out-dress South Beach.",
  },
  {
    id: "south-beach",
    tab: "SoBe",
    kicker: "Lincoln to South Pointe",
    headline: "South Beach, scored.",
    range: "Ocean Drive, Lincoln Road, Washington, Española, SoFi, South Pointe",
    blurb:
      "The south end of the strip: Ocean Drive tourist theater, Lincoln Road, Washington Ave nightlife, SoFi dining, South Pointe Park. Split from Mid-Beach on purpose.",
  },
] as const;

export type BeachRegionId = (typeof BEACH_REGIONS)[number]["id"];

export const BEACH_AREAS = {
  "sunny-isles": ["Collins SIB", "Hotel row", "Town Center"],
  "bal-harbour": ["Bal Harbour Shops", "Surfside", "Haulover", "Surf Club"],
  "north-beach": ["71st Street", "North Shore", "Normandy Isle", "Ocean Terrace"],
  "mid-beach": ["Fontainebleau", "Faena District", "41st Street", "Freehand", "Boardwalk", "Collins Mid"],
  "south-beach": [
    "Ocean Drive",
    "Lincoln Road",
    "Washington Avenue",
    "Española Way",
    "SoFi",
    "Collins Park",
    "West Avenue",
    "South Pointe",
  ],
} as const;

export type BeachArea = (typeof BEACH_AREAS)[BeachRegionId][number];

export function beachDistricts(id: BeachRegionId): readonly BeachArea[] {
  return BEACH_AREAS[id] as readonly BeachArea[];
}

export function beachById(id: BeachRegionId) {
  return BEACH_REGIONS.find((r) => r.id === id)!;
}

export function bv(
  id: string,
  name: string,
  region: BeachRegionId,
  area: BeachArea,
  category: Category,
  address: string,
  looks: number,
  ratio: number,
  nightlife: boolean,
  peak: string,
  blurb: string,
  notes: string,
  tags: string[],
  confidence: Confidence = "medium",
): Place {
  return {
    id,
    name,
    region,
    area,
    category,
    address,
    looks,
    ratio,
    confidence,
    nightlife,
    peak,
    blurb,
    notes,
    tags,
  };
}
