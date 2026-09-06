import type { Category, Confidence } from "./types";
import type { Place } from "./place";

export const CHAT_REGIONS = [
  {
    id: "chat-downtown",
    tab: "Downtown",
    kicker: "Market to the bluff",
    headline: "Downtown Chattanooga, scored.",
    range: "Market Street, Broad, the Aquarium, Bluff View, hotel bars",
    blurb:
      "The river core: whiskey, hotel lobbies, Warehouse Row, the Aquarium lawn. Same two scores. Southside, North Shore, St. Elmo, and Hamilton Place stay on their own tabs.",
  },
  {
    id: "chat-southside",
    tab: "Southside",
    kicker: "Main Street walk",
    headline: "Southside Chattanooga, scored.",
    range: "Main Street, MLK, 12th Street, the breweries",
    blurb:
      "Where Chattanooga actually goes out: Main Street rooms, dives, and brewery patios. Not the Aquarium tourist loop, not Hamilton Place chains.",
  },
  {
    id: "chat-northshore",
    tab: "N. Shore",
    kicker: "Frazier Avenue",
    headline: "North Shore, scored.",
    range: "Frazier Avenue, Coolidge Park, Songbirds, the walking bridge",
    blurb:
      "Across the Walnut Street Bridge: Frazier patios, Coolidge Park, Songbirds. Day-into-night, not Southside’s late rooms.",
  },
  {
    id: "chat-stelmo",
    tab: "St. Elmo",
    kicker: "The Incline",
    headline: "St. Elmo, scored.",
    range: "St. Elmo Avenue, the Incline, the mountain toe",
    blurb:
      "The historic neighborhood under Lookout: the Incline, St. Elmo Brewing, a short strip. Tennessee side only — not Rock City, Georgia.",
  },
  {
    id: "chat-east",
    tab: "East",
    kicker: "Hamilton Place",
    headline: "East Chattanooga, scored.",
    range: "Hamilton Place, Gunbarrel, Brainerd",
    blurb:
      "The east commercial belt: mall-adjacent bars, chain patios, Gunbarrel. Not downtown, not Southside.",
  },
] as const;

export type ChatRegionId = (typeof CHAT_REGIONS)[number]["id"];

export const CHAT_AREAS = {
  "chat-downtown": ["Market Street", "Broad", "Bluff View"],
  "chat-southside": ["Main Street", "MLK", "12th Street"],
  "chat-northshore": ["Frazier", "Coolidge", "Station"],
  "chat-stelmo": ["St. Elmo Ave", "Incline"],
  "chat-east": ["Hamilton Place", "Gunbarrel", "Brainerd"],
} as const;

export type ChatArea = (typeof CHAT_AREAS)[ChatRegionId][number];

export function chatDistricts(id: string): readonly string[] {
  return (CHAT_AREAS as Record<string, readonly string[]>)[id] ?? [];
}

export function cv(
  id: string,
  name: string,
  region: ChatRegionId,
  area: ChatArea,
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
