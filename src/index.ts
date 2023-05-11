import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { minimatch } from "minimatch";

export default function useWarmRoutes(routesMapping: Record<string, string[]>) {
  const pathname = usePathname();

  let pathsToWarmUp: string[] = [];
  for (const key in routesMapping) {
    if (minimatch(pathname, key)) {
      pathsToWarmUp = routesMapping[key];
      break;
    }
  }

  useEffect(() => {
    const warmupPaths = () => {
      pathsToWarmUp.forEach((path) => {
        fetch(path, { method: "OPTIONS" }).catch(() => null);
      });
    };

    pathsToWarmUp && warmupPaths();
  }, [pathsToWarmUp]);

  return {
    warmRoute: (path: string) =>
      fetch(path, { method: "OPTIONS" }).catch(() => null),
  };
}
