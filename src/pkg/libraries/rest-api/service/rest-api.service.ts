import {
  defaultShouldDehydrateQuery,
  isServer,
  keepPreviousData,
  QueryClient,
} from "@tanstack/react-query";

let browserQueryClient: QueryClient | undefined = undefined;
let serverQueryClient: QueryClient | undefined = undefined;

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        gcTime: 60_000,
        networkMode: "offlineFirst",
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) => {
          return (
            defaultShouldDehydrateQuery(query) ||
            query.state.status === "pending"
          );
        },
      },
    },
  });
};

export const getQueryClient = () => {
  if (isServer) {
    if (!serverQueryClient) {
      serverQueryClient = makeQueryClient();
    }
    return serverQueryClient;
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
};
