"use server"

import ApiService from "@shared/service/index";

export async function getUserFarm() {
  const response = ApiService.GET({
    url: '/me/farm',
  });

  return response;
}