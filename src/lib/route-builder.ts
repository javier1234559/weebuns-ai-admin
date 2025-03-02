/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */

import LoadingPage from "@/pages/loading";
import React, { lazy, Suspense, createElement } from "react";
import type { RouteObject } from "react-router-dom";

interface RouteModule {
  default: React.ComponentType;
  Layout?: React.ComponentType<{ children: React.ReactNode }>;
}

export type GlobModules = Record<string, () => Promise<RouteModule>>;

/**
 * Sorts routes by priority root index > other index > static > dynamic > catch-all
 */
function sortRoutes(MODULES: GlobModules): string[] {
  return Object.keys(MODULES)
    .filter((route) => {
      return (
        !route.match(/\/_[^/]+$/) &&
        !route.endsWith("/layout.tsx") &&
        !route.endsWith("/error.tsx") &&
        !route.endsWith("/not-found.tsx")
      );
    })
    .sort((a, b) => {
      // Priority: root index > other index > static > dynamic > catch-all
      const aIsRootIndex = a === "/src/pages/index.tsx";
      const bIsRootIndex = b === "/src/pages/index.tsx";
      const aIsIndex = a.endsWith("/index.tsx");
      const bIsIndex = b.endsWith("/index.tsx");
      const aIsCatchAll = a.includes("[...");
      const bIsCatchAll = b.includes("[...");
      const aIsDynamic = a.includes("[") && !aIsCatchAll;
      const bIsDynamic = b.includes("[") && !bIsCatchAll;
      const aIsStatic = !aIsDynamic && !aIsCatchAll;
      const bIsStatic = !bIsDynamic && !bIsCatchAll;

      // 1. Root index first
      if (aIsRootIndex) return -1;
      if (bIsRootIndex) return 1;

      // 2. Other index routes
      if (aIsIndex !== bIsIndex) return aIsIndex ? -1 : 1;

      // 3. Static routes before dynamic and catch-all
      if (aIsStatic !== bIsStatic) return aIsStatic ? -1 : 1;

      // Extract clean paths for more accurate segment comparison
      const aPath = a.replace(/^\/src\/pages\//, "").replace(/\.tsx$/, "");
      const bPath = b.replace(/^\/src\/pages\//, "").replace(/\.tsx$/, "");

      // Count segments more accurately
      const aSegments = aPath.split("/").filter(Boolean).length;
      const bSegments = bPath.split("/").filter(Boolean).length;

      // 4. Static and Dynamic routes - sort by segments length first
      if (aSegments !== bSegments) return aSegments - bSegments;

      // 5. Within same type, sort alphabetically
      if (aIsStatic && bIsStatic) return a.localeCompare(b);
      if (aIsDynamic && bIsDynamic) return a.localeCompare(b);

      // 6. Dynamic routes before catch-all
      if (aIsDynamic !== bIsDynamic) return aIsDynamic ? -1 : 1;

      // 7. Catch-all routes last
      if (aIsCatchAll !== bIsCatchAll) return aIsCatchAll ? 1 : -1;

      // 8. Within same type, sort by path length
      return a.length - b.length;
    });
}

/**
 * Converts a file path to a valid route path
 */
function convertToRoutePath(route: string): string {
  let path = route;
  // Remove src/pages prefix and .tsx extension
  path = path.replace(/^\/src\/pages\//, "").replace(/\.tsx$/, "");
  // Remove group notation, e.g., (admin)
  path = path.replace(/\([^)]+\)\//g, "");
  // Handle index routes
  path = path.replace(/\/index$/, "");
  if (path === "index") path = "";
  // Convert dynamic segments [param] to :param
  path = path.replace(/\[([^\.].*?)\]/g, ":$1");
  // Convert catch-all segments [...param] to *
  path = path.replace(/\[\.\.\.(.+?)\]/g, "*");

  // Ensure path starts with /
  if (!path.startsWith("/")) {
    path = "/" + path;
  }

  return path;
}

/**
 * Collects layout components from the modules
 */
function collectLayouts(
  MODULES: GlobModules,
): Map<string, React.ComponentType> {
  const layoutRoutes = new Map<string, React.ComponentType>();

  Object.keys(MODULES).forEach((route) => {
    if (route.endsWith("/layout.tsx")) {
      let layoutKey;

      // Special case for root layout
      if (route === "/src/pages/layout.tsx") {
        layoutKey = "";
      } else {
        layoutKey = route
          .replace(/^\/src\/pages\//, "")
          .replace(/\/layout\.tsx$/, "");
      }

      const Layout = lazy(MODULES[route]);
      layoutRoutes.set(layoutKey, Layout);
    }
  });

  console.log("All collected layout keys:", Array.from(layoutRoutes.keys()));
  return layoutRoutes;
}

/**
 * Builds an array of possible layout paths for a given route
 */
function getLayoutPaths(path: string): string[] {
  // For root path, just return an empty string
  if (path === "/") {
    return [""];
  }

  // For other paths, build layout paths from most specific to least specific
  const segments = path.split("/").filter(Boolean);
  const paths = [];

  // Start with the most specific path
  // Build paths from most specific to least specific (excluding empty string for now)
  for (let i = segments.length; i > 0; i--) {
    paths.push(segments.slice(0, i).join("/"));
  }

  // Add root layout (empty string) last - this ensures it will be applied last
  paths.push("");

  return paths;
}

/**
 * Applies layouts to a component
 */
function applyLayouts(
  path: string,
  element: any,
  layoutRoutes: Map<string, React.ComponentType>,
): any {
  // Get layout paths from most specific to root
  const layoutPaths = getLayoutPaths(path);

  // Apply layouts from most specific to least specific (root layout last)
  layoutPaths.forEach((layoutPath) => {
    const Layout = layoutRoutes.get(layoutPath);

    if (Layout) {
      element = createElement(
        Suspense,
        { fallback: createElement(LoadingPage, null) },
        createElement(Layout, null, element),
      );
    }
  });

  return element;
}

/**
 * Adds not-found routes to the routes array
 */
function addNotFoundRoutes(
  MODULES: GlobModules,
  routes: RouteObject[],
  layoutRoutes: Map<string, React.ComponentType>,
): void {
  const notFoundRoutes = Object.keys(MODULES).filter((route) =>
    route.endsWith("/not-found.tsx"),
  );

  notFoundRoutes.forEach((route) => {
    let path = route
      .replace(/^\/src\/pages\//, "")
      .replace(/not-found\.tsx$/, "");

    // Remove group notation, e.g., (admin), (protect)
    path = path.replace(/\([^)]+\)\//g, "");

    // Remove trailing slash if exists
    path = path.replace(/\/$/, "");

    // If it's root not-found, use /*
    path = path ? `/${path}/*` : "/*";

    const NotFound = lazy(MODULES[route]);
    let element: any = createElement(
      Suspense,
      { fallback: createElement(LoadingPage, null) },
      createElement(NotFound, null),
    );

    // Apply layouts - we need to remove the /* for layout matching
    const layoutPath = path.replace(/\/\*$/, "");

    element = applyLayouts(layoutPath, element, layoutRoutes);

    routes.push({ path, element });
  });
}

/**
 * Builds routes from the glob modules
 */
function buildGlobRoutes(MODULES: GlobModules): RouteObject[] {
  const routes: RouteObject[] = [];
  const layoutRoutes = collectLayouts(MODULES);
  const sortedRoutePaths = sortRoutes(MODULES);

  // Build regular routes
  sortedRoutePaths.forEach((route) => {
    const path = convertToRoutePath(route);

    const Component = lazy(MODULES[route]);
    let element: any = createElement(
      Suspense,
      { fallback: createElement(LoadingPage, null) },
      createElement(Component, null),
    );

    // Apply layouts to the component
    element = applyLayouts(path, element, layoutRoutes);

    routes.push({ path, element });
  });

  // Add not-found routes at the end
  addNotFoundRoutes(MODULES, routes, layoutRoutes);

  return routes;
}

export default buildGlobRoutes;
