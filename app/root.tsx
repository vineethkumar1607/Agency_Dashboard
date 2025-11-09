import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { registerLicense } from "@syncfusion/ej2-base";
import { account, client } from "~/appwrite/client";
import { refreshJWT } from "~/appwrite/refreshJWT";

registerLicense(import.meta.env.VITE_SYNCFUSION_LICENSE_KEY);

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  // ✅ Restore JWT on reload
  if (typeof window !== "undefined") {
    const savedJWT = localStorage.getItem("appwriteJWT");
    if (savedJWT) {
      console.log("[App Init] Restoring JWT from localStorage...");
      client.setJWT(savedJWT);

      account.get().catch(async (err) => {
        if (err.message?.includes("Expired")) {
          console.warn("[App Init] JWT expired, refreshing...");
          await refreshJWT();
        } else {
          console.error("[App Init] Invalid JWT:", err);
          localStorage.removeItem("appwriteJWT");
        }
      });
    }
  }

  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "Page not found"
        : error.statusText || details;
  } else if (error instanceof Error) {
    details = error.message;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
    </main>
  );
}
