"use client";
import Link from "next/link";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { MdMailOutline } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { LuChevronLeft } from "react-icons/lu";
import { yupResolver } from "@hookform/resolvers/yup";

import Input from "@/components/Input";
import Button from "@/components/Button";

const schema = yup.object({
  email: yup.string().required("Informe o e-mail").email("Email inválido"),
  password: yup.string().required("Informe a senha").min(6, "Mínimo 6 dígitos"),
});

async function onSubmit({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  "use server";
  console.log(email, password);
}

export default function Login() {
  const resolver = yupResolver(schema);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver });

  return (
    <div className="w-full h-screen p-3 pb-6 flex items-center flex-col">
      <div className="flex flex-col w-full items-center">
        <h1 className="text-3xl font-medium text-slate-gray mt-28 mb-4">
          Login
        </h1>
        <span className="text-sm font-medium text-slate-gray mb-6">
          Entre com seu email e senha:{" "}
        </span>
      </div>
      <div className="w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="email"
            label="E-mail"
            icon={<MdMailOutline />}
            register={{ ...register("email") }}
            error={errors.email?.message}
          />

          <Input
            type="password"
            label="Senha"
            icon={<AiFillEye />}
            register={{ ...register("password") }}
            error={errors.password?.message}
          />

          <Button
            type="submit"
            className="text-white bg-slate-gray"
            title="Entrar"
          />
        </form>
      </div>
      <div className="mt-6">
        <span className="text-sm font-medium text-slate-gray">
          Esqueceu a senha?{" "}
          <Link className="underline" href={""}>
            Clique aqui
          </Link>
        </span>
      </div>
      <div className="w-full h-screen items-end flex text-center">
        <Link
          className="flex items-center gap-2 text-sm font-medium text-slate-gray"
          href={"/inicio"}
        >
          <LuChevronLeft className="w-[30px] h-[30px] text-slate-gray" /> Voltar
        </Link>
      </div>
    </div>
  );
}
