"use server";

import axios from "axios";


export interface Product {
  id: string
  image: string
  name: string
  pricing: "UNIT" | "WEIGHT"
  created_at: string
  updated_at: string
}

export interface Offer {
  id: string
  farm_id: string
  cycle_id: string
  price: number
  amount: number
  product: Product
  description: string
  created_at: string
  updated_at: string
}

export interface FarmOffers {
  id: string
  name: string
  caf: string
  tax: number
  admin_id: string
  active: boolean
  offers: Offer[]
  created_at: string
  updated_at: string
}



export async function fetchOffersFarm(farm_id: string | undefined, cycle_id: string | undefined, page: number = 1, product: string = "") {

  if (!cycle_id) 
    return null;

  const response = await axios.get(
    `${process.env.API_URL}/offers/${farm_id}?cycle_id=${cycle_id}&product=${product}&page=${page}`,
  ).catch((error) => {
    console.error("error")
    console.error(error)
  });

  if (!response?.data) {
    return null
  }


  return response.data as FarmOffers | null;
}
