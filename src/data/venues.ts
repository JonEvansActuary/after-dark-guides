import type { RegionId, Venue } from "./types";
import { CORE } from "./venues-core";
import { OLD_CITY } from "./venues-old-city";
import { REST } from "./venues-rest";
import { WEST } from "./venues-west";
import { NORTH } from "./venues-north";
import { SOUTH } from "./venues-south";
import { EAST } from "./venues-east";

const seen = new Set<string>();
export const VENUES: Venue[] = [...CORE, ...OLD_CITY, ...REST, ...WEST, ...NORTH, ...SOUTH, ...EAST].filter((v) => {
  if (seen.has(v.id)) return false;
  seen.add(v.id);
  return true;
});

export function venuesIn(region: RegionId) {
  return VENUES.filter((v) => v.region === region);
}

export const NIGHTLIFE_CATS = new Set([
  "Nightclub",
  "Bar",
  "Rooftop",
  "Speakeasy",
  "Cocktail",
  "Brewery",
  "Distillery",
  "Sports bar",
  "Live music",
  "Beach club",
]);

export function isNightlife(v: { nightlife: boolean; category: string }) {
  return v.nightlife || NIGHTLIFE_CATS.has(v.category);
}
