import { useEffect, useState } from "react";

/** The site is a single-page app, so routes are hash based (`#/works`). */
export type Route = "home" | "works";

export const ROUTES: Record<Route, string> = {
  home: "#/",
  works: "#/works",
};

/** Section id (e.g. "#work") to scroll to once the home page mounts. */
let pendingSection: string | null = null;

export function getRoute(): Route {
  return window.location.hash.startsWith(ROUTES.works) ? "works" : "home";
}

/** Current route, kept in sync with the `hashchange` event. */
export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(getRoute);

  useEffect(() => {
    const onChange = () => setRoute(getRoute());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return route;
}

/**
 * Navigate to a route. When `section` is given (e.g. "#services") the home
 * page scrolls to it right after mounting.
 */
export function navigate(route: Route, section?: string): void {
  pendingSection = section ?? null;
  const hash = ROUTES[route];

  // Already on that route — no hash change fires, so scroll straight away.
  if (window.location.hash === hash) {
    if (section) {
      document.querySelector(section)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    return;
  }

  window.location.hash = hash;
}

/** Reads and clears the section a previous navigation asked for. */
export function consumePendingSection(): string | null {
  const section = pendingSection;
  pendingSection = null;
  return section;
}
