import React, { ReactNode } from "react";
import Modal from "@cdd/components/Modal";

interface RejectBagModalProps {
  openButton: ReactNode;
  link: string | null;
  button2?: ReactNode;
  description: string;
}

export default function RejectBagModal({
  openButton,
  link,
  button2,
  description,
}: RejectBagModalProps) {
  return (
    <Modal
      openButton={openButton}
      title="Você tem certeza?"
      description={description}
      approvalButtons={true}
      textButton1="Cancelar"
      textButton2="Alterar"
      bgButton2="#FF7070"
    />
  );
}
