"use server"

import axios from "axios";
import { cookies } from "next/headers";

export interface Bag {
  id: string;
  status: string;
  cycle_id: string;
  address: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    roles: string[];
    verified_at: Date;
    created_at: Date;
    updated_at: Date | null;
  };
  created_at: Date;
  updated_at: Date | null;
}

interface ListBagsRequest {
  page: number;
  cycle_id: string;
  status: "PENDING" | "SEPARATED" | "DISPATCHED";
  name?: string;
}

export async function listBags({ page, cycle_id, status, name }: ListBagsRequest) {
  const token = cookies().get("token")?.value as string;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const data = await axios.get(
    `${process.env.API_URL}/bags?page=${page}&cycle_id=${cycle_id}&status=${status}${name ? `&name=${name}` : ''}`,
    config
  );

  return data.data as Bag[];
}
