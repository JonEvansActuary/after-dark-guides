import type { Place } from "./place";
import { xv } from "./lexington-types";

const D = "lex-downtown" as const;
const F = "lex-distillery" as const;
const C = "lex-campus" as const;
const H = "lex-chevy" as const;
const G = "lex-hamburg" as const;

export const LEX_MORE: Place[] = [
  xv("x-country-boy", "Country Boy Brewing", F, "Manchester", "Brewery", "436 Chair Ave", 7, 5.5, true, "Thu–Sat",
    "Distillery District tap. Pints, a patio, Lexington’s other civic beer.",
    "Looks above average. Ratio even-to-male. Not Georgetown — this is the Chair Ave room.",
    ["brewery"], "high"),
  xv("x-tolly", "Tolly-Ho", C, "Euclid", "Restaurant", "303 S Limestone", 6, 6, true, "Late; after bars",
    "Campus diner that never sleeps. After Two Keys, a mixed floor.",
    "Looks average. Ratio even (3am mix).",
    ["diner", "campus"], "high"),
  xv("x-pazzos", "Pazzo's", C, "Euclid", "Restaurant", "385 S Limestone", 6.5, 6, true, "Dinner; late",
    "Campus pizza-and-pitchers. The Limestone workhorse.",
    "Looks average-plus. Ratio even.",
    ["pizza", "campus"], "high"),
  xv("x-chop-house", "The Chop House Palomar", G, "Palomar", "Restaurant", "2341 Sir Barton Way", 7.5, 5.5, true, "Dinner",
    "Northeast steak. A bar, a male tilt, Hamburg-adjacent.",
    "Looks high. Ratio even-to-male.",
    ["steak"], "medium"),
  xv("x-tx-roadhouse", "Texas Roadhouse Hamburg", G, "Hamburg", "Restaurant", "Hamburg Pavilion", 6.5, 5.5, true, "Dinner",
    "The rolls, the peanuts, the northeast chain night.",
    "Looks average-plus. Ratio even-to-male.",
    ["steak", "chains"], "high"),
  xv("x-winchells", "Winchell's Restaurant", H, "Tates Creek", "Restaurant", "348 Southland Dr", 7, 6, true, "Dinner; brunch",
    "South Lexington plates. A bar, neighborhood, not campus.",
    "Looks above average. Ratio even.",
    ["dinner"], "medium"),
  xv("x-bella", "Bella Notte", H, "Chevy Chase", "Restaurant", "Chevy Chase Plaza", 8, 6.5, true, "Dinner",
    "Chevy Chase Italian. Dates, a wine list.",
    "Looks high. Ratio slightly female.",
    ["italian", "date night"], "medium"),
  xv("x-north-lime-bar", "The Break Room late / NoLi", F, "North Limestone", "Bar", "N Limestone", 6.5, 6, true, "Late",
    "North Limestone after Al’s. Cheap, a local mix.",
    "Looks average-plus. Ratio even.",
    ["late night"], "low"),
];
