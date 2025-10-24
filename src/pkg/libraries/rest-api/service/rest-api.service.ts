import {
  defaultShouldDehydrateQuery,
  isServer,
  keepPreviousData,
  QueryClient,
} from "@tanstack/react-query";

let browserQueryClient: QueryClient | undefined = undefined;
let serverQueryClient: QueryClient | undefined = undefined;

// make query client
const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
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

// query client
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
