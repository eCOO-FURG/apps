import { ReactNode } from 'react';

export interface ConfirmationModalProps {
  info:{
    firstName: string;
    lastName: string;
    phone: string;
    password: string;
    email: string;
    cpf: string;
  }
  openButton: ReactNode;
  link: string;
}