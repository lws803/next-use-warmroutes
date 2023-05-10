import { useEffect } from "react";
import { useRouter } from "next/router";

export default function useWarmRoutes(routesMapping: Record<string, string[]>) {
  const router = useRouter();

  const pathsToWarmUp = routesMapping[router.pathname];
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
