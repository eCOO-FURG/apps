"use server"

import axios from "axios";
import { cookies } from "next/headers";

export interface BagOrder {
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
  created_at: string; 
  updated_at: string | null;
  orders: {
    id: string;
    bag_id: string;
    status: string;
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
        pricing: string;
        image: string;
        created_at: Date; 
        updated_at: Date | null;
      };
    };
  }[];
}

interface FetchBagRequest {
  bag_id: string
}

export async function fetchBag({ bag_id }: FetchBagRequest) {
  const token = cookies().get("token")?.value as string;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const data = await axios.get(
    `${process.env.API_URL}/bags/${bag_id}`,
    config
  );

  return data.data as BagOrder;
}