"use server";

import { cookies } from "next/headers";

interface PrintDeliveriesReportRequest {
  cycle_id?: string;
  withdraw?: boolean;
  offers?: boolean;
}

export async function printDeliveriesReport({
  cycle_id,
  withdraw,
  offers,
}: PrintDeliveriesReportRequest) {
  const token = cookies().get("cdd_token");

  if (!token) {
    return "Erro";
  }

  try {
    if (typeof withdraw !== "undefined" && typeof offers !== "undefined") {
      return { message: "Não é possível usar 'withdraw' e 'offers' ao mesmo tempo." };
    }

    const queryParams = new URLSearchParams();

    if (cycle_id) {
      queryParams.append("cycle_id", cycle_id);
    }
    
    if (typeof withdraw !== "undefined") {
      queryParams.append("withdraw", withdraw ? "true" : "false");
    }

    if (typeof offers !== "undefined") {
      queryParams.append("offers", offers ? "true" : "false");
    }

    const response = await fetch(
      `${process.env.API_URL}/reports?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.value}`,
          Accept: "application/pdf",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      return response.json();
    }

    const data = await response.arrayBuffer();

    return data;
  } catch (error) {
    return {
      message: "Erro desconhecido.",
    };
  }
}
