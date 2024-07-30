import React, { ReactNode } from "react";
import Modal from "@cdd/components/Modal";

interface ConfirmationModalProps {
  openButton: ReactNode;
}

export default function ConfirmationModal({
  openButton,
}: ConfirmationModalProps) {
  return (
    <div className="flex-1">
      <Modal
        openButton={openButton}
        title="Você tem certeza?"
        description="Após rejeitar a entrega essa operação não poderá ser desfeita. Em caso de erro, entre em contato com o suporte."
        approvalButtons={true}
        textButton1="Cancelar"
        textButton2="Rejeitar"
        bgButton2="#FF7070"
        link2=""
      />
    </div>
  );
}
