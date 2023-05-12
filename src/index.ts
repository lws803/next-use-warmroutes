import { useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";
import { minimatch } from "minimatch";

export default function useWarmRoutes(routesMapping: Record<string, string[]>) {
  const pathname = usePathname();

  const wakeRoutes = useCallback(
    (pathname: string) => {
      const warmupPaths = (paths: string[]) => {
        paths.forEach((path) => {
          fetch(path, { method: "OPTIONS" }).catch(() => null);
        });
      };

      for (const key in routesMapping) {
        if (minimatch(pathname, key)) {
          const pathsToWarmUp = routesMapping[key];
          return warmupPaths(pathsToWarmUp);
        }
      }
    },
    [pathname]
  );

  useEffect(() => wakeRoutes(pathname), [pathname]);

  useEffect(() => {
    window.addEventListener("focus", () => wakeRoutes(pathname));
    return () => {
      window.removeEventListener("focus", () => wakeRoutes(pathname));
    };
  }, []);

  return {
    warmRoute: (paths: string[]) =>
      paths.forEach((path) =>
        fetch(path, { method: "OPTIONS" }).catch(() => null)
      ),
  };
}
