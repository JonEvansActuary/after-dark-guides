import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { separatePoints } from "./geo.ts";

function meters(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const lat = ((a.lat + b.lat) / 2) * (Math.PI / 180);
  const dLat = (a.lat - b.lat) * 111320;
  const dLng = (a.lng - b.lng) * 111320 * Math.cos(lat);
  return Math.hypot(dLat, dLng);
}

describe("separatePoints", () => {
  it("leaves a lone pin on its geocoded point", () => {
    const out = separatePoints([{ id: "a", lat: 35.96, lng: -83.92 }]);
    assert.deepEqual(out.get("a"), { lat: 35.96, lng: -83.92 });
  });

  it("splits pins that share a coordinate so each can be tapped", () => {
    const base = { lat: 35.9648, lng: -83.9194 };
    const out = separatePoints([
      { id: "a", ...base },
      { id: "b", ...base },
      { id: "c", ...base },
    ]);
    const pts = ["a", "b", "c"].map((id) => out.get(id)!);
    assert.deepEqual(pts[0], base);
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        assert.ok(
          meters(pts[i], pts[j]) >= 16,
          `${i} and ${j} are ${meters(pts[i], pts[j])}m apart`,
        );
      }
    }
  });

  it("does not move pins that are already separated", () => {
    const a = { id: "a", lat: 36.16, lng: -86.78 };
    const b = { id: "b", lat: 36.17, lng: -86.78 };
    const out = separatePoints([a, b]);
    assert.deepEqual(out.get("a"), { lat: a.lat, lng: a.lng });
    assert.deepEqual(out.get("b"), { lat: b.lat, lng: b.lng });
  });
});
