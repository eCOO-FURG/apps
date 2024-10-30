import { FarmStatus } from "../types/farm";
import { ICatalog } from "./catalog";
import { IOrder } from "./order";
import { IAdmin } from "./user";

export interface IBoxes {
  id: string;
  status: "PENDING" | "CANCELLED" | "VERIFIED";
  catalog: ICatalog;
  created_at: Date;
  updated_at: Date | null;
}

export interface IFarm {
  id: string;
  name: string;
  caf: string;
  status: FarmStatus;
  tax: number;
  admin: IAdmin;
  created_at: Date;
  updated_at: Date | null;
}

export interface IFarmOrders {
  id: string;
  status: "PENDING" | "CANCELLED" | "VERIFIED";
  catalog: ICatalog;
  created_at: Date;
  updated_at: Date | null;
  orders: IOrder[];
}
