export const REGIONS = [
  {
    id: "downtown",
    tab: "Downtown",
    kicker: "Scruffy City",
    headline: "Downtown Knoxville, scored.",
    range: "Gay Street, Market Square, Old City, The Strip, Fort Sanders, Happy Holler, World’s Fair",
    blurb:
      "Every bar, club, restaurant, shop, and public room we could pin in the downtown nightlife core — then scored on how they draw good-looking women, and how high the women-to-men ratio usually runs.",
  },
  {
    id: "west",
    tab: "West",
    kicker: "Bearden to Farragut",
    headline: "West Knox County, scored.",
    range: "Bearden, Kingston Pike, West Town, Cedar Bluff, Northshore, Turkey Creek, Farragut, Karns",
    blurb:
      "The west corridor from Bearden Hill out past Turkey Creek to Farragut — country dance floors, date-night steakhouses, brewpubs, malls, and lakeside parks. Same scores as downtown, this tab only.",
  },
  {
    id: "north",
    tab: "North",
    kicker: "Fountain City to Halls",
    headline: "North Knox County, scored.",
    range: "Fountain City, Inskip, Broadway North, Powell, Halls, Dutch Valley",
    blurb:
      "North of downtown: Fountain City lake-and-diner country, Powell and Halls Crossroads taverns, pinball pubs, and neighborhood rooms. Nothing from the other tabs mixed in.",
  },
  {
    id: "south",
    tab: "South",
    kicker: "Sevier Ave to Chapman",
    headline: "South Knoxville, scored.",
    range: "Sevier Avenue, Island Home, Ijams, Chapman Highway, Urban Wilderness",
    blurb:
      "South of the river: Sevier Avenue cocktail rooms and breweries, Island Home patios, Kern’s Food Hall, Chapman Highway, and the Urban Wilderness trailheads.",
  },
  {
    id: "east",
    tab: "East",
    kicker: "Magnolia to Holston",
    headline: "East Knoxville, scored.",
    range: "Magnolia, MLK, Burlington, Chilhowee, Asheville Highway, Parkridge, Holston",
    blurb:
      "East of downtown: Magnolia and MLK nightlife, Burlington and Chilhowee, the Zoo, Botanical Gardens, and the Asheville Highway / Holston corridor.",
  },
] as const;

export type RegionId = (typeof REGIONS)[number]["id"];

export const DOWNTOWN_AREAS = [
  "Market Square",
  "Gay Street",
  "Old City",
  "Union & Clinch",
  "World's Fair & River",
  "The Strip",
  "Fort Sanders",
  "Happy Holler",
  "Jackson & Depot",
] as const;

export const WEST_AREAS = [
  "Bearden",
  "Kingston Pike",
  "West Town",
  "Cedar Bluff",
  "Turkey Creek",
  "Farragut",
  "Northshore",
  "Karns",
] as const;

export const NORTH_AREAS = [
  "Fountain City",
  "Inskip",
  "Broadway North",
  "Powell",
  "Halls",
  "Dutch Valley",
] as const;

export const SOUTH_AREAS = [
  "Sevier Avenue",
  "Island Home",
  "Chapman Highway",
  "Urban Wilderness",
  "South Grove",
] as const;

export const EAST_AREAS = [
  "Magnolia",
  "MLK",
  "Burlington",
  "Chilhowee",
  "Asheville Highway",
  "Parkridge",
  "Holston",
] as const;

export const AREAS = [
  ...DOWNTOWN_AREAS,
  ...WEST_AREAS,
  ...NORTH_AREAS,
  ...SOUTH_AREAS,
  ...EAST_AREAS,
] as const;

export type Area = (typeof AREAS)[number];

export const AREAS_BY_REGION: Record<RegionId, readonly Area[]> = {
  downtown: DOWNTOWN_AREAS,
  west: WEST_AREAS,
  north: NORTH_AREAS,
  south: SOUTH_AREAS,
  east: EAST_AREAS,
};

export const CATEGORIES = [
  "Nightclub",
  "Bar",
  "Rooftop",
  "Speakeasy",
  "Cocktail",
  "Brewery",
  "Distillery",
  "Sports bar",
  "Live music",
  "Restaurant",
  "Cafe",
  "Coffee",
  "Dessert",
  "Retail",
  "Salon",
  "Entertainment",
  "Attraction",
  "Hotel",
  "Beach club",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type Confidence = "high" | "medium" | "low";

export type Venue = {
  id: string;
  name: string;
  region: RegionId;
  area: Area;
  category: Category;
  address: string;
  /** 1–10: how much the place typically draws good-looking women */
  looks: number;
  /** 1–10: typical women-to-men ratio (10 = heavily female, 5 = even, 1 = heavily male) */
  ratio: number;
  confidence: Confidence;
  nightlife: boolean;
  peak: string;
  blurb: string;
  notes: string;
  tags: string[];
};

export function combinedScore(v: Pick<Venue, "looks" | "ratio">) {
  return Math.round((v.looks * 0.55 + v.ratio * 0.45) * 10) / 10;
}

export function ratioLabel(n: number) {
  if (n >= 8) return "Mostly women";
  if (n >= 6.5) return "More women";
  if (n >= 5.5) return "Slightly more women";
  if (n >= 4.5) return "About even";
  if (n >= 3.5) return "Slightly more men";
  if (n >= 2) return "More men";
  return "Mostly men";
}

export function looksLabel(n: number) {
  if (n >= 8.5) return "Very high";
  if (n >= 7) return "High";
  if (n >= 5.5) return "Above average";
  if (n >= 4) return "Average";
  return "Below average";
}

export function regionById(id: RegionId) {
  return REGIONS.find((r) => r.id === id)!;
}
