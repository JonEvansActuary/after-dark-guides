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

function clamp(p: Place, pt: LatLng): LatLng {
  const area = AREA[`${p.region}::${p.area}`];
  if (isBeachRegion(p.region)) {
    if (pt.lat < 25.752 || pt.lat > 25.962 || pt.lng < -80.16 || pt.lng > -80.105) {
      return area ?? { lat: 25.81, lng: -80.128 };
    }
    return pt;
  }
  if (pt.lat < 35.85 || pt.lat > 36.12 || pt.lng < -84.22 || pt.lng > -83.82) {
    return area ?? { lat: 35.9606, lng: -83.9208 };
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

export function placeCoords(p: Place): LatLng {
  const pinned = PIN[p.id];
  if (pinned) return jitter(p.id, clamp(p, pinned));

  const beach = fromBeachAddress(p.address);
  if (beach && isBeachRegion(p.region)) {
    return jitter(p.id, clamp(p, beach));
  }

  const knox = fromKnoxAddress(p.address, p.area);
  if (knox) return jitter(p.id, clamp(p, knox));

  const area = AREA[`${p.region}::${p.area}`];
  if (area) return jitter(p.id, area);

  if (p.region === "west" || p.region === "north" || p.region === "south" || p.region === "east" || p.region === "downtown") {
    return jitter(p.id, { lat: 35.9606, lng: -83.9208 });
  }
  return jitter(p.id, { lat: 25.81, lng: -80.128 });
}

export function looksPinColor(looks: number) {
  if (looks >= 7.5) return "#c45c3e";
  if (looks >= 5.5) return "#c9b8a0";
  return "#6e675e";
}
