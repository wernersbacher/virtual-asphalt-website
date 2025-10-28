import {
  RouterProvider,
  createRouter,
  createHashHistory,
} from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { ThemeProvider } from "./components/themeprovider";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import "./styles.css";

// Create hash-based history for better SPA support
const hashHistory = createHashHistory();

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {},
  history: hashHistory,
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </StrictMode>
  );
}
