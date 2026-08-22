/**
 * Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
 * (and later receive registered routes). Noops when the app is not embedded.
 */

import { useEffect } from "react";
import { useRouter } from "@tanstack/react-router";
import {
  collectRoutePathsFromTree,
  installPreviewHostBridge,
} from "@/lib/preview-host-bridge";

export function PreviewHostBridge() {
  const router = useRouter();

  useEffect(() => {
    const noop = () => {};
    document.addEventListener("touchstart", noop, { passive: true });
    document.addEventListener("touchmove", noop, { passive: true });
    document.addEventListener("touchend", noop, { passive: true });
    const dispose = installPreviewHostBridge({
      navigate: (path) => {
        router.history.push(path);
      },
      getRoutePaths: () => collectRoutePathsFromTree(router.routeTree),
    });
    return () => {
      document.removeEventListener("touchstart", noop);
      document.removeEventListener("touchmove", noop);
      document.removeEventListener("touchend", noop);
      dispose();
    };
  }, [router]);

  return null;
}
