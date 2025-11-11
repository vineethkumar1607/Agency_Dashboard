import { useEffect } from "react";
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
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "../store/store";
import {
  initializeAuthListener,
  selectIsInitialized,
  selectUser,
} from "../store/auth/authSlice";
import type { AppDispatch } from "../store/store";

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
        <Provider store={store}>
          {children}
          <ScrollRestoration />
          <Scripts />
        </Provider>
      </body>
    </html>
  );
}

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  const initialized = useSelector(selectIsInitialized);
  const firebaseUser = useSelector(selectUser);

  useEffect(() => {
    dispatch(initializeAuthListener()).catch((err) =>
      console.error("Auth listener initialization failed:", err)
    );
  }, [dispatch]);

  if (!initialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <img src="/assets/icons/loading.svg" alt="loading" className="mx-auto size-10 animate-spin" />
          <p className="mt-4 text-gray-600 text-sm">Restoring your session...</p>
        </div>
      </div>
    );
  }

  console.log("[App Init] Firebase user:", firebaseUser?.email || "No user");
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
