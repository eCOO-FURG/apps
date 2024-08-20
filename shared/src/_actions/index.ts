import { USE_CASES } from "@shared/domain/use-cases";

import {
  registerActions,
  type ActionHandler as ActionHandlerWithoutCases,
} from "@shared/next/Action";

import { registerAgribusiness } from "./register-agribusiness/handler";
import { createAccount } from "./account/create-account/handler";
import { getAccount } from "./account/get-account/handler";
import { getPrivate } from "./account/get-private/handler";
import { loginAgribusiness } from "./account/login-agribusiness/handler";
import { loginCDD } from "./account/login-cdd/handler";
import { listOrders } from "./orders/list-orders/handler";
import { viewOrder } from "./orders/view-order/handler";
import { updateOrderStatus } from "./orders/update-order-status/handler";
import { getCycles } from "./cycles/handler";

export type ActionHandler<T, U> = ActionHandlerWithoutCases<
  T,
  U,
  typeof USE_CASES
>;

export const ACTIONS = registerActions({
  handlers: {
    "create-account": createAccount,
    "get-account": getAccount,
    "get-private": getPrivate,
    "get-cycles": getCycles,
    "login-agribusiness": loginAgribusiness,
    "login-cdd": loginCDD,
    "register-agribusiness": registerAgribusiness,
    "list-orders": listOrders,
    "view-order": viewOrder,
    "update-order-status": updateOrderStatus,
  },
  useCases: USE_CASES,
});
