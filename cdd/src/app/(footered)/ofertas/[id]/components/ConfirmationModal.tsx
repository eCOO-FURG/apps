import React, { ReactNode } from "react";
import Modal from "@cdd/components/Modal";

interface ConfirmationModalProps {
  openButton: ReactNode;
  link: string;
}

export default function ConfirmationModal({
  openButton,
  link,
}: ConfirmationModalProps) {
  return (
    <Modal
      openButton={openButton}
      title="Você tem certeza?"
      description="Após aprovar a entrega essa operação não poderá ser desfeita. Em
        caso de erro, entre em contato com o suporte."
      approvalButtons={true}
      textButton1="Cancelar"
      textButton2="Aprovar"
      bgButton2="#00735E"
      link2={link}
    />
  );
}
