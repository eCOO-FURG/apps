import React, { useEffect } from 'react';
import Image from 'next/legacy/image';

type EmptyBoxType = "search" | "bag";

interface EmptyBoxProps {
  type: EmptyBoxType;
}

const EmptyBox = ({
  type
}: EmptyBoxProps) => {
  const [boxText, setBoxText] = React.useState("");

  useEffect(() => {
    if (type == "search") {
      setBoxText("Não encontramos resultados para a sua pesquisa.");
      return;
    }
    setBoxText("Nenhuma sacola encontrada!");
  }, [type]);

  return (
    <div className="flex-grow flex h-full">
      <div className="flex flex-col w-full pb-20 justify-center gap-4 items-center">
        <Image
          src="/empty-box.png"
          alt="bag"
          width={180}
          height={100}
          quality={100}
          className="object-contain"
        />
        <span className="text-center font-medium w-60 text-slate-gray">
          {boxText}
        </span>
      </div>
    </div>
  );
}

export default EmptyBox;