"use server";

import axios from "axios";
import { cookies } from "next/headers";

export interface FarmOrders {
  id: string;
  name: string;
  caf: string;
  active: boolean;
  admin_id: string;
  tax: number;
  created_at: Date;
  updated_at: Date | null;
  orders: {
    id: string;
    bag_id: string;
    amount: number;
    status: "PENDING" | "SEPARATED" | "DISPATCHED";
    created_at: Date;
    updated_at: Date | null;
    offer: {
      id: string;
      farm_id: string;
      cycle_id: string;
      price: number;
      amount: number;
      description: string | null;
      created_at: Date;
      updated_at: Date | null;
      product: {
        id: string;
        name: string;
        pricing: "UNIT" | "WEIGHT";
        image: string;
        created_at: Date;
        updated_at: Date | null;
      };
    };
  }[];
}

interface FetchFarmOrdersRequest {
  farm_id: string;
  cycle_id: string;
}

export async function fetchFarmOrders({
  farm_id,
  cycle_id,
}: FetchFarmOrdersRequest): Promise<FarmOrders> {
  const token = cookies().get("token")?.value as string;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const data = await axios.get(
    `${process.env.API_URL}/orders/${farm_id}?cycle_id=${cycle_id}`,
    config
  );

  return data.data as FarmOrders;
}
