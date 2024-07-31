import React, { ReactNode } from "react";
import Modal from "@cdd/components/Modal";

interface ApproveBagModalProps {
  openButton: ReactNode;
  link: string | null;
  button2?: ReactNode;
  description: string;
}

export default function ApproveBagModal({
  openButton,
  link,
  button2,
  description,
}: ApproveBagModalProps) {
  return (
    <Modal
      openButton={openButton}
      title="Você tem certeza?"
      description={description}
      approvalButtons={true}
      textButton1="Cancelar"
      textButton2="Confirmar"
      bgButton2="#00735E"
    />
  );
}
