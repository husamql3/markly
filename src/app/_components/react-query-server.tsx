import {
  QueryClient,
  defaultShouldDehydrateQuery,
} from "@tanstack/react-query";

/**
 * Creates a new TanStack Query client instance specifically for server-side rendering (SSR) data prefetching.
 * It uses different default options optimized for server environments, such as longer staleTime and gcTime.
 * @returns {QueryClient} The server-side TanStack Query client instance.
 */
export const createServerQueryClient = (): QueryClient => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        gcTime: 5 * 60 * 1000,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
    },
  });
};
