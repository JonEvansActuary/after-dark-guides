import type { Place } from "./place";

export type LatLng = { lat: number; lng: number };

const AREA: Record<string, LatLng> = {
  // Beach
  "sunny-isles::Collins SIB": { lat: 25.939, lng: -80.121 },
  "sunny-isles::Hotel row": { lat: 25.941, lng: -80.121 },
  "sunny-isles::Town Center": { lat: 25.9294, lng: -80.1325 },
  "bal-harbour::Bal Harbour Shops": { lat: 25.8889, lng: -80.1239 },
  "bal-harbour::Surfside": { lat: 25.8784, lng: -80.1258 },
  "bal-harbour::Haulover": { lat: 25.9132, lng: -80.122 },
  "bal-harbour::Surf Club": { lat: 25.8772, lng: -80.1212 },
  "north-beach::71st Street": { lat: 25.8514, lng: -80.1322 },
  "north-beach::North Shore": { lat: 25.855, lng: -80.1204 },
  "north-beach::Normandy Isle": { lat: 25.8512, lng: -80.1418 },
  "north-beach::Ocean Terrace": { lat: 25.8542, lng: -80.1202 },
  "mid-beach::Fontainebleau": { lat: 25.8178, lng: -80.1224 },
  "mid-beach::Faena District": { lat: 25.8072, lng: -80.1264 },
  "mid-beach::41st Street": { lat: 25.8132, lng: -80.131 },
  "mid-beach::Freehand": { lat: 25.805, lng: -80.1286 },
  "mid-beach::Boardwalk": { lat: 25.812, lng: -80.1218 },
  "mid-beach::Collins Mid": { lat: 25.81, lng: -80.124 },
  "south-beach::Ocean Drive": { lat: 25.7788, lng: -80.1308 },
  "south-beach::Lincoln Road": { lat: 25.7908, lng: -80.137 },
  "south-beach::Washington Avenue": { lat: 25.7854, lng: -80.1336 },
  "south-beach::Española Way": { lat: 25.7866, lng: -80.1322 },
  "south-beach::SoFi": { lat: 25.7704, lng: -80.1342 },
  "south-beach::Collins Park": { lat: 25.7952, lng: -80.1294 },
  "south-beach::West Avenue": { lat: 25.785, lng: -80.1426 },
  "south-beach::South Pointe": { lat: 25.7642, lng: -80.1352 },
  // Knoxville
  "downtown::Market Square": { lat: 35.9648, lng: -83.9194 },
  "downtown::Gay Street": { lat: 35.9656, lng: -83.9182 },
  "downtown::Old City": { lat: 35.9704, lng: -83.917 },
  "downtown::Union & Clinch": { lat: 35.9618, lng: -83.9206 },
  "downtown::World's Fair & River": { lat: 35.961, lng: -83.9246 },
  "downtown::The Strip": { lat: 35.9574, lng: -83.9266 },
  "downtown::Fort Sanders": { lat: 35.9564, lng: -83.9302 },
  "downtown::Happy Holler": { lat: 35.9782, lng: -83.9246 },
  "downtown::Jackson & Depot": { lat: 35.9696, lng: -83.9202 },
  "west::Bearden": { lat: 35.9382, lng: -83.9874 },
  "west::Kingston Pike": { lat: 35.933, lng: -84.012 },
  "west::West Town": { lat: 35.9252, lng: -84.0524 },
  "west::Cedar Bluff": { lat: 35.9184, lng: -84.076 },
  "west::Turkey Creek": { lat: 35.9056, lng: -84.1552 },
  "west::Farragut": { lat: 35.8848, lng: -84.1736 },
  "west::Northshore": { lat: 35.9152, lng: -84.036 },
  "west::Karns": { lat: 35.9954, lng: -84.066 },
  "north::Fountain City": { lat: 36.0252, lng: -83.9368 },
  "north::Inskip": { lat: 36.0004, lng: -83.9402 },
  "north::Broadway North": { lat: 36.0102, lng: -83.9254 },
  "north::Powell": { lat: 36.0318, lng: -84.0272 },
  "north::Halls": { lat: 36.0774, lng: -83.9312 },
  "north::Dutch Valley": { lat: 36.0152, lng: -83.9604 },
  "south::Sevier Avenue": { lat: 35.9532, lng: -83.9154 },
  "south::Island Home": { lat: 35.9518, lng: -83.8982 },
  "south::Chapman Highway": { lat: 35.9404, lng: -83.9102 },
  "south::Urban Wilderness": { lat: 35.9448, lng: -83.8846 },
  "south::South Grove": { lat: 35.9482, lng: -83.9204 },
  "east::Magnolia": { lat: 35.9724, lng: -83.8982 },
  "east::MLK": { lat: 35.9752, lng: -83.9054 },
  "east::Burlington": { lat: 35.9782, lng: -83.8884 },
  "east::Chilhowee": { lat: 35.9822, lng: -83.8702 },
  "east::Asheville Highway": { lat: 35.9854, lng: -83.8548 },
  "east::Parkridge": { lat: 35.9732, lng: -83.9084 },
  "east::Holston": { lat: 36.0002, lng: -83.8504 },
  // Nashville
  "nash-downtown::Broadway": { lat: 36.1606, lng: -86.7778 },
  "nash-downtown::2nd Avenue": { lat: 36.1612, lng: -86.7754 },
  "nash-downtown::Printers Alley": { lat: 36.1644, lng: -86.7796 },
  "nash-downtown::Germantown": { lat: 36.1766, lng: -86.7882 },
  "nash-gulch::The Gulch": { lat: 36.1528, lng: -86.7826 },
  "nash-gulch::SoBro": { lat: 36.1548, lng: -86.7756 },
  "nash-gulch::Demonbreun": { lat: 36.1566, lng: -86.7788 },
  "nash-east::Five Points": { lat: 36.1768, lng: -86.7504 },
  "nash-east::Gallatin Pike": { lat: 36.186, lng: -86.7392 },
  "nash-east::Riverside": { lat: 36.1848, lng: -86.7246 },
  "nash-east::Lockeland": { lat: 36.1812, lng: -86.7422 },
  "nash-midtown::Midtown": { lat: 36.1518, lng: -86.7968 },
  "nash-midtown::West End": { lat: 36.1482, lng: -86.8054 },
  "nash-midtown::Music Row": { lat: 36.1472, lng: -86.7932 },
  "nash-south::12 South": { lat: 36.1228, lng: -86.7904 },
  "nash-south::Wedgewood-Houston": { lat: 36.1404, lng: -86.7752 },
  "nash-south::Berry Hill": { lat: 36.1168, lng: -86.7684 },
  "nash-south::Green Hills": { lat: 36.1064, lng: -86.8152 },
  // Atlanta
  "atl-midtown::10th & Piedmont": { lat: 33.7818, lng: -84.3794 },
  "atl-midtown::Crescent": { lat: 33.7846, lng: -84.3846 },
  "atl-midtown::Colony Square": { lat: 33.7868, lng: -84.384 },
  "atl-midtown::Peachtree Midtown": { lat: 33.7806, lng: -84.3842 },
  "atl-buckhead::Village": { lat: 33.8386, lng: -84.3794 },
  "atl-buckhead::Piedmont": { lat: 33.8372, lng: -84.3704 },
  "atl-buckhead::Pharr": { lat: 33.8376, lng: -84.3778 },
  "atl-buckhead::Peachtree Buckhead": { lat: 33.8466, lng: -84.3642 },
  "atl-east::Edgewood": { lat: 33.7546, lng: -84.3712 },
  "atl-east::Ponce City": { lat: 33.7726, lng: -84.3654 },
  "atl-east::Inman Park": { lat: 33.7572, lng: -84.3524 },
  "atl-east::Virginia-Highland": { lat: 33.7822, lng: -84.3528 },
  "atl-east::Little Five": { lat: 33.7652, lng: -84.3492 },
  "atl-east::EAV": { lat: 33.7402, lng: -84.3462 },
  "atl-west::West Midtown": { lat: 33.7872, lng: -84.4118 },
  "atl-west::Howell Mill": { lat: 33.7892, lng: -84.4132 },
  "atl-west::Atlantic Station": { lat: 33.7924, lng: -84.3968 },
  "atl-downtown::Downtown Core": { lat: 33.7552, lng: -84.3904 },
  "atl-downtown::Castleberry": { lat: 33.7482, lng: -84.4012 },
  "atl-downtown::Underground": { lat: 33.7524, lng: -84.3902 },
};

