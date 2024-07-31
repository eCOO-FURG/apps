"use server";

import axios from "axios";

export interface Farm {
  id: string
  name: string
  caf: string
  active: boolean
  admin_id: string
  tax: number
  created_at: string
  updated_at: string
}

export async function fetchFarms(cycle_id: string | undefined, page: number = 1, product: string = "") {

  if(!cycle_id) return [];
  
  const response = await axios.get(
    `${process.env.API_URL}/offers?cycle_id=${cycle_id}&product=${product}&page=${page}`,
  )

  if(!response?.data){
    return []
  }

  return response.data as Farm[];
}
