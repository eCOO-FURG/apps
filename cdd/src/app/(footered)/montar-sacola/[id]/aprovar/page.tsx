import Link from "next/link";
import { IoCheckmarkCircle } from "react-icons/io5";

import Button from "@shared/components/Button";

export default async function Home({ params }: { params: { id: string } }) {
  // const selectedOrder: OrderWithItems = await fetchViewOrder(params.id);
  let selectedOrder = {} as any;
  const customerName: string = `${selectedOrder.customer.first_name} ${selectedOrder.customer.last_name}`;


  return (
    <div className="text-slate-gray flex flex-col bg-theme-background p-5 justify-start h-full">
      <div className="flex flex-col items-center justify-between h-full">
        <div className="h-[90%] flex items-end justify-center">
          <IoCheckmarkCircle className="text-[125px] text-[#00735E]" />
        </div>
        <div className="flex flex-col items-center justify-start h-full pt-4">
          <span className="text-center text-3xl font-medium">
            A sacola está <br /> pronta!
          </span>
          <span className="mt-4 text-center text-sm font-medium">
            A sacola #{selectedOrder?.id} do cliente <br />{" "}
            {customerName} está pronta.
          </span>
        </div>
        <div className="justify-self-end">
          <Link href={"/"} className="w-full">
            <Button
              className="w-full bg-[#F7F7F7] rounded-md h-12 mb-[12px] text-[#4F4743] border-2 border-[#4F4743] font-semibold"
              href={"/"}
            >
              Voltar para a tela inicial
            </Button>
          </Link>
          <Link href={"/montar-sacola"} className="w-full">
            <Button
              className="w-full bg-[#4F4743] rounded-md h-12 text-white font-semibold"
              href={"/montar-sacola"}
            >
              Montar outra sacola
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
