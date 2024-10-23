"use client"

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";

import { registerFarm } from "@producer/app/_actions/account/register-farm";

import Loader from "@shared/components/Loader";
import ButtonV2 from "@shared/components/ButtonV2";
import CustomInput from "@shared/components/CustomInput";
import { useHandleError } from "@shared/hooks/useHandleError"
import { useLocalStorage } from "@shared/hooks/useLocalStorage"
import { FifthStepRegisterSchema } from "@shared/types/register";
import { fifthStepRegisterSchema } from "@shared/schemas/register";

import { toast } from "sonner";
import Link from "next/link";

export default function FifthStep() {
  const [isPending, starTransition] = useTransition();

  const router = useRouter();

  const { handleError } = useHandleError();
  const { deleteFromStorage } = useLocalStorage();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<FifthStepRegisterSchema>({
    resolver: zodResolver(fifthStepRegisterSchema),
    mode: "onChange",
    defaultValues: {
      name: '',
      caf: ''
    }
  });

  const submit = async ({ name, caf }: FifthStepRegisterSchema) => {
    starTransition(async () => {
      const isValid = await trigger();

      if (!isValid) {
        return;
      }

      registerFarm({ name, caf })
        .then((response) => {
          if (response.message) {
            handleError(response.message);
          }

          deleteFromStorage('register-form-data')
          deleteFromStorage('register-current-step')
          router.push('/')
        })
        .catch(() => {
          toast.error("Erro desconhecido.")
        })
    })
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="w-full h-full flex flex-col justify-between mb-2 mt-6">
      <div className="w-full flex flex-col gap-6 mb-3">
        <CustomInput
          register={register('name')}
          label="Nome do seu negócio"
          placeholder="Nome do seu negócio"
          type="text"
          errorMessage={errors.name?.message}
        />
        <CustomInput
          register={register('caf')}
          label="Talão"
          placeholder="Insira o número do talão"
          type="text"
          errorMessage={errors.caf?.message}
          mask="caf"
        />
      </div>
      <div className="w-full flex flex-col gap-3 mb-3">
        <ButtonV2
          type="submit"
          variant="default"
          className="h-12 flex justify-center items-center"
        >
          {isPending ? (<Loader loaderType="login" />) : "Finalizar cadastro"}
        </ButtonV2>
        <Link href={'/inicio'}>
          <ButtonV2
            type="submit"
            variant="transparent"
            border={true}
            className="h-12 flex justify-center items-center mt-0"
            onClick={() => {
              deleteFromStorage('register-form-data')
              deleteFromStorage('register-current-step')
            }}  
          >
            Tela inicial
          </ButtonV2>
        </Link>
      </div>
    </form>
  )
}
