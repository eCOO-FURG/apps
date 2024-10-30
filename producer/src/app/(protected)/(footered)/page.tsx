'use client'

import { toast } from 'sonner';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Header } from "./home/components/Header";
import { ProductMenu } from "./home/components/ProductMenu";
import CycloInformation from "./home/components/CycloInformation";
import { PendingDeliveries } from "./home/components/PendingDeliveries";

import SelectCycle from "@shared/components/SelectCycle";

import { getUserFarm } from '@producer/app/_actions/user/get-user-farm';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      getUserFarm()
        .then((response) => {
          if(response.message) {
            toast.warning("Identificamos que você não possui um agronegócio. Por favor, finalize o cadastro.");
            router.push("/cadastrar/4");
          }
        })
        .catch(() => {
          toast.error("Erro desconhecido.");
        })
    })()
  }, []);

  return (
    <div className="px-4 pb-10 pt-10 h-[var(--min-page-height)]">
      <div className='flex flex-col gap-5'>
        <Header />
        <SelectCycle />
        <CycloInformation />
        <ProductMenu />
        <PendingDeliveries />
      </div>
    </div>
  );
}
