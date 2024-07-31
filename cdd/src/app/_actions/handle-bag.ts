"use server"

import axios from "axios";
import { cookies } from "next/headers";

interface ListBagsRequest {
  bag_id: string
  status: "PENDING" | "SEPARATED" | "DISPATCHED";
}

export async function handleBag({ bag_id, status }: ListBagsRequest) {
  const token = cookies().get("token")?.value as string;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const data = await axios.patch(
    `${process.env.API_URL}/bags/${bag_id}`,
    { status },
    config
  );

  return data.data;
}
