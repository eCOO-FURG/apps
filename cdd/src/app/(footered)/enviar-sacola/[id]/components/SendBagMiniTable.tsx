'use client'

import { BagOrder, fetchBag } from "@cdd/app/_actions/bag/fetch-bag";
import { handleBag } from "@cdd/app/_actions/bag/handle-bag";
import Modal from "@cdd/components/Modal";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SendBagMiniTable() {
  const router = useRouter()

  const [bagOrder, setBagOrder] = useState<BagOrder | null>(null);

  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      toast.warning("ID da sacola não informada.");
      return;
    }

    (async () => {
      try {
        const response = await fetchBag({ bag_id: id as string });
        setBagOrder(response);
      } catch (error) {
        toast.error("Erro ao buscar dados da sacola.");
      }
    })()
  }, [id]);

  const handleStatusBag = async (bag_id: string, status: "SEPARATED") => {
    try {
      const response = await handleBag({
        bag_id,
        status: "DISPATCHED"
      });

      router.push(`/enviar-sacola/${id}/alterar`);
    } catch (error) {
      toast.error("Erro");
    }
  }

  const getNextSaturdayDate = () => {
    const today = dayjs();
    const dayOfWeek = today.day();

    const daysUntilSaturday = 6 - dayOfWeek;
    const nextSaturday = today.add(daysUntilSaturday, 'day');

    return nextSaturday.format("DD/MM/YYYY");
  };

  if (!id) return null;

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="max-w-sm mx-auto bg-white rounded-lg">
        <div className="flex gap-10 items-start text-theme-primary border-b-[1px] border-theme-background p-3">
          <span className="w-1/5">Pedido:</span>
          <span className="w-4/5">{bagOrder?.id}</span>
        </div>
        <div className="flex gap-10 items-start text-theme-primary border-b-[1px] border-theme-background p-3">
          <span className="w-1/5">Status:</span>
          <span className="w-4/5">{bagOrder?.status === "PENDING" ? "Pendente" : "Pronta"}</span>
        </div>
        <div className="flex gap-10 items-start text-theme-primary border-b-[1px] border-theme-background p-3">
          <span className="w-1/5">Cliente:</span>
          <span className="w-4/5">{`${bagOrder?.user.first_name} ${bagOrder?.user.last_name}`}</span>
        </div>
        <div className="flex gap-10 items-start text-theme-primary border-b-[1px] border-theme-background p-3">
          <span className="w-1/5">Prazo:</span>
          <span className="w-4/5">{getNextSaturdayDate()}</span>
        </div>
        <div className="text-theme-primary p-3">Conteúdo:</div>
        <div className="pl-3 pb-3 text-theme-primary">
          {bagOrder?.orders.map(order => (
            <div key={order.id}>
              {`${order.offer.amount}${order.offer.product.pricing === 'WEIGHT' ? 'g' : 'un'} - ${order.offer.product.name}`}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-[10%] flex justify-center items-end">
        {bagOrder?.status === "SEPARATED" ? (
          <Modal
            openButton="Marcar como enviada"
            title="Você tem certeza?"
            description="Ao alterar o status para enviada, o cliente será notificado que ela está a caminho."
            approvalButtons={true}
            textButton1="Cancelar"
            textButton2="Confirmar"
            bgButton2="#00735E"
            onClick={() => {
              if (bagOrder) {
                handleStatusBag(bagOrder.id, "SEPARATED")
              }
            }
            }
          />
        ) : (
          <>
            <span className="text-center mt-6 text-slate-gray">Sacola já enviada!</span>
          </>
        )}
      </div>
    </div>
  );
}
