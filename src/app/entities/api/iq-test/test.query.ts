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
    staleTime: 5 * 60 * 1000, // 5 minutes - align with server cache
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
