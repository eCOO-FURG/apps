"use client"

import Link from "next/link"
import { toast } from "sonner"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"

import { registerAccount } from "@producer/app/_actions/account/register-account"

import { secondStepRegisterSchema } from "@shared/schemas/register"
import CustomInput from "@shared/components/CustomInput"
import Loader from "@shared/components/Loader"
import ButtonV2 from "@shared/components/ButtonV2"
import { useHandleError } from "@shared/hooks/useHandleError"
import { useLocalStorage } from "@shared/hooks/useLocalStorage"
import { SecondStepRegisterSchema } from "@shared/types/register"

export default function SecondStep() {
  const [isPending, starTransition] = useTransition()
  const router = useRouter();

  const { getFromStorage, setInStorage, deleteFromStorage } = useLocalStorage();
  const { handleError } = useHandleError();

  const savedData = getFromStorage("register-form-data")

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger
  } = useForm<SecondStepRegisterSchema>({
    resolver: zodResolver(secondStepRegisterSchema),
    mode: "onChange",
    defaultValues: {
      cpf: savedData?.cpf,
      phone: savedData?.phone,
      password: savedData?.password,
      confirmPassword: savedData?.confirmPassword
    }
  })

  const submit = ({ cpf, phone, password }: SecondStepRegisterSchema) => {
    starTransition(async () => {
      const savedData = getFromStorage("register-form-data");

      if (!savedData) toast.error("Erro ao buscar os dados do localStorage")

      setInStorage('register-form-data', {
        ...savedData,
        cpf,
        phone,
        password
      })

      const { firstName, lastName, email, role } = savedData

      const isValid = await trigger();

      if (!isValid) return;

      registerAccount({
        firstName,
        lastName,
        email,
        cpf,
        phone,
        password,
        role
      })
        .then((response) => {
          if (response.message) {
            handleError(response.message);
            return;
          }
          setInStorage("register-current-step", 3)
          deleteFromStorage("register-form-data")
          router.push("/cadastrar/3")
        })
        .catch(() => {
          toast.error("Erro desconhecido.")
        })
    })
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="w-full h-full flex flex-col justify-between mb-2 mt-1.5">
      <div className="w-full flex flex-col gap-6 mb-3">
        <CustomInput
          register={register('cpf')}
          label="CPF"
          placeholder="Insira o seu CPF"
          type="text"
          errorMessage={errors.cpf?.message}
          mask="cpf"
        />
        <CustomInput
          register={register('phone')}
          label="Celular"
          placeholder="Insira o seu celular"
          type="text"
          errorMessage={errors.phone?.message}
          mask="phone"
        />
        <CustomInput
          register={register('password')}
          label="Senha"
          placeholder="Insira a sua senha"
          type="password"
          errorMessage={errors.password?.message}
        />
        <CustomInput
          register={register('confirmPassword')}
          label="Confirmar senha"
          placeholder="Confirme a sua senha"
          type="password"
          errorMessage={errors.confirmPassword?.message}
        />
      </div>
      <div className="w-full flex gap-3 mb-3">
        <Link className="w-full" href={'/cadastrar/1'}>
          <ButtonV2
            type="button"
            variant="transparent"
            border={true}
            className="h-12 flex justify-center items-center"
            onClick={() => setInStorage('register-current-step', 1)}
          >
            Voltar
          </ButtonV2>
        </Link>
        <ButtonV2
          type="submit"
          variant="default"
          className="h-12 flex justify-center items-center"
        >
          {isPending ? (<Loader loaderType="login" />) : "Avançar"}
        </ButtonV2>
      </div>
    </form>
  )
}