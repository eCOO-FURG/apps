"use server"

import axios from "axios";
import { cookies } from "next/headers";

interface HandleOrderDeliveryRequest {
  cycle_id: string;
  farm_id: string
  status: "RECEIVED" | "CANCELLED";
}

export async function handleOrderDelivery({ cycle_id, farm_id, status }: HandleOrderDeliveryRequest){
  const token = cookies().get("token")?.value as string;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const data = await axios.patch(
    `${process.env.API_URL}/orders`,
    { cycle_id, farm_id, status },
    config
  );

  return data.data;
}