"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { UUID } from "node:crypto";

export interface Farm {
  id: string;
  name: string;
  caf: string;
  active: boolean;
  admin_id: UUID;
  tax: number;
}

interface FecthFarmsWithOrdersRequest {
  cycle_id: string
  page: number
  name?: string
}

export async function fecthFarmsWithOrders({ cycle_id, page, name }: FecthFarmsWithOrdersRequest) {
  const token = cookies().get("token")?.value as string;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const data = await axios.get(
    `${process.env.API_URL}/orders?cycle_id=${cycle_id}&page=${page}&name=${name}`,
    config
  );

  return data.data as Farm[];
}
