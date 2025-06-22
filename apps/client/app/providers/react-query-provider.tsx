import {
  QueryClient,
  QueryClientProvider,
  defaultShouldDehydrateQuery,
} from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { ReactNode } from "react";

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,
      },
      mutations: {
        retry: 1,
      },
      dehydrate: {
        shouldDehydrateQuery: defaultShouldDehydrateQuery,
      },
    },
  });

let clientQueryClientSingleton: QueryClient | undefined = undefined;
const getQueryClient = () => {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return createQueryClient();
  }

  // Browser: use singleton pattern to keep the same query client
  clientQueryClientSingleton ??= createQueryClient();

  return clientQueryClientSingleton;
};

/**
 * ReactQueryProvider is a wrapper component that provides the React Query context to its children.
 * @param children - The children components to be wrapped by the provider.
 * @returns The wrapped children components.
 */
export const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      {/* {import.meta.env.DEV && (
				// https://vite.dev/guide/env-and-mode#built-in-constants
				<ReactQueryDevtools initialIsOpen={false} />
			)} */}
    </QueryClientProvider>
  );
};

/**
 * Server-side query client factory for SSR data prefetching
 * @returns The created server query client.
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
