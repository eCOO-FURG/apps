"use client";

import Button from "@shared/components/Button";
import Input from "@shared/components/Input";
import { toast } from "sonner";
import { ModelPage } from "@shared/components/ModelPage";
import pageSettings from "./page-settings";

interface InputValidDateProps {
  handleNextStep: () => void;
  expires_at?: Date;
  setExpiresAt?: (expires_at: Date) => void; 
}

export default function InputValidDate({
  handleNextStep,
  expires_at,
  setExpiresAt,
}: InputValidDateProps) {
  const { title, subtitle } = pageSettings.expirationDate;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!expires_at) {
      toast.error("A data de validade não é válida. Por favor, insira uma data válida."
      );
      return;
    }

    handleNextStep();
  };

  return (
    <ModelPage
      title={title}
      titleGap="gap-5"
      titleClassName="px-3"
      subtitleClassName="px-4"
      subtitle={subtitle}
      buttonArea={
        <Button
          className="w-full h-12 bg-theme-default rounded-md text-white font-semibold text-base leading-5.5"
          type="submit"
          onClick={handleSubmit}
          title="Continuar"
        >
          Continuar
        </Button>
      }
    >
      <div className="w-full h-full flex flex-col items-stretch justify-start pt-5">
          <Input
            onChange={(e) => {
              if (setExpiresAt && e.target.valueAsDate) {
                const date = e.target.valueAsDate;
                date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
                
                if (date < new Date()) {
                  toast.error("A data não pode estar no passado. Por favor, insira uma data válida.");
                  return;
                }

              setExpiresAt(date);
              }
            }}
            className="text-theme-primary text-sm"
            type="date"
            value={expires_at}
            label="Data de validade"
          />
      </div>
    </ModelPage>
  );
}
