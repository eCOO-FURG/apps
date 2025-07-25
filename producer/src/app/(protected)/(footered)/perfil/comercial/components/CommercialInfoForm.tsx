import React from 'react';
import CustomInput from "@shared/components/CustomInput";
import Image from "next/image";
import { Control, UseFormRegister, UseFormGetValues, FieldErrors, Controller } from "react-hook-form"; 
import { HiOutlineMinusCircle, HiOutlinePencil, HiOutlinePlusCircle } from "react-icons/hi";
import { ChangeComercialRegistrationSchema } from '@shared/schemas/change-comercial-registration';
import { set } from 'lodash';
import ProfilePhotoEditor from './ProfilePhotoEditor';

interface CommercialInfoFormProps {
  photo: string;
  images: string[] | File[],
  setPhoto: React.Dispatch<React.SetStateAction<string>>;
  setImages: React.Dispatch<React.SetStateAction<string[] | File[]>>;
  sendImage: (image: File) => Promise<void>;
  removeImage: (image: string) => Promise<void>;
  register: UseFormRegister<ChangeComercialRegistrationSchema>;
  errors: FieldErrors<ChangeComercialRegistrationSchema>;
  charCount: number;
  setCharCount: React.Dispatch<React.SetStateAction<number>>;
  getValues: UseFormGetValues<ChangeComercialRegistrationSchema>;
  control: Control<ChangeComercialRegistrationSchema>;
}

function CommercialInfoForm({ photo, images, setPhoto, setImages, sendImage, removeImage, register, errors, charCount, setCharCount, getValues, control }: CommercialInfoFormProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-5">
      <ProfilePhotoEditor
        photo={photo}
        setPhoto={setPhoto}
        control={control}
        errors={errors}
      />
      <CustomInput
        register={{ ...register("name") }}
        placeholder="Nome comercial"
        label="Nome comercial"
        type="text"
        errorMessage={errors.name?.message}
      />
      <CustomInput
        register={{ ...register("tally") }}
        placeholder="Inscrição estadual"
        label="Inscrição estadual"
        inputMode="numeric"
        type="text"
        mask="tally"
        errorMessage={errors.tally?.message}
        disabled
      />
      <div className="w-full h-full relative flex flex-col text-slate-gray">
        <label className="text-sm leading-4.75 font-inter font-normal text-theme-primary pb-1.75 flex flex-row items-center justify-start gap-2 tracking-tight-2">
          Descrição
        </label>
        <textarea
          {...register("description")}
          maxLength={500}
          placeholder="Escreva uma breve descrição"
          className="w-full p-3 border border-theme-primary rounded-lg font-inter font-normal box-border h-50 resize-none"
          onChange={(e) => {
            setCharCount(e.target.value.length);
          }}
        />
        <p className="text-right text-slate-gray text-xs mt-1">{`${
          charCount || getValues("description")?.length || 0
        }/500`}</p>
      </div>
      <div className="relative flex flex-col text-slate-gray w-full">
        <label className="text-sm leading-4.75 font-inter font-normal text-theme-primary pb-1.75 flex flex-row items-center justify-start gap-2 tracking-tight-2">
          Mostre o seu trabalho em até 4 fotos
        </label>
        <div className="w-full flex flex-row justify-center items-center flex-wrap gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            images[index] ? (
              <div
                key={index}
                className="w-20 h-20 cursor-pointer relative bg-white border border-theme-default rounded-lg flex items-center justify-center overflow-hidden"
                onClick={() => {
                  const encodedUrl = encodeURIComponent(encodeURIComponent(images[index].toString()));
                  removeImage(encodedUrl);
                }}
              >
                <Image
                  id={`photo-${index}`}
                  key={index}
                  priority
                  src={typeof images[index] === "string" ? images[index] as string : URL.createObjectURL(images[index] as File)}
                  alt="User"
                  width={80}
                  height={80}
                  className="rounded-lg object-cover w-full h-full"
                />
                <HiOutlineMinusCircle className="h-8 w-8 text-white absolute inset-0 m-auto" />
              </div>
            ) : (
              <label
                key={index}
                htmlFor={`image-input-${index}`}
                className="w-20 h-20 cursor-pointer relative bg-white border border-theme-default rounded-lg flex items-center justify-center overflow-hidden"
              >
                <input
                  id={`image-input-${index}`}
                  type="file"
                  accept="image/png, image/jpeg"
                  className="w-full h-full opacity-0 cursor-pointer absolute"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      sendImage(file);
                    }
                  }}
                />
                <HiOutlinePlusCircle className="h-8 w-8 text-theme-primary" />
              </label>
            )
          ))}
        </div>
      </div>
    </div>
  );
}

export default CommercialInfoForm;