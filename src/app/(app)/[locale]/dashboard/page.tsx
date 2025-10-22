import { getOrders } from "@/app/entities/api/orders";
import { DashboardModule, getDashboardData } from "@/app/modules";
import { getQueryClient } from "@/pkg/libraries/rest-api";

export default async function Page() {
  const queryClient = getQueryClient();

  // Prefetch orders data on the server
  await queryClient.prefetchQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const result = await getOrders();
      if (!result.success) {
        throw new Error(result.error ?? "Failed to fetch orders");
      }
      return result;
    },
  });

  const dashboardData = await getDashboardData();

  return <DashboardModule initialData={dashboardData.data} />;
}
