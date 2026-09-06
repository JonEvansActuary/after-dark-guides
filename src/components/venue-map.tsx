import { lazy, Suspense, useEffect, useState } from "react";
import type { Place } from "@/data/place";

const Canvas = lazy(() => import("./venue-map-canvas"));

export function VenueMap({
  places,
  selectedId,
  onOpen,
}: {
  places: Place[];
  selectedId?: string | null;
  onOpen: (v: Place) => void;
}) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div className="venue-map-shell flex items-center justify-center rounded-lg border border-line bg-surface text-sm text-faint">
        Loading map…
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="venue-map-shell flex items-center justify-center rounded-lg border border-line bg-surface text-sm text-faint">
          Loading map…
        </div>
      }
    >
      <Canvas places={places} selectedId={selectedId} onOpen={onOpen} />
    </Suspense>
  );
}