const PIN: Record<string, LatLng> = {
  "mb-liv": { lat: 25.8177, lng: -80.1223 },
  "si-acqualina": { lat: 25.9415, lng: -80.1208 },
  "si-il-mulino": { lat: 25.9416, lng: -80.1206 },
  "si-jw": { lat: 25.9368, lng: -80.1215 },
  "preservation-pub": { lat: 35.9649, lng: -83.9195 },
  "scruffy-city-hall": { lat: 35.9647, lng: -83.9196 },
  "bernadettes": { lat: 35.965, lng: -83.9193 },
  "w-cotton-eyed-joe": { lat: 35.9058, lng: -84.1462 },
  "w-kitchen-919": { lat: 35.9376, lng: -83.9868 },
  "n-tootsies": { lat: 36.1605, lng: -86.7781 },
  "n-ryman": { lat: 36.1613, lng: -86.7785 },
  "n-acme": { lat: 36.162, lng: -86.7744 },
  "n-attaboy": { lat: 36.1774, lng: -86.7505 },
  "n-patterson": { lat: 36.1514, lng: -86.7809 },
  "n-lukes": { lat: 36.1608, lng: -86.7772 },
  "a-tg": { lat: 33.8388, lng: -84.3792 },
  "a-blakes": { lat: 33.7817, lng: -84.379 },
  "a-compound": { lat: 33.7876, lng: -84.4114 },
  "a-pcm": { lat: 33.7725, lng: -84.3655 },
  "a-pcm-roof": { lat: 33.7728, lng: -84.3653 },
  "a-tabernacle": { lat: 33.7594, lng: -84.3922 },
  "a-clermont": { lat: 33.7736, lng: -84.3618 },
  "a-msr": { lat: 33.7848, lng: -84.3844 },
};

