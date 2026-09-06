import type { Category, Confidence } from "./types";
import type { Place } from "./place";

export const ORL_REGIONS = [
  {
    id: "orl-downtown",
    tab: "Downtown",
    kicker: "Church & Orange",
    headline: "Downtown Orlando, scored.",
    range: "Church Street, Orange Avenue, Wall Street, Pine, Magnolia",
    blurb:
      "The city core: Hanson’s, Yaz, Mathers, Church Street, Wall Street Plaza. Same two scores. Thornton Park, Mills 50, Ivanhoe, and I-Drive stay on their own tabs. Not Winter Park. Not Disney.",
  },
  {
    id: "orl-thornton",
    tab: "Thornton",
    kicker: "Washington & Eola",
    headline: "Thornton Park, scored.",
    range: "East Washington, South Eola, the Milk District",
    blurb:
      "East of the lake: Falcon, Burton’s, Stubborn Mule, Otto’s. Neighborhood patios, not Church Street clubs. Not Winter Park.",
  },
  {
    id: "orl-mills",
    tab: "Mills 50",
    kicker: "Mills & Colonial",
    headline: "Mills 50, scored.",
    range: "North Mills Avenue, East Colonial, Lil Indies, Wally’s",
    blurb:
      "Orlando’s indie strip: Wally’s, Will’s Pub, Tori Tori, The Guesthouse. Local, later, not I-Drive. Not Winter Park.",
  },
  {
    id: "orl-ivanhoe",
    tab: "Ivanhoe",
    kicker: "The lake",
    headline: "Ivanhoe Village, scored.",
    range: "North Orange, Virginia Drive, Lake Ivanhoe",
    blurb:
      "North of downtown along the lake: Hammered Lamb, Lucky Lure, Santiago’s. Day-into-night, not Mills 50’s dives.",
  },
  {
    id: "orl-idrive",
    tab: "I-Drive",
    kicker: "Sand Lake to CityWalk",
    headline: "I-Drive & Dr. Phillips, scored.",
    range: "International Drive, Restaurant Row, Universal CityWalk",
    blurb:
      "Tourist Orlando that is still the city of Orlando: Restaurant Row dinners, I-Drive rooms, CityWalk. Not Disney Springs (Lake Buena Vista). Not Kissimmee.",
  },
] as const;

export type OrlRegionId = (typeof ORL_REGIONS)[number]["id"];

export const ORL_AREAS = {
  "orl-downtown": ["Church Street", "Orange", "Wall Street", "Pine"],
  "orl-thornton": ["Washington", "Eola", "Milk District"],
  "orl-mills": ["Mills Ave", "Colonial"],
  "orl-ivanhoe": ["Orange North", "Virginia"],
  "orl-idrive": ["I-Drive", "Dr Phillips", "CityWalk"],
} as const;

export type OrlArea = (typeof ORL_AREAS)[OrlRegionId][number];

export function orlDistricts(id: string): readonly string[] {
  return (ORL_AREAS as Record<string, readonly string[]>)[id] ?? [];
}

export function rv(
  id: string,
  name: string,
  region: OrlRegionId,
  area: OrlArea,
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
