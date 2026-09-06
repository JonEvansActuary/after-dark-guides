import { useEffect } from "react";
import { CircleMarker, MapContainer, TileLayer, useMap } from "react-leaflet";
import { looksPinColor, placeCoords } from "@/data/geo";
import type { Place } from "@/data/place";
import "leaflet/dist/leaflet.css";

type Props = {
  places: Place[];
  selectedId?: string | null;
  onOpen: (v: Place) => void;
};

function Fit({ places }: { places: Place[] }) {
  const map = useMap();
  const key = places.map((p) => p.id).join(",");

  useEffect(() => {
    const pts = places.map((p) => {
      const c = placeCoords(p);
      return [c.lat, c.lng] as [number, number];
    });

    const apply = () => {
      map.invalidateSize();
      const size = map.getSize();
      if (size.x < 40 || size.y < 40 || pts.length === 0) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (pts.length === 1) {
        map.setView(pts[0], 15, { animate: !reduce });
        return;
      }
      map.fitBounds(pts, { padding: [40, 40], maxZoom: 16, animate: !reduce });
    };

    apply();
    const t = window.setTimeout(apply, 200);
    const el = map.getContainer();
    const ro = new ResizeObserver(() => apply());
    ro.observe(el);
    return () => {
      window.clearTimeout(t);
      ro.disconnect();
    };
  }, [map, key, places]);

  return null;
}

export default function VenueMapCanvas({ places, selectedId, onOpen }: Props) {
  const origin = places[0] ? placeCoords(places[0]) : { lat: 25.8, lng: -80.13 };

  return (
    <div className="venue-map-shell relative overflow-hidden rounded-lg border border-line">
      <MapContainer
        center={[origin.lat, origin.lng]}
        zoom={14}
        minZoom={11}
        maxZoom={18}
        className="h-full w-full"
        scrollWheelZoom
        attributionControl
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <Fit places={places} />
        {places.map((p) => {
          const c = placeCoords(p);
          const active = p.id === selectedId;
          return (
            <CircleMarker
              key={p.id}
              center={[c.lat, c.lng]}
              radius={active ? 12 : p.nightlife ? 8 : 6}
              pathOptions={{
                color: active ? "#f2eee6" : "#0c0b0a",
                weight: active ? 2 : 1,
                fillColor: looksPinColor(p.looks),
                fillOpacity: 0.92,
              }}
              eventHandlers={{
                click: () => onOpen(p),
              }}
            />
          );
        })}
      </MapContainer>
      <div className="venue-map-legend pointer-events-none absolute bottom-3 left-3 rounded-md border border-line bg-surface/90 px-3 py-2 text-[11px] text-muted">
        <p className="tracking-wide text-faint uppercase">Looks draw</p>
        <div className="mt-1.5 flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block size-2.5 rounded-full bg-looks" />
            High
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block size-2.5 rounded-full bg-accent" />
            Mid
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block size-2.5 rounded-full bg-faint" />
            Lower
          </span>
        </div>
        <p className="mt-1.5 text-faint">{places.length} on the map · tap a pin</p>
      </div>
    </div>
  );
}
