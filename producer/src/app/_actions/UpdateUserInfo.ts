"use server"

import axios from "axios";
import { cookies } from "next/headers";

interface UpdateUserRequest {
  first_name?: string;
  last_name?: string;
  email?: string;
  // cpf?: string;
  phone?: string;
  password?: string;
}

export async function updateUser({
  first_name,
  last_name,
  email,
  // cpf,
  phone,
  password
}: UpdateUserRequest) {
  const token = cookies().get("token")?.value as string;

  const config = {
    headers: { Authorization: `Bearer ${token}`},
  };

  const body = {
    first_name,
    last_name,
    email,
    // cpf,
    phone,
    password,
  };

  try {
    const response = await axios.patch(
      `${process.env.API_URL}/users`,
      body,
      config,
    );

    return {
      data: response.data
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const apiErrorMessage = error.response?.data?.message || 'Erro desconhecido';

      return {
        message: apiErrorMessage
      }
    } else {
      console.error('Erro desconhecido:', error);

      return {
        message: `Erro desconhecido ${error}`
      }
    }
  }
}