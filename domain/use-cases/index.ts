import { registerUseCases } from "@shared/core/UseCase";
import { inMemoryStubStore } from "@shared/interfaces/inMemoryStubStore";
import { nextCookiesStubStore } from "@shared/next/nextCookiesStubStore";

import { createAccount } from "./create-user";
import { getUser } from "./get-user";
import { login } from "./login";
import { registerAgribusiness } from "./register-agribusiness";

const HANDLERS = {
  "create-user": createAccount,
  "get-user": getUser,
  login: login,
  "register-agribusiness": registerAgribusiness,
}

const defineStubbedCases = (): Record<string, boolean> => {
  const stubbedCases: Record<string, boolean> = Object.fromEntries(
    Object.keys(HANDLERS).map(key => [key, false])
  );

  if(process.env.STUBBED_USE_CASES) {
    const keyValuePairs = process.env.STUBBED_USE_CASES.split(',');
    
    keyValuePairs.forEach(pair => {
      const [key, value] = pair.split('=');
      if(value === 'true') stubbedCases[key] = true;
    });
  }

  return stubbedCases
}

export const USE_CASES = registerUseCases({
  handlers: HANDLERS,
  stubbedCases: defineStubbedCases(),
  stubStore:
    process.env.NODE_ENV === "development"
      ? nextCookiesStubStore
      : inMemoryStubStore,
});
