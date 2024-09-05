import Button from '@shared/components/Button';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import { LuChevronLeft } from 'react-icons/lu';

interface IButtonBottomProps {
  children: ReactNode;
  url: string;
}

const ButtonBottom = ({ children, url }: IButtonBottomProps) => {
  return (
    <div className="w-full h-[8%] flex items-center absolute bottom-0 left-0">
      <Link href={url} className="flex items-center">
        <LuChevronLeft className={`w-[30px] h-[30px] text-slate-gray`} />
        <Button
          className={`flex items-center gap-2 text-sm font-medium text-slate-gray w-auto`}
        >
          {children}
        </Button>
      </Link>
    </div>
  );
}

export default ButtonBottom;