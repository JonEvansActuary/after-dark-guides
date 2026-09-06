import type { Category, Confidence } from "./types";
import type { Place } from "./place";

export const LEX_REGIONS = [
  {
    id: "lex-downtown",
    tab: "Downtown",
    kicker: "Cheapside to Vine",
    headline: "Downtown Lexington, scored.",
    range: "Cheapside, Short Street, Vine, Rupp rim",
    blurb:
      "The civic core: Cheapside patios, Short Street rooms, Rupp nights. Same two scores. Distillery, campus, Chevy Chase, and Hamburg stay on their own tabs.",
  },
  {
    id: "lex-distillery",
    tab: "Distillery",
    kicker: "Manchester Street",
    headline: "The Distillery District, scored.",
    range: "Manchester, Town Branch, North Limestone",
    blurb:
      "Lexington’s warehouse night: The Burl, Barrel House, Ethereal, Al’s Bar. Not campus Two Keys, not Hamburg chains.",
  },
  {
    id: "lex-campus",
    tab: "Campus",
    kicker: "Euclid & Limestone",
    headline: "Campus Lexington, scored.",
    range: "Euclid, Woodland, South Limestone, UK edge",
    blurb:
      "The student strip: Two Keys, Cosmic Charlie’s, Euclid patios. Younger, louder, not Cheapside power-dinner.",
  },
  {
    id: "lex-chevy",
    tab: "Chevy",
    kicker: "Chevy Chase",
    headline: "Chevy Chase, scored.",
    range: "Chevy Chase, Romany, Tates Creek",
    blurb:
      "The neighborhood dressed-casual: Sage Rabbit, Chevy Chase Inn, Tates Creek dinners. Not Hamburg, not campus.",
  },
  {
    id: "lex-hamburg",
    tab: "Hamburg",
    kicker: "Palomar to Hamburg",
    headline: "Hamburg, scored.",
    range: "Hamburg Pavilion, Palomar, Sir Barton",
    blurb:
      "The northeast commercial belt. Chains and a few locals. Not downtown, not Keeneland, not Louisville.",
  },
] as const;

export type LexRegionId = (typeof LEX_REGIONS)[number]["id"];

export const LEX_AREAS = {
  "lex-downtown": ["Cheapside", "Short Street", "Vine"],
  "lex-distillery": ["Manchester", "North Limestone"],
  "lex-campus": ["Euclid", "Woodland"],
  "lex-chevy": ["Chevy Chase", "Tates Creek"],
  "lex-hamburg": ["Hamburg", "Palomar"],
} as const;

export type LexArea = (typeof LEX_AREAS)[LexRegionId][number];

export function lexDistricts(id: string): readonly string[] {
  return (LEX_AREAS as Record<string, readonly string[]>)[id] ?? [];
}

export function xv(
  id: string,
  name: string,
  region: LexRegionId,
  area: LexArea,
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