function hash32(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function jitter(id: string, pt: LatLng): LatLng {
  const h = hash32(id);
  const dLat = ((h % 19) - 9) * 0.00011;
  const dLng = (((h >>> 5) % 19) - 9) * 0.00013;
  return { lat: pt.lat + dLat, lng: pt.lng + dLng };
}

function mbStreetLat(street: number) {
  if (street >= 158) return 25.928 + (street - 160) * 0.00072;
  return 25.7684 + street * 0.0012;
}

function collinsLng(street: number) {
  if (street >= 158) return -80.1215;
  if (street >= 90) return -80.1235;
  if (street >= 60) return -80.1206;
  if (street >= 28) return -80.1236;
  if (street >= 16) return -80.1304;
  return -80.134;
}

function fromBeachAddress(address: string): LatLng | null {
  const m = address.match(
    /(\d{1,5})\s+(Collins|Ocean(?:\s+Drive|\s+Dr)?|Washington|Alton|Harding|Indian Creek|Sunny Isles Blvd)/i,
  );
  if (!m) return null;
  const n = Number(m[1]);
  const road = m[2].toLowerCase();
  const street = n >= 200 ? Math.round(n / 100) : n >= 100 ? Math.round(n / 100) : n;
  const lat = mbStreetLat(street);

  if (road.startsWith("ocean")) return { lat, lng: -80.1306 };
  if (road.startsWith("washington")) return { lat, lng: -80.1336 };
  if (road.startsWith("alton")) return { lat, lng: -80.1412 };
  if (road.startsWith("harding")) return { lat, lng: -80.1204 };
  if (road.startsWith("indian")) return { lat: 25.805, lng: -80.1286 };
  if (road.startsWith("sunny")) return { lat: 25.9294, lng: -80.1325 };
  return { lat, lng: collinsLng(street) };
}

function isBeachRegion(region: string) {
  return (
    region === "sunny-isles" ||
    region === "bal-harbour" ||
    region === "north-beach" ||
    region === "mid-beach" ||
    region === "south-beach"
  );
}

function isNashRegion(region: string) {
  return region.startsWith("nash-");
}

function isAtlRegion(region: string) {
  return region.startsWith("atl-");
}

function isKnoxRegion(region: string) {
  return (
    region === "downtown" ||
    region === "west" ||
    region === "north" ||
    region === "south" ||
    region === "east"
  );
}

type CityKey = "beach" | "knox" | "nash" | "atl";

function cityOf(region: string): CityKey {
  if (isBeachRegion(region)) return "beach";
  if (isNashRegion(region)) return "nash";
  if (isAtlRegion(region)) return "atl";
  if (isKnoxRegion(region)) return "knox";
  return "knox";
}

const BBOX: Record<CityKey, { lat0: number; lat1: number; lng0: number; lng1: number; fallback: LatLng }> = {
  beach: { lat0: 25.752, lat1: 25.962, lng0: -80.16, lng1: -80.105, fallback: { lat: 25.81, lng: -80.128 } },
  knox: { lat0: 35.85, lat1: 36.12, lng0: -84.22, lng1: -83.82, fallback: { lat: 35.9606, lng: -83.9208 } },
  nash: { lat0: 36.08, lat1: 36.22, lng0: -86.86, lng1: -86.70, fallback: { lat: 36.162, lng: -86.778 } },
  atl: { lat0: 33.72, lat1: 33.87, lng0: -84.45, lng1: -84.32, fallback: { lat: 33.76, lng: -84.388 } },
};

function clamp(p: Place, pt: LatLng): LatLng {
  const city = cityOf(p.region);
  const box = BBOX[city];
  const area = AREA[`${p.region}::${p.area}`];
  if (pt.lat < box.lat0 || pt.lat > box.lat1 || pt.lng < box.lng0 || pt.lng > box.lng1) {
    return area ?? box.fallback;
  }
  return pt;
}

function fromKnoxAddress(address: string, area: string): LatLng | null {
  const gay = address.match(/(\d{1,4})\s+Gay/i);
  if (gay) {
    const n = Number(gay[1]);
    return { lat: 35.9608 + Math.min(n, 700) * 0.000016, lng: -83.9183 };
  }
  const mkt = address.match(/(\d{1,3})\s+Market Square/i);
  if (mkt) {
    const n = Number(mkt[1]);
    return { lat: 35.9648 + ((n % 9) - 4) * 0.00004, lng: -83.9194 + ((n % 7) - 3) * 0.00005 };
  }
  const pike = address.match(/(\d{4,5})\s+Kingston/i);
  if (pike) {
    const n = Number(pike[1]);
    const t = Math.min(1, Math.max(0, (n - 4200) / 8000));
    return { lat: 35.938 - t * 0.055, lng: -83.978 - t * 0.2 };
  }
  const sevier = address.match(/(\d{3,4})\s+Sevier/i);
  if (sevier) {
    const n = Number(sevier[1]);
    return { lat: 35.9554 - n * 0.000012, lng: -83.9178 + n * 0.00001 };
  }
  void area;
  return null;
}

function fromNashAddress(address: string): LatLng | null {
  const broadway = address.match(/(\d{2,4})\s+Broadway/i);
  if (broadway) {
    const n = Number(broadway[1]);
    const t = Math.min(1, Math.max(0, (n - 100) / 400));
    return { lat: 36.1618 - t * 0.0024, lng: -86.7746 - t * 0.006 };
  }
  const second = address.match(/(\d{2,4})\s+2nd\s+Ave\s*([NS])?/i);
  if (second) {
    const n = Number(second[1]);
    const south = (second[2] || "N").toUpperCase() === "S";
    return { lat: 36.1622 + (south ? -n * 0.00002 : n * 0.000012), lng: -86.7755 };
  }
  const fourthN = address.match(/(\d{2,4})\s+4th\s+Ave\s*N/i);
  if (fourthN) {
    const n = Number(fourthN[1]);
    if (n >= 1000) return { lat: 36.174 + (n - 1200) * 0.00002, lng: -86.788 };
    return { lat: 36.1638, lng: -86.7798 };
  }
  const twelfth = address.match(/(\d{2,4})\s+12th\s+Ave\s*S/i);
  if (twelfth) {
    const n = Number(twelfth[1]);
    if (n >= 2000) {
      const t = Math.min(1, Math.max(0, (n - 2000) / 1000));
      return { lat: 36.132 - t * 0.014, lng: -86.789 };
    }
    return { lat: 36.153 - Math.min(n, 900) * 0.000012, lng: -86.783 };
  }
  const eighth = address.match(/(\d{2,4})\s+8th\s+Ave\s*S/i);
  if (eighth) {
    const n = Number(eighth[1]);
    const t = Math.min(1, Math.max(0, (n - 200) / 2400));
    return { lat: 36.154 - t * 0.04, lng: -86.778 };
  }
  const gallatin = address.match(/(\d{3,5})\s+Gallatin/i);
  if (gallatin) {
    const n = Number(gallatin[1]);
    const t = Math.min(1, Math.max(0, (n - 900) / 3500));
    return { lat: 36.176 + t * 0.045, lng: -86.750 + t * 0.024 };
  }
  const woodland = address.match(/(\d{3,4})\s+Woodland/i);
  if (woodland) {
    const n = Number(woodland[1]);
    return { lat: 36.1768, lng: -86.756 + Math.min(n, 1600) * 0.000008 };
  }
  const westEnd = address.match(/(\d{3,4})\s+West End/i);
  if (westEnd) {
    const n = Number(westEnd[1]);
    return { lat: 36.149, lng: -86.798 - Math.min(n, 2400) * 0.000004 };
  }
  return null;
}

function fromAtlAddress(address: string): LatLng | null {
  const peach = address.match(/(\d{3,4})\s+(?:W\s+)?Peachtree(?:\s+St|\s+Rd)?/i);
  if (peach) {
    const n = Number(peach[1]);
    if (n >= 2800) {
      const t = Math.min(1, Math.max(0, (n - 3000) / 800));
      return { lat: 33.838 + t * 0.012, lng: -84.378 + t * 0.012 };
    }
    const t = Math.min(1, Math.max(0, (n - 600) / 900));
    return { lat: 33.772 + t * 0.016, lng: -84.386 };
  }
  const tenth = address.match(/(\d{2,4})\s+10th\s+St/i);
  if (tenth) {
    const n = Number(tenth[1]);
    return { lat: 33.7818, lng: -84.388 + Math.min(n, 600) * 0.00002 };
  }
  const crescent = address.match(/(\d{3,4})\s+Crescent/i);
  if (crescent) {
    return { lat: 33.7846, lng: -84.3846 };
  }
  const howell = address.match(/(\d{3,4})\s+Howell Mill/i);
  if (howell) {
    const n = Number(howell[1]);
    return { lat: 33.784 + Math.min(n, 1200) * 0.000008, lng: -84.412 };
  }
  const highland = address.match(/(\d{3,4})\s+N(?:orth)?\s+Highland/i);
  if (highland) {
    const n = Number(highland[1]);
    return { lat: 33.776 + Math.min(n, 900) * 0.000012, lng: -84.3526 };
  }
  const edgewood = address.match(/(\d{3,4})\s+Edgewood/i);
  if (edgewood) {
    const n = Number(edgewood[1]);
    return { lat: 33.7548, lng: -84.378 + Math.min(n, 600) * 0.00002 };
  }
  const moreland = address.match(/(\d{3,4})\s+Moreland/i);
  if (moreland) {
    const n = Number(moreland[1]);
    return { lat: 33.768 - Math.min(n, 500) * 0.00002, lng: -84.349 };
  }
  const flat = address.match(/(\d{3,4})\s+Flat Shoals/i);
  if (flat) {
    return { lat: 33.7404, lng: -84.3464 };
  }
  const piedmontRd = address.match(/(\d{3,4})\s+Piedmont(?:\s+Rd|\s+Ave)?/i);
  if (piedmontRd) {
    const n = Number(piedmontRd[1]);
    if (n >= 2000) return { lat: 33.81 + (n - 2400) * 0.00002, lng: -84.367 };
    return { lat: 33.782, lng: -84.379 };
  }
  const ponce = address.match(/(\d{3,4})\s+Ponce/i);
  if (ponce) {
    const n = Number(ponce[1]);
    return { lat: 33.773, lng: -84.378 + Math.min(n, 800) * 0.000015 };
  }
  return null;
}

export function placeCoords(p: Place): LatLng {
  const pinned = PIN[p.id];
  if (pinned) return jitter(p.id, clamp(p, pinned));

  const city = cityOf(p.region);

  if (city === "beach") {
    const beach = fromBeachAddress(p.address);
    if (beach) return jitter(p.id, clamp(p, beach));
  } else if (city === "nash") {
    const nash = fromNashAddress(p.address);
    if (nash) return jitter(p.id, clamp(p, nash));
  } else if (city === "atl") {
    const atl = fromAtlAddress(p.address);
    if (atl) return jitter(p.id, clamp(p, atl));
  } else {
    const knox = fromKnoxAddress(p.address, p.area);
    if (knox) return jitter(p.id, clamp(p, knox));
  }

  const area = AREA[`${p.region}::${p.area}`];
  if (area) return jitter(p.id, area);

  return jitter(p.id, BBOX[city].fallback);
}

export function looksPinColor(looks: number) {
  if (looks >= 7.5) return "#c45c3e";
  if (looks >= 5.5) return "#c9b8a0";
  return "#6e675e";
}

