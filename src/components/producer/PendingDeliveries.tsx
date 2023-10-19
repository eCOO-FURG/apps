import { HiOutlineInformationCircle } from "react-icons/hi";
import { PendingDeliveriesTable } from "@/components/producer/Table/PendingDeliveriesTable";

interface PendingDeliveriesProps {
  numberOfItems: number;
}

export function PendingDeliveries({ numberOfItems }: PendingDeliveriesProps) {
  return (
    <div
      className={`mt-2 w-full pl-3 pr-4 rounded-2xl bg-white flex flex-col justify-around gap-4`}
    >
      <div className="flex justify-between items-start mt-[23px]">
        <div className="flex flex-col">
          <span className="text-[#3E5155]">Entregas pendentes</span>
          <div>
            <span className="text-xs text-[#979797]">
              CDD - FURG ({" "}
              <button className="underline font-bold">ver endereço</button> )
            </span>
          </div>
        </div>
        <button>
          <HiOutlineInformationCircle className="text-[24px] text-slate-blue" />
        </button>
      </div>
      <PendingDeliveriesTable numberOfItems={numberOfItems} />
    </div>
  );
}
