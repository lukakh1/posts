import { ApiResponse } from "@/app/shared/types";
import { getQueryClient } from "@/pkg/libraries/rest-api";
import { IqTest } from "../../models";
import { getIqTests } from "./iq-test.api";

export async function fetchIqTests(): Promise<IqTest[]> {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery<ApiResponse<IqTest[]>>({
    queryKey: ["iq-tests"],
    queryFn: () => getIqTests(),
    staleTime: 60_000,
  });
  const cached = queryClient.getQueryData<ApiResponse<IqTest[]>>(["iq-tests"]);
  return cached?.data ?? [];
}

