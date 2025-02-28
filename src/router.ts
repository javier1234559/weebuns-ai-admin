import { createBrowserRouter } from "react-router-dom"

import App from "./App"
import  buildGlobRoutes, { GlobModules } from "@/lib/route-builder"
import React from "react";
import ErrorPage from "@/pages/error";

const globTree = import.meta.glob('/src/pages/**/[a-z[]*.tsx');
const tree = buildGlobRoutes(globTree as GlobModules);

console.log(tree);

const router = createBrowserRouter([
  {
    path: '/',
    element: React.createElement(App),
    children: tree,
    errorElement: React.createElement(ErrorPage),
  },
]);

export default router;
