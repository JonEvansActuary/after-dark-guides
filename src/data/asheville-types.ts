import type { Category, Confidence } from "./types";
import type { Place } from "./place";

export const ASH_REGIONS = [
  {
    id: "ash-downtown",
    tab: "Downtown",
    kicker: "Pack Square to Patton",
    headline: "Downtown Asheville, scored.",
    range: "Pack Square, Lexington, Broadway, Haywood, Patton",
    blurb:
      "The walkable core: Sovereign Remedies, Rankin Vault, Crow & Quill, Pack Square patios. Same two scores. South Slope, West Asheville, the River Arts District, and Biltmore Village stay on their own tabs.",
  },
  {
    id: "ash-slope",
    tab: "S. Slope",
    kicker: "Coxe to Collier",
    headline: "South Slope, scored.",
    range: "Coxe Avenue, Collier, Biltmore Avenue, Hilliard",
    blurb:
      "The brewery spine: Burial, Wicked Weed, Hi-Wire, Antidote. Not Pack Square cocktails, not West Asheville’s Haywood Road.",
  },
  {
    id: "ash-west",
    tab: "West",
    kicker: "Haywood Road",
    headline: "West Asheville, scored.",
    range: "Haywood Road, the Westville strip, the Admiral",
    blurb:
      "Across the river: The Admiral, Double Crown, ISIS, the Haywood crawl. Neighborhood, not tourist Pack Square. Not Hendersonville.",
  },
  {
    id: "ash-rad",
    tab: "RAD",
    kicker: "The river studios",
    headline: "River Arts District, scored.",
    range: "Clingman, Roberts, Riverside, the Grey Eagle",
    blurb:
      "Studios, smoke, and the French Broad: Wedge, White Duck, 12 Bones, Salvage Station. Not South Slope’s Coxe Avenue.",
  },
  {
    id: "ash-biltmore",
    tab: "Biltmore",
    kicker: "The Village",
    headline: "Biltmore Village, scored.",
    range: "Biltmore Village, Brook Street, the Estate edge, South Asheville",
    blurb:
      "The village and the estate’s public rooms. Dressed, not South Slope. Asheville city — not Hendersonville, not Black Mountain.",
  },
] as const;

export type AshRegionId = (typeof ASH_REGIONS)[number]["id"];

export const ASH_AREAS = {
  "ash-downtown": ["Pack Square", "Lexington", "Broadway", "Patton"],
  "ash-slope": ["Coxe", "Collier", "Biltmore Ave"],
  "ash-west": ["Haywood Rd", "Westville"],
  "ash-rad": ["Clingman", "Roberts", "Riverside"],
  "ash-biltmore": ["Village", "Estate"],
} as const;

export type AshArea = (typeof ASH_AREAS)[AshRegionId][number];

export function ashDistricts(id: string): readonly string[] {
  return (ASH_AREAS as Record<string, readonly string[]>)[id] ?? [];
}

export function sv(
  id: string,
  name: string,
  region: AshRegionId,
  area: AshArea,
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
