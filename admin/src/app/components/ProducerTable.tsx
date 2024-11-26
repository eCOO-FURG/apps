"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

import { patchFarms } from "@admin/_actions/farm/patch-farms";

import { IProducer } from "@shared/interfaces/user";
import convertStatus from "@shared/utils/convert-status";
import Button from "@shared/components/Button";
import ModalV2 from "@shared/components/ModalV2";
import OrderTable from "@shared/components/OrderTable";
import producer from '@shared/assets/public/producer.png';

interface ProducerTableProps {
  farms?: IProducer[];
}

export default function ProducerTable({ farms }: ProducerTableProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedFarm, setSelectedFarm] = useState<IProducer | null>(null);
  const router = useRouter();
  const today = dayjs();

  const handleRowClick = (id: string) => {
    const farm = farms?.find((farm: IProducer) => farm.id === id);
    setSelectedFarm(farm || null);
    setIsOpen((prevState) => !prevState);
  };

  const handleFarmStatus = (status: "ACTIVE" | "PENDING" | "INACTIVE") => {
    if (!selectedFarm) return;
    patchFarms({ farm_id: selectedFarm.id, status });
    setIsOpen((prevState) => !prevState);
    router.push('/');
  };

  const headers = [
    { label: "Foto" },
    { label: "Nome" },
    { label: "Agronegócio" },
    { label: "Talão" },
    { label: "Celular" },
    { label: "Status" },
  ];

  const info = 
    farms?.map((item) => ({
      id: item.id,
      data: [
        { 
          detail: item.admin.photo 
            ? <img src={item.admin.photo.src} alt="Foto do produtor" className="w-18 h-18 rounded-full" />
            : <img src={producer.src} alt="Foto do produtor" className="w-18 h-18 rounded-full" />
        },
        { detail: item.admin.first_name + " " + item.admin.last_name },
        { detail: item.name },
        { detail: item.tally },
        { detail: item.admin.phone },
        {
          detail: (
            <Button
              className={`flex ${
              item.status === "ACTIVE"
                ? "bg-rain-forest"
                : item.status === "PENDING"
                ? "bg-steel-shadow"
                : "bg-error"
              } text-white justify-center items-center w-25 h-9 text-sm font-semibold rounded-full`}
            >
              {convertStatus(item.status).name}
            </Button>
          )
        }
      ],
    })) || [];

  return (
    <>
      <OrderTable type="admin" headers={headers} info={info} onRowClick={handleRowClick} />
      {selectedFarm && (
        <ModalV2
          isOpen={isOpen}
          closeModal={handleRowClick.bind(null, selectedFarm.id)}
          title="Verificar produtor"
          className="flex flex-col w-[28%] h-[54%]"
        >
          <div className="w-full h-full rounded-md bg-white font-inter text-theme-primary">
            <div className="flex w-full h-12 items-center pl-4 pt-1">
              <span className="w-1/4">Nome:</span>
              <span className="w-3/4">{selectedFarm.admin.first_name} {selectedFarm.admin.last_name}</span>
            </div>
            <hr className="w-full border-theme-background"/>
            <div className="flex w-full h-12 items-center pl-4">
              <span className="w-1/4">Status:</span>
              <span className="w-3/4 font-bold">{convertStatus(selectedFarm.status).name}</span>
            </div>
            <hr className="w-full border-theme-background"/>
            <div className="flex w-full h-12 items-center pl-4 pt-1">
              <span className="w-1/4">Solicitação:</span>
              <span className="w-3/4">{today.format("DD/MM/YYYY [às] HH:mm:ss")}</span>
            </div>
            <hr className="w-full border-theme-background"/>
            <div className="flex w-full h-12 items-center pl-4 pt-1">
              <span className="w-1/4">Negócio:</span>
              <span className="w-3/4">{selectedFarm.name}</span>
            </div>
            <hr className="w-full border-theme-background"/>
            <div className="flex w-full h-12 items-center pl-4 pt-1">
              <span className="w-1/4">Talão:</span>
              <span className="w-3/4">{selectedFarm.tally}</span>
            </div>
            <hr className="w-full border-theme-background"/>
            <div className="flex w-full h-12 items-center pl-4 pt-1">
              <span className="w-1/4">Email:</span>
              <span className="w-3/4">{selectedFarm.admin.email}</span>
            </div>
            <hr className="w-full border-theme-background"/>
            <div className="flex w-full h-12 items-center pl-4 pt-1">
              <span className="w-1/4">Celular:</span>
              <span className="w-3/4">{selectedFarm.admin.phone}</span>
            </div>
          </div>
          <div className="w-full flex pt-5 gap-4 font-inter font-semibold">
            <Button 
              className="w-full h-14 rounded-md text-white bg-error"
              onClick={() => handleFarmStatus("INACTIVE")}
            >
              Rejeitar
            </Button>
            <Button 
              className="w-full h-14 rounded-md text-white bg-rain-forest"
              onClick={() => handleFarmStatus("ACTIVE")}
            >
              Aprovar
            </Button>
          </div>
        </ModalV2>
      )}
    </>
  );
}