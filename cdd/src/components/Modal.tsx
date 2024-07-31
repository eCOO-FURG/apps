"use client";
import { ReactNode, useState } from "react";
import { Dialog } from "@headlessui/react";
import Link from "next/link";

export interface StatusContent {
  subtitle: string;
  buttonTitle: string;
  buttonColor: string;
  modalLink: string;
  modalComponent: any;
  modalDescription: string;
  updateStatus: string;
}

interface ModalProps {
  openButton: ReactNode;
  title: string;
  description: string;
  approvalButtons: boolean;
  textButton1: string;
  textButton2: string;
  bgButton2: string;
  onClick?: () => void;
}

export default function Modal({
  openButton,
  title,
  description,
  approvalButtons,
  textButton1,
  textButton2,
  bgButton2,
  onClick,
}: ModalProps) {
  let [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleButtonClick = () => {
    closeModal();
    if (onClick) onClick();
  };

  return (
    <>
      <div
        className={`cursor-pointer w-full px-4 py-3 flex justify-center items-center bg-[${bgButton2}] rounded-md text-white font-semibold font-inter text-[15.67px]`}
        aria-label="Abrir Modal"
        onClick={openModal}
      >
        {openButton}
      </div>
      <Dialog
        as="div"
        open={isOpen}
        onClose={closeModal}
        className="fixed inset-10 h-fit overflow-y-auto text-center"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div
          className="fixed grid place-items-center inset-0"
          aria-hidden="true"
        >
          <Dialog.Panel className="bg-white z-10 rounded-3xl w-[83.35%] max-w-[300px] min-h-[300px] flex flex-col justify-between align-center px-4 py-7">
            <Dialog.Title>
              <div
                className={`font-semibold text-2xl mt-5 leading-5 max-h-[25px] text-[20px] text-slate-gray
                font-poppins
                `}
              >
                {title}
              </div>
            </Dialog.Title>
            <Dialog.Description className="text-theme-primary text-[15.67px] max-w-[241px] min-h-[100px] font-normal font-inter leading-5 overflow-y-auto self-center">
              {description}
            </Dialog.Description>
            {approvalButtons && (
              <div className="gap-2 h-[41.14px] flex flex-row justify-stretch items-center w-full font-inter font-semibold text-[15.67px]">
                <button
                  onClick={closeModal}
                  className="w-[50%] h-[inherit] bg-[#EEF1F4] text-[#455154] rounded-md"
                >
                  {textButton1}
                </button>

                <button
                  onClick={handleButtonClick}
                  className={`w-[50%] h-[inherit] bg-[${bgButton2}] rounded-md text-white`}
                >
                  {textButton2}
                </button>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
