import type { Category, Confidence } from "./types";
import type { Place } from "./place";

export const ATL_REGIONS = [
  {
    id: "atl-midtown",
    tab: "Midtown",
    kicker: "10th & Piedmont",
    headline: "Midtown Atlanta, scored.",
    range: "10th & Piedmont, Crescent Avenue, Colony Square, Peachtree Midtown",
    blurb:
      "Atlanta’s walkable core: LGBTQ+ strip at 10th & Piedmont, Crescent Avenue clubs, Colony Square cocktails. Separate from Buckhead and from the Eastside BeltLine.",
  },
  {
    id: "atl-buckhead",
    tab: "Buckhead",
    kicker: "Uptown gloss",
    headline: "Buckhead, scored.",
    range: "Buckhead Village, Piedmont / Main Street, Pharr Road, Peachtree corridor",
    blurb:
      "The dressed-up north: Tongue & Groove, hotel lounges, Buckhead Village dinner-to-dance. Not Midtown, not the Eastside.",
  },
  {
    id: "atl-east",
    tab: "East",
    kicker: "BeltLine to EAV",
    headline: "Eastside Atlanta, scored.",
    range: "Old Fourth Ward, Edgewood, Ponce City, Inman Park, Virginia-Highland, Little Five, East Atlanta Village",
    blurb:
      "BeltLine east: Edgewood bar-hop, Ponce rooftops, Inman, VaHi, Little Five, EAV. The city’s densest local night. No Buckhead mixing.",
  },
  {
    id: "atl-west",
    tab: "West",
    kicker: "West Midtown",
    headline: "Westside Atlanta, scored.",
    range: "West Midtown, Howell Mill, Upper Westside, Atlantic Station",
    blurb:
      "West of the Connector: mega-clubs on Brady, Howell Mill taprooms, Atlantic Station. Not Downtown, not Buckhead Village.",
  },
  {
    id: "atl-downtown",
    tab: "Downtown",
    kicker: "Castleberry to Underground",
    headline: "Downtown Atlanta, scored.",
    range: "Downtown, Underground, Castleberry Hill, stadium rim",
    blurb:
      "The core around Mercedes-Benz and Underground: hotel bars, Castleberry rooms, game-day spill. Separate from Midtown’s 10th Street.",
  },
] as const;

export type AtlRegionId = (typeof ATL_REGIONS)[number]["id"];

export const ATL_AREAS = {
  "atl-midtown": ["10th & Piedmont", "Crescent", "Colony Square", "Peachtree Midtown"],
  "atl-buckhead": ["Village", "Piedmont", "Pharr", "Peachtree Buckhead"],
  "atl-east": ["Edgewood", "Ponce City", "Inman Park", "Virginia-Highland", "Little Five", "EAV"],
  "atl-west": ["West Midtown", "Howell Mill", "Atlantic Station"],
  "atl-downtown": ["Downtown Core", "Castleberry", "Underground"],
} as const;

export type AtlArea = (typeof ATL_AREAS)[AtlRegionId][number];

export function atlDistricts(id: string): readonly string[] {
  return (ATL_AREAS as Record<string, readonly string[]>)[id] ?? [];
}

export function atlById(id: string) {
  return ATL_REGIONS.find((r) => r.id === id)!;
}

export function av(
  id: string,
  name: string,
  region: AtlRegionId,
  area: AtlArea,
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
  return { id, name, region, area, category, address, looks, ratio, confidence, nightlife, peak, blurb, notes, tags };
}
