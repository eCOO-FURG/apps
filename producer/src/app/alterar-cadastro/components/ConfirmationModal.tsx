import React, { ReactNode } from "react";
import Modal from "./Modal";

interface ConfirmationModalProps {
  info:{
    first_name: string;
    last_name: string;
    phone: string;
    password: string
  }
  openButton: ReactNode;
  link: string;
}

export default function ConfirmationModal({
  info,
  openButton,
  link,
}: ConfirmationModalProps) {
  return (
    <Modal
      info={info}
      openButton={openButton}
      title="Você tem certeza?"
      description="Confirme seus dados, após clicar em salvar eles serão atualizados."
      approvalButtons={true}
      textButton1="Cancelar"  
      textButton2="Confirmar"
      bgButton2="#ffffff"
      // #00735E
      link2={link}
    />
  );
}