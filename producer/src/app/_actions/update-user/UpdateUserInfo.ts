"use server"

import axios from "axios";
import { cookies } from "next/headers";

interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  password?: string; 
  email?: string;
  cpf?: string;
}

export async function updateUser({ 
  firstName, 
  lastName, 
  phone, 
  password, 
  email, 
  cpf 
}: UpdateUserRequest) {
  const token = cookies().get("token")?.value;

  if (token) {
    try {
      const response = await fetch(`${process.env.API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ firstName, lastName, phone, password, email, cpf }),
      });

      const reply = await response.json();

      return {
        reply,
      };
    } catch (error: any) {
      console.error(error);
    }
  }
}