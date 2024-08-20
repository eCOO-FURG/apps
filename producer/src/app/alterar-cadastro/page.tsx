'use client'

import Button from "@shared/components/Button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AiFillEye } from "react-icons/ai";
import { getPrivateAction } from "@shared/_actions/account/get-private";
import { updateInfoFieldsSchema } from "./schemas";
import Input from "./components/Input";
import ConfirmationModal from "./components/ConfirmationModal";

export default function AlterarCadastro() {
  const preventDefault = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  const [new_firstName, setNewFirstName] = useState("");
  const [new_lastName, setNewLastName] = useState("");
  const [new_phone, setNewPhone] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");

  const [firstName, setFirstName] = useState("Nome");
  const [lastName, setLastName] = useState("Sobrenome");
  const [phone, setPhone] = useState("(xx) xxxxx-xxxx");
  const [email, setEmail] = useState("Email");

  useEffect(() => {
    (async () => {
      const { first_name, last_name, phone, email } = await getPrivateAction({});
      if (first_name != "" || undefined || null) setFirstName(first_name);
      if (last_name != "" || undefined || null) setLastName(last_name);
      if (phone != "" || undefined || null) setPhone(phone);
      setEmail(email);
    })();
  });

  return (
    <div className="w-full h-screen p-5 flex items-center flex-col bg-theme-background">
      <div className="flex flex-col h-1/5 w-full items-center justify-end">
        <h1 className="text-3xl font-medium text-slate-gray">Seu perfil</h1>
        <span className="text-sm font-medium text-slate-gray text-center mt-2">
          Após atualizar os seus dados, <br /> clique em salvar.
        </span>
      </div>
      <div className="w-full h-4/5 flex flex-col mt-10">
        <form className="w-full h-full flex flex-col justify-between" onSubmit={preventDefault}>
          <div className="w-full flex flex-col gap-1">
            <Input
              label="Name"
              type="text"
              value={new_firstName}
              placeholder={firstName}
              validationSchema={updateInfoFieldsSchema.first_name}
              onChange={(e) => setNewFirstName(e.target.value)}
            />

            <Input
              label="Sobrenome"
              type="text"
              value={new_lastName}
              placeholder={lastName}
              validationSchema={updateInfoFieldsSchema.last_name}
              onChange={(e) => setNewLastName(e.target.value)}
            />

            <Input
              label="Email"
              type="email"
              placeholder={email}
              validationSchema={updateInfoFieldsSchema.email}
              readOnly
            />

            <Input
              label="Telefone"
              type="number"
              value={new_phone}
              placeholder={phone}
              validationSchema={updateInfoFieldsSchema.phone}
              onChange={(e) => setNewPhone(e.target.value)}
            />

            <Input
              label="Nova Senha"
              type="password"
              value={new_password}
              icon={<AiFillEye />}
              placeholder="********"
              validationSchema={updateInfoFieldsSchema.password}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <Input
              label="Confirmar Senha"
              type="password"
              value={confirm_password}
              icon={<AiFillEye />}
              placeholder="********"
              validationSchema={updateInfoFieldsSchema.confirm_password}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="w-full flex gap-1 items-end">
            <Link className="w-full" href={"/"}>
              <Button className="w-full rounded-lg font-semibold text-slate-gray border-slate-gray border-2 py-[10px]">
                Voltar
              </Button>
            </Link>

            <ConfirmationModal
              info={{
                first_name: new_firstName,
                last_name: new_lastName,
                phone: new_phone,
                password: new_password
              }}
              openButton={
                <Button
                  className={`px-2 py-3 w-full rounded-lg font-inter font-semibold text-white ${
                    !new_firstName ||
                    !new_lastName ||
                    new_phone.length < 11 ||
                    new_password.length < 8 ||
                    confirm_password !== new_password
                      ? "bg-gray-400"
                      : "bg-[#00735E]"
                  }`}
                  style={{ marginBottom: "9px" }}
                  disabled={
                    !new_firstName ||
                    !new_lastName ||
                    new_phone.length < 11 ||
                    new_password.length < 8 ||
                    confirm_password !== new_password
                  }
                >
                  Salvar
                </Button>
              }
              link={`/`}
            />
          </div>
        </form>
      </div>
    </div>
  )
}