import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

import EmptyBoxInformation from '@shared/components/EmptyBoxInformation';
import OrderModal from "@shared/components/OrderModal";
import { FarmOrders } from "@shared/interfaces/farm-orders";
import { Order } from "@shared/interfaces/farm-orders";
import { convertUnit } from "@shared/utils/convert-unit";
import { getBoxOrders } from "@cdd/app/_actions/box/get-box-orders";
import { useHandleError } from "@shared/hooks/useHandleError";

import { getOrder } from "@cdd/app/_actions/order/get-order";
import { toast } from "sonner";

const styles = {
  itemHeader:
    "truncate text-battleship-gray font-inter border-b border-theme-background p-3 text-xs font-semibold text-left",
  itemBody: "border-b-[1px] truncate text-grayish-blue p-3 text-left",
};

interface ITableProps {
  headers: Array<{ label: string; style?: string }>;
  info: {
    id: string;
    data: { detail: string | JSX.Element; style?: string }[];
  }[];
  farmOrders: FarmOrders;
  onRowClick?: (id: string) => void;
}

const Table = ({ headers, info, farmOrders }: ITableProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { handleError } = useHandleError();

  const handleRowClick = (id: string) => {
    const order = farmOrders.orders.find((order: Order) => order.id === id);
    setSelectedOrder(order || null);
    setModalOpen(true);
  };

  const handleApprove = () => {
    
  };

  const handleReject = () => {

  };

  const box_id = useParams().box_id;

  useEffect(() => {
    (async () => {

      await getBoxOrders({
        box_id: box_id as string,
      })
        .then((response: any) => {
          if (response.message) {
            const messageError = response.message as string;

            handleError(messageError);
          } else if (response.data) {
            console.log(response.data)
            return;
          }
        })
        .catch((error) => {
          toast.error(error);
        })
    })();
  }, [box_id]);

  if (!info.length) {
    return (
      <EmptyBoxInformation style="m-auto">Nenhuma Caixa Encontrada!</EmptyBoxInformation>
    );
  }

  if (isModalOpen) console.log(selectedOrder)
  
  return (
    <>
      <table className="bg-white text-theme-primary leading-7 w-full table-fixed rounded-lg mt-3 mb-auto">
        <thead className="w-full">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className={twMerge(styles.itemHeader, header.style)}
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {info.map((products) => (
            <tr
              key={products.id}
              onClick={() => handleRowClick(products.id)}
              className="text-center cursor-pointer"
            >
              {products.data.map((product, cellIndex) => (
                <td
                  key={cellIndex}
                  className={twMerge(styles.itemBody, product.style)}
                >
                  {product.detail}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {selectedOrder && (
        <OrderModal
          titleContentModal={selectedOrder?.offer.product.name}
          subtitleContentModal={`Quantidade: ${selectedOrder?.amount}${convertUnit(selectedOrder.offer.product.pricing)}`}
          contentModal="Confira a quantidade e a qualidade do produto. Se estiver tudo certo, clique em aprovar."
          titleConfirmModal="Aprovar"
          titleCloseModal="Rejeitar"
          textCloseModal="#EEF1F4"
          bgCloseModal="#FF7070"
          bgConfirmModal="#00735E"
          isOpen={isModalOpen}
          setIsOpen={setModalOpen}
          approveAction={handleApprove}
          rejectAction={handleReject}
        />
      )}
    </>
  );
};

export default Table;
