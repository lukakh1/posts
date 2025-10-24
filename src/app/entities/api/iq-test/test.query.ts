import { queryOptions } from "@tanstack/react-query";
import { IqTest } from "../../models";
import { getIqTests } from "./iq-test.api";

export const iqTestsQueryOptions = () =>
  queryOptions({
    queryKey: ["iq-tests"],
    queryFn: async (): Promise<IqTest[]> => {
      const response = await getIqTests();
      if (!response.success) {
        throw new Error(response.error ?? "Failed to fetch IQ tests");
      }
      return response.data ?? [];
    },
    staleTime: 30_000,
    gcTime: 60_000,
  });
