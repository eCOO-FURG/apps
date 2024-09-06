'use client'

import React, { FormEvent } from 'react';
import TitlePage from '@shared/components/TitlePage'
import DescriptionPage from '@shared/components/DescriptionPage';
import Input from '../../cadastrar/components/Input';
import { registerStep1FieldsSchema } from '../../cadastrar/schemas';
import Button from '@shared/components/Button';

export default function Page() {

  const unparsedFormData =
    typeof window !== "undefined"
      ? localStorage.getItem("register-form-data")
      : undefined;
  const formData = unparsedFormData ? JSON.parse(unparsedFormData) : null;


  // 
  // Implementar react hook form
  // 

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const data = JSON.parse(localStorage.getItem("register-form-data") as string);
    const { email } = data

    console.log(email)
  }

  return (
    <main className='flex flex-col w-full h-[inherit] items-center justify-center bg-theme-background px-4'>
      <TitlePage>Recuperar senha</TitlePage>
      <DescriptionPage>
        Enviaremos um código de <br /> verificação para o email abaixo
      </DescriptionPage>
      <form className='w-full mt-10' onSubmit={onSubmit}>
        <Input
          name="email"
          placeholder="suporte@ecoo.org.br"
          label="Email"
          type="email"
          initialValue={formData?.email || null}
          validationSchema={registerStep1FieldsSchema.email}
          localStorageFormKey="register-form-data"
        />
        <Button className="w-full px-3 py-4 font-semibold rounded-lg text-base text-white border-0 bg-slate-gray">
          Entrar
        </Button>
      </form>
    </main>
  );
}