"use server";

import { AppID } from "../../library/types/app-id";
import ApiService from "../../service/index";
import { SetTokenCookie } from "../../utils/set-token-cookie";

interface LoginRequest {
  email: string;
  password: string;
  appID: AppID;
}

export async function login({ email, password, appID }: LoginRequest) {
  const data = {
    email,
    password,
    type: "BASIC",
  };

  const response = await ApiService.POST({
    url: "/auth",
    data,
  });

  const messageError = response.message;
  const reply = response.data;

  if (messageError) {
    return {
      message: messageError,
    };
  }

  const roles = reply.user.roles;
  const { token } = reply;

  const appValidation = {
    CDD: {
      allowedRoles: ["ADMIN"],
      errorMessage:
        "Você está tentando acessar um app apenas para administradores!",
      redirect: "/telegram",
    },
    PRODUCER: {
      allowedRoles: ["PRODUCER", "ADMIN"],
      errorMessage:
        "Você está tentando acessar um app apenas para administradores ou produtores!",
      redirect: "/telegram",
    },
    CONSUMER: {
      allowedRoles: ["USER", "ADMIN", "PRODUCER"],
      errorMessage:
        "Você está tentando acessar um app apenas para administradores ou consumidores!",
      redirect: "#",
    },
  };

  const validation = appValidation[appID];

  if (
    validation &&
    !roles.some((role: string) => validation.allowedRoles.includes(role))
  ) {
    return {
      message: validation.errorMessage,
      redirect: validation.redirect,
    };
  }

  SetTokenCookie({
    token,
    appID,
  });
  return reply;
}
