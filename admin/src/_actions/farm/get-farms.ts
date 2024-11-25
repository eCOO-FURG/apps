"use server";

import ApiService from "@shared/service/index";

interface GetFarmOrdersRequest {
  page: number;
  farm?: string;
}

export async function getFarms({ 
  page,
  farm = "",
}: GetFarmOrdersRequest) {
  const response = ApiService.GET({
    url: `/farms?page=${page}&farm=${farm}`,
  });

  return response;
}
