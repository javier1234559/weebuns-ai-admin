import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query);
      setMatches(media.matches);
      const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
      media.addEventListener("change", listener);

      return () => media.removeEventListener("change", listener);
    }
  }, [query]);

  return matches;
}

export function useIsMobile() {
  return useMediaQuery("(max-width: 768px)");
}

export function useIsDesktop() {
  return useMediaQuery("(min-width: 1025px)");
}

export function useIsTablet() {
  return useMediaQuery("(min-width: 768px) and (max-width: 1024px)");
}
