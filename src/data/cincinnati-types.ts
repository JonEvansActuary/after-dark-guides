import type { Category, Confidence } from "./types";
import type { Place } from "./place";

export const CIN_REGIONS = [
  {
    id: "cin-otr",
    tab: "OTR",
    kicker: "Vine to Findlay",
    headline: "Over-the-Rhine, scored.",
    range: "Vine Street, Main, 12th, Findlay Market, Washington Park",
    blurb:
      "Cincinnati’s walkable night: Rhinegeist, Senate, Ghost Baby, the Vine crawl. Ohio side only — Newport and Covington stay out. Downtown, Northside, East, and Clifton have their own tabs.",
  },
  {
    id: "cin-downtown",
    tab: "Downtown",
    kicker: "The Banks",
    headline: "Downtown Cincinnati, scored.",
    range: "The Banks, Fountain Square, 21c, stadium rim",
    blurb:
      "Riverfront and the office core: Moerlein, hotel bars, Reds nights. Not OTR’s Vine Street, not Kentucky.",
  },
  {
    id: "cin-northside",
    tab: "Northside",
    kicker: "Hamilton Avenue",
    headline: "Northside, scored.",
    range: "Hamilton Avenue, Urban Artifact, The Comet",
    blurb:
      "The north neighborhood: The Comet, Northside Tavern, Urban Artifact. Local, cheaper, not Vine Street velvet.",
  },
  {
    id: "cin-east",
    tab: "East",
    kicker: "Oakley to the river",
    headline: "East Cincinnati, scored.",
    range: "Oakley, Hyde Park, Mt. Lookout, Columbia Tusculum",
    blurb:
      "East of I-71: MadTree, Hyde Park dinners, Mt. Lookout, The Precinct. Not Norwood (separate city), not OTR.",
  },
  {
    id: "cin-clifton",
    tab: "Clifton",
    kicker: "Ludlow & CUF",
    headline: "Clifton, scored.",
    range: "Ludlow Avenue, CUF, University of Cincinnati edge",
    blurb:
      "Gaslight Clifton and the UC hill: Mecklenburg, Ludlow rooms, campus spill. Separate from Northside and from OTR.",
  },
] as const;

export type CinRegionId = (typeof CIN_REGIONS)[number]["id"];

export const CIN_AREAS = {
  "cin-otr": ["Vine", "Main", "Findlay", "Washington Park"],
  "cin-downtown": ["The Banks", "Fountain Square", "Core", "Mount Adams"],
  "cin-northside": ["Hamilton Ave", "Spring Grove"],
  "cin-east": ["Oakley", "Hyde Park", "Mt Lookout", "East End"],
  "cin-clifton": ["Ludlow", "CUF"],
} as const;

export type CinArea = (typeof CIN_AREAS)[CinRegionId][number];

export function cinDistricts(id: string): readonly string[] {
  return (CIN_AREAS as Record<string, readonly string[]>)[id] ?? [];
}

export function ov(
  id: string,
  name: string,
  region: CinRegionId,
  area: CinArea,
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
