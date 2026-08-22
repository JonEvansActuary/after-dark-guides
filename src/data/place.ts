import type { Category, Confidence } from "./types";

/** City-agnostic place row used by cards, details, and both field guides. */
export type Place = {
  id: string;
  name: string;
  region: string;
  area: string;
  category: Category;
  address: string;
  looks: number;
  ratio: number;
  confidence: Confidence;
  nightlife: boolean;
  peak: string;
  blurb: string;
  notes: string;
  tags: string[];
};
