"use client";

import { useOrders } from "@/app/entities/api/orders";
import { Order } from "@/app/entities/models";
import { HeroTable } from "@/app/features";
import { LoadingIndicator } from "@/app/shared/ui";

interface DashboardModuleProps {
  initialData?: {
    orders: Order[];
    totalOrders: number;
  };
}

const columns = ["ID", "Name", "Total", "Created At"];

export function DashboardModule({}: DashboardModuleProps) {
  const { data: ordersResponse, isLoading, error } = useOrders();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingIndicator />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-red-500">
          Error loading orders: {error.message}
        </div>
      </div>
    );
  }

  const orders = ordersResponse?.data || [];
  const totalOrders = orders.length;

  const tableData = orders.map((order) => ({
    ID: order.id.toString(),
    Name: order.name,
    Total: `$${order.total}`,
    "Created At": new Date(order.created_at).toLocaleDateString(),
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Orders Dashboard</h1>
      <p className="text-gray-600 mb-4">
        Only authenticated users can access this page
      </p>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-center text-slate-800">
            Orders ({totalOrders})
          </h2>
        </div>
        <HeroTable columns={columns} data={tableData} />
      </div>
    </div>
  );
}
