import { IqTestModule, prefetchIqTestData } from "@/app/modules";
import { getQueryClient } from "@/pkg/libraries/rest-api";

export const revalidate = 30;
export const dynamic = "force-static";

export default async function IqTestPage() {
  const queryClient = getQueryClient();

  await prefetchIqTestData(queryClient);

  return <IqTestModule />;
}
