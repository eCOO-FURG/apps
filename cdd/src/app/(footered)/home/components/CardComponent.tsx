'use client'

import { useCycleProvider } from "@shared/context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { toast } from "sonner";

interface CardComponentProps{
  title: string,
  link: string
  linkIcon?: string
  isSelectedCycle?: boolean
}

export default function CardComponent({ title, link, linkIcon, isSelectedCycle }: CardComponentProps){
  const router = useRouter()

  const { cycle } = useCycleProvider()

  const handleClickSelectedCycle = () => {
    if(!cycle){
      toast.warning("Selecione um ciclo para começar uma oferta!")
      return
    }

    router.push(link)
  }

  return (
    <div className="w-full h-full items-center mt-5 p-4 rounded-2xl bg-white flex gap-4">
      <div className="w-[90%] h-full flex items-center">
        {isSelectedCycle ? (
          <button onClick={handleClickSelectedCycle} className="w-full bg-[#4A403A] rounded-md p-4 text-white font-semibold">
            {title}
          </button>
        ) : (
          <Link href={link} className="w-full">
            <button className="w-full bg-[#4A403A] rounded-md p-4 text-white font-semibold">
              {title}
            </button>
          </Link>
        )}
      </div>
      <div className="w-[10%] h-full flex justify-center items-center">
        <button disabled className="rounded-full p-2">
          <HiOutlineInformationCircle size={24} className="text-[#7B7B7B]" />
        </button>
      </div>
    </div>
  );
}