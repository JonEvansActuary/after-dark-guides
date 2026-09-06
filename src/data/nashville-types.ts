import type { Category, Confidence } from "./types";
import type { Place } from "./place";

export const NASH_REGIONS = [
  {
    id: "nash-downtown",
    tab: "Downtown",
    kicker: "Honky Tonk Highway",
    headline: "Downtown Nashville, scored.",
    range: "Lower Broadway, 2nd Avenue, Printers Alley, Germantown",
    blurb:
      "The postcard: Lower Broadway honky-tonks, 2nd Avenue rooms, Printers Alley, and Germantown’s dinner bars. Same two scores. This tab only — East, Gulch, Midtown, and South stay on their own tabs.",
  },
  {
    id: "nash-gulch",
    tab: "Gulch",
    kicker: "Gulch & SoBro",
    headline: "The Gulch, scored.",
    range: "The Gulch, Demonbreun, SoBro, 8th Ave S cocktail rooms",
    blurb:
      "Nashville’s dressed corridor: cocktail rooms, hotel rooftops, and date-night steak. Quieter than Broadway, richer than East. Nothing from Broadway mixed in.",
  },
  {
    id: "nash-east",
    tab: "East",
    kicker: "Five Points to Gallatin",
    headline: "East Nashville, scored.",
    range: "Five Points, Gallatin Pike, Riverside Village, Lockeland Springs",
    blurb:
      "The local night: cocktail dens, dives, tiki, and Five Points walk-ups. This is where Nashville actually drinks. No Broadway tourist rooms.",
  },
  {
    id: "nash-midtown",
    tab: "Midtown",
    kicker: "West End to Music Row",
    headline: "Midtown Nashville, scored.",
    range: "Midtown, West End, Music Row, Vanderbilt edge",
    blurb:
      "West of Broadway: Music Row, West End patios, Vanderbilt-adjacent rooms. Separate from the Gulch and from 12 South.",
  },
  {
    id: "nash-south",
    tab: "South",
    kicker: "12 South to WeHo",
    headline: "South Nashville, scored.",
    range: "12 South, Wedgewood-Houston, Berry Hill, Melrose, Green Hills",
    blurb:
      "South of the interstate: 12 South brunch-to-bar, WeHo warehouses, Berry Hill, Green Hills. Not East, not Broadway.",
  },
] as const;

export type NashRegionId = (typeof NASH_REGIONS)[number]["id"];

export const NASH_AREAS = {
  "nash-downtown": ["Broadway", "2nd Avenue", "Printers Alley", "Germantown"],
  "nash-gulch": ["The Gulch", "SoBro", "Demonbreun"],
  "nash-east": ["Five Points", "Gallatin Pike", "Riverside", "Lockeland"],
  "nash-midtown": ["Midtown", "West End", "Music Row"],
  "nash-south": ["12 South", "Wedgewood-Houston", "Berry Hill", "Green Hills"],
} as const;

export type NashArea = (typeof NASH_AREAS)[NashRegionId][number];

export function nashDistricts(id: string): readonly string[] {
  return (NASH_AREAS as Record<string, readonly string[]>)[id] ?? [];
}

export function nashById(id: string) {
  return NASH_REGIONS.find((r) => r.id === id)!;
}

export function nv(
  id: string,
  name: string,
  region: NashRegionId,
  area: NashArea,
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
