import { ReactNode, useState } from "react";

export interface ModalProps {
  info:{
    firstName: string;
    lastName: string;
    phone: string;
    password: string;
    email: string;
    cpf: string;
  }
  openButton: ReactNode;
  title: string;
  description: string;
  approvalButtons: boolean;
  textButton1: string;
  textButton2: string;
  bgButton2: string;
  link2: string;
  button2?: ReactNode;
}