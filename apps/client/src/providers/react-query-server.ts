import {
  QueryClient,
  defaultShouldDehydrateQuery,
} from "@tanstack/react-query";

/**
 * Server-side query client factory for SSR data prefetching
 */
export const createServerQueryClient = () => {
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
