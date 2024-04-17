import { useState } from "react";
import Constants from "expo-constants";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import superjson from "superjson";
import { AppRouter } from "../../../backend/src/main";

export const api = createTRPCReact<AppRouter>();

const getBaseUrl = () => {
  const debuggerHost = Constants.expoConfig?.hostUri;
  const ip = debuggerHost?.split(":")[0];

  if (!ip) {
    throw new Error(
      "Failed to get ip. Please point to your production server."
    );
  }
  return `http://${ip}:8080`;
};

/**
 * A wrapper for your app that provides the TRPC context.
 * Use only in _app.tsx
 */
export function TRPCProvider(props: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
          colorMode: "ansi",
        }),
        httpBatchLink({
          transformer: superjson,
          url: getBaseUrl(),
          headers() {
            const headers = new Map<string, string>();
            headers.set("x-trpc-source", "expo-react");
            return Object.fromEntries(headers);
          },
        }),
      ],
    })
  );

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </api.Provider>
  );
}
