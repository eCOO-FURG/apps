"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

import { patchFarms } from "@admin/_actions/farm/patch-farms";

import convertStatus from "@shared/utils/convert-status";
import Button from "@shared/components/Button";
import ModalV2 from "@shared/components/ModalV2";

type Admin = {
  id: string;
  first_name: string;
  last_name: string;
  cpf: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string | null;
};

type DataItem = {
  id: string;
  name: string;
  status: "ACTIVE" | "PENDING" | "INACTIVE";
  tally: string;
  tax: number;
  description: string | null;
  admin: Admin;
  created_at: string;
  updated_at: string | null;
};

interface ProducerTableProps {
  farms?: DataItem[];
}

export default function ProducerTable({ farms }: ProducerTableProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedFarm, setSelectedFarm] = useState<DataItem | null>(null);
  const router = useRouter();
  const today = dayjs();

  const handleRowClick = (id: string) => {
    const farm = farms?.find((farm: DataItem) => farm.id === id);
    setSelectedFarm(farm || null);
    setIsOpen((prevState) => !prevState);
  };

  const handleFarmStatus = (status: "ACTIVE" | "PENDING" | "INACTIVE") => {
    if (!selectedFarm) return;
    patchFarms({ farm_id: selectedFarm.id, status });
    setIsOpen(false);
    router.push('/');
  };

  return (
    <>
      <div className="w-full rounded-t-xl py-3">
        <div className="flex font-inter h-full font-semibold text-theme-primary">
          <div className="w-1/6 text-center">Foto</div>
          <div className="w-2/6 text-left">Nome</div>
          <div className="w-2/6 text-left">Agronegócio</div>
          <div className="w-1/6 text-left">Talão</div>
          <div className="w-1/6 text-left">Celular</div>
          <div className="w-1/6 text-left">Status</div>
        </div>
      </div>
      {farms?.map((item) => (
        <div>
          <hr className="border-gray-400"/>
          <div className="w-full bg-white py-5 rounded-b-xl">
            <div className="flex items-center font-inter h-full font-base text-theme-primary">
              <div className="w-1/6 text-center">Foto</div>
              <div className="w-2/6 text-left">{item.admin.first_name} {item.admin.last_name}</div>
              <div className="w-2/6 text-left">{item.name}</div>
              <div className="w-1/6 text-left">{item.tally}</div>
              <div className="w-1/6 text-left">{item.admin.phone}</div>
              <div className="w-1/6">                
                <Button
                  onClick={handleRowClick.bind(null, item.id)}
                  className={`flex ${
                  item.status === "ACTIVE"
                    ? "bg-rain-forest"
                    : item.status === "PENDING"
                    ? "bg-battleship-gray"
                    : "bg-error"
                  } text-white justify-center items-center w-25 h-9 text-sm font-semibold rounded-full`}
                >
                  {convertStatus(item.status).name}
                </Button>
              </div>
            </div>
          </div>
          {selectedFarm && (
            <ModalV2
              isOpen={isOpen}
              closeModal={handleRowClick.bind(null, selectedFarm.id)}
              title="Verificar produtor"
              className="flex flex-col w-[30%] h-[60%]"
            >
              <div className="w-full h-full rounded-md bg-white font-inter text-theme-primary">
                <div className="flex w-full h-12 items-center pl-4 pt-1">
                  <span className="w-1/4">Nome:</span>
                  <span className="w-3/4">{selectedFarm.admin.first_name} {selectedFarm.admin.last_name}</span>
                </div>
                <hr className="pl-0 w-full border-theme-background"/>
                <div className="flex w-full h-12 items-center pl-4">
                  <span className="w-1/4">Status:</span>
                  <span className="w-3/4 font-bold">{convertStatus(selectedFarm.status).name}</span>
                </div>
                <hr className="pl-0 w-full border-theme-background"/>
                <div className="flex w-full h-12 items-center pl-4 pt-1">
                  <span className="w-1/4">Solicitação:</span>
                  <span className="w-3/4">{today.format("DD/MM/YYYY [às] HH:mm:ss")}</span>
                </div>
                <hr className="pl-0 w-full border-theme-background"/>
                <div className="flex w-full h-12 items-center pl-4 pt-1">
                  <span className="w-1/4">Negócio:</span>
                  <span className="w-3/4">{selectedFarm.name}</span>
                </div>
                <hr className="pl-0 w-full border-theme-background"/>
                <div className="flex w-full h-12 items-center pl-4 pt-1">
                  <span className="w-1/4">Talão:</span>
                  <span className="w-3/4">{selectedFarm.tally}</span>
                </div>
                <hr className="pl-0 w-full border-theme-background"/>
                <div className="flex w-full h-12 items-center pl-4 pt-1">
                  <span className="w-1/4">Email:</span>
                  <span className="w-3/4">{selectedFarm.admin.email}</span>
                </div>
                <hr className="pl-0 w-full border-theme-background"/>
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
        </div>
      )
      )}
      {/* <div className="w-full bg-white py-5 rounded-b-xl">
        <div className="flex items-center font-inter h-full font-base text-theme-primary">
          <div className="w-1/6 text-center">Foto</div>
          <div className="w-2/6 text-left">Fulano da Silva</div>
          <div className="w-2/6 text-left">Sítio do Fulano</div>
          <div className="w-1/6 text-left">12345678</div>
          <div className="w-1/6 text-left">(00) 98765-4321</div>
          <div className="w-1/6">
            <Button onClick={handleModal} className="flex text-white justify-center items-center bg-rain-forest w-25 h-9 text-sm font-semibold rounded-full">
              Aprovado
            </Button>
          </div>
        </div>
      </div>
      <hr className="border-gray-400"/>
      <div className="w-full bg-white py-5 rounded-b-xl">
        <div className="flex items-center font-inter h-full font-base text-theme-primary">
          <div className="w-1/6 text-center">Foto</div>
          <div className="w-2/6 text-left">Fulano da Silva</div>
          <div className="w-2/6 text-left">Sítio do Fulano</div>
          <div className="w-1/6 text-left">12345678</div>
          <div className="w-1/6 text-left">(00) 98765-4321</div>
          <div className="w-1/6">
            <Button className="flex text-white justify-center items-center bg-theme-primary w-25 h-9 text-sm font-semibold rounded-full">
              Pendente
            </Button>
          </div>
        </div>
      </div>
      <hr className="border-gray-400"/>
      <div className="w-full bg-white py-5 rounded-b-xl">
        <div className="flex items-center font-inter h-full font-base text-theme-primary">
          <div className="w-1/6 text-center">Foto</div>
          <div className="w-2/6 text-left">Fulano da Silva</div>
          <div className="w-2/6 text-left">Sítio do Fulano</div>
          <div className="w-1/6 text-left">12345678</div>
          <div className="w-1/6 text-left">(00) 98765-4321</div>
          <div className="w-1/6">
            <Button className="flex text-white justify-center items-center bg-error w-25 h-9 text-sm font-semibold rounded-full">
              Rejeitado
            </Button>
          </div>
        </div>
      </div> */}
    </>
  );
}