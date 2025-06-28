"use client";

import {
  QueryClient,
  QueryClientProvider,
  defaultShouldDehydrateQuery,
} from "@tanstack/react-query";
import SuperJSON from "superjson";
import type { ReactNode } from "react";

/**
 * Creates a new TanStack Query client with default options for client-side usage.
 * Includes configuration for staleTime, SuperJSON serialization/deserialization,
 * and handling of pending queries during dehydration.
 * @returns {QueryClient} A new TanStack Query client instance.
 */
const createQueryClient = (): QueryClient =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 30 * 1000,
      },
      dehydrate: {
        serializeData: SuperJSON.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
      hydrate: {
        deserializeData: SuperJSON.deserialize,
      },
    },
  });

let clientQueryClientSingleton: QueryClient | undefined;
/**
 * Returns a singleton instance of the TanStack Query client for the browser,
 * or a new instance for the server to prevent shared state issues during SSR.
 * @returns {QueryClient} The TanStack Query client instance.
 */
const getQueryClient = (): QueryClient => {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return createQueryClient();
  }
  // Browser: use singleton pattern to keep the same query client
  clientQueryClientSingleton ??= createQueryClient();

  return clientQueryClientSingleton;
};

/**
 * A React component that provides the TanStack Query client to its children.
 * It ensures the correct client instance (singleton for browser, new for server) is used.
 * @param {object} props - The component props.
 * @param {ReactNode} props.children - The child components to be wrapped.
 */
export function ReactQueryProvider({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
