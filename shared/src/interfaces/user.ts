export interface UserDTO {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  roles: string[];
  verified_at: string;
  created_at: Date;
  updated_at: Date | null;
  password?: string;
  confirmPassword?: string;
}

export interface IUserUpdate {
  first_name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface ProducerDTO {
  id: string;
  name: string;
  status: "ACTIVE" | "PENDING" | "INACTIVE";
  tally: string;
  tax: number;
  description: string | null;
  admin: AdminDTO;
  created_at: Date;
  updated_at: Date | null;
}

type AdminDTO = {
  id: string;
  first_name: string;
  last_name: string;
  cpf: string;
  email: string;
  phone: string;
  photo: string;
  created_at: string;
  updated_at: string | null;
};