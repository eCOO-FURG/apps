import { User } from "@shared/domain/entities/user";

export type GenericStatusCodes = 400 | 403 | 409;

export type EcooAPIRouteParams = {
  registerUser: [
    user_data: {
      email: string;
      phone: string;
      first_name: string;
      last_name: string;
      password: string;
      cpf: string;
    }
  ];
  authenticateUser: [user_data: { email: string; password: string }];
  getProducts: [access_token: string];
  getUser: [access_token: string];
  getPrivate: [access_token: string];
  getCycles: [access_token: string];
  registerAgribusiness: [
    agribusiness_data: { caf: string; name: string },
    access_token: string
  ];
  listOrders: [
    access_token: string,
    cycle_id: string,
    page: number,
    status: string
  ];
  viewOrder: [access_token: string, order_id: string];
  updateOrderStatus: [access_token: string, order_id: string, status: string];
};

export interface IEcooAPI {
  registerUser: (
    ...params: EcooAPIRouteParams["registerUser"]
  ) => Promise<{ status: 201; data: EcooAPIRouteParams["registerUser"][0] }>;
  authenticateUser: (
    ...params: EcooAPIRouteParams["authenticateUser"]
  ) => Promise<{ status: 200; data: { token: string } }>;
  getUser: (...params: EcooAPIRouteParams["getUser"]) => Promise<{
    status: 200;
    data: {
      first_name: User["first_name"];
      last_name: User["last_name"];
      email: User["email"];
      roles: User["roles"];
    };
  }>;
  getPrivate: (...params: EcooAPIRouteParams["getPrivate"]) => Promise<{
    status: 200;
    data: User["private"];
  }>;
  getCycles: (...params: EcooAPIRouteParams["getCycles"]) => Promise<{
    status: 200;
    data: any[];
  }>;
  getProducts: (
    ...params: EcooAPIRouteParams["getProducts"]
  ) => Promise<{ status: 200; data: unknown[] }>;
  registerAgribusiness: (
    ...params: EcooAPIRouteParams["registerAgribusiness"]
  ) => Promise<{ status: 201; data: any }>;
  listOrders: (
    ...params: EcooAPIRouteParams["listOrders"]
  ) => Promise<{ status: 200; data: any }>;
  viewOrder: (
    ...params: EcooAPIRouteParams["viewOrder"]
  ) => Promise<{ status: 200; data: any }>;
  updateOrderStatus: (
    ...params: EcooAPIRouteParams["updateOrderStatus"]
  ) => Promise<{ status: 200; data: any }>;
}
