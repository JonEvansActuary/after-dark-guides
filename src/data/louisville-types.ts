import type { Category, Confidence } from "./types";
import type { Place } from "./place";

export const LOU_REGIONS = [
  {
    id: "lou-downtown",
    tab: "Downtown",
    kicker: "Whiskey Row",
    headline: "Downtown Louisville, scored.",
    range: "Main Street, Whiskey Row, Fourth Street Live, Museum Row",
    blurb:
      "The river core: distillery rooms, Hell or High Water, Proof on Main, Fourth Street Live. Same two scores. NuLu, Highlands, Germantown, and Frankfort Ave stay on their own tabs. Not Jeffersonville, Indiana.",
  },
  {
    id: "lou-nulu",
    tab: "NuLu",
    kicker: "East Market",
    headline: "NuLu, scored.",
    range: "East Market Street, Garage Bar, Decca, Akasha",
    blurb:
      "The dressed warehouse strip east of downtown. Dinner-to-drink, murals, a younger money crowd than Fourth Street Live.",
  },
  {
    id: "lou-highlands",
    tab: "Highlands",
    kicker: "Bardstown Road",
    headline: "The Highlands, scored.",
    range: "Bardstown Road, Baxter, Barret, the original crawl",
    blurb:
      "Louisville’s local night: Holy Grale, Zanzabar, Jack Fry’s, the Bardstown crawl. Not Whiskey Row tourists, not Lexington.",
  },
  {
    id: "lou-germantown",
    tab: "G-town",
    kicker: "Goss & Burnett",
    headline: "Germantown, scored.",
    range: "Goss Avenue, Burnett, Logan Street, Schnitzelburg",
    blurb:
      "South of the Highlands: Check’s, Nachbar, Logan Street Market. Neighborhood, cheaper, not Bardstown Road’s main drag.",
  },
  {
    id: "lou-crescent",
    tab: "Crescent",
    kicker: "Frankfort Avenue",
    headline: "Crescent Hill, scored.",
    range: "Frankfort Avenue, Crescent Hill, The Silver Dollar",
    blurb:
      "The northeast avenue: Silver Dollar, Crescent Hill Craft House, the Frankfort Ave walk. Not NuLu, not the Highlands proper.",
  },
] as const;

export type LouRegionId = (typeof LOU_REGIONS)[number]["id"];

export const LOU_AREAS = {
  "lou-downtown": ["Whiskey Row", "Fourth Street", "Museum Row"],
  "lou-nulu": ["East Market", "Main East"],
  "lou-highlands": ["Bardstown", "Baxter", "Barret"],
  "lou-germantown": ["Goss", "Burnett", "Logan"],
  "lou-crescent": ["Frankfort Ave", "Crescent Hill"],
} as const;

export type LouArea = (typeof LOU_AREAS)[LouRegionId][number];

export function louDistricts(id: string): readonly string[] {
  return (LOU_AREAS as Record<string, readonly string[]>)[id] ?? [];
}

export function lv(
  id: string,
  name: string,
  region: LouRegionId,
  area: LouArea,
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
