import { HTMLAttributes, ReactNode } from 'react';

interface IDescriptionProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

const DescriptionPage = ({ children, className }: IDescriptionProps) => {
  return (
    <span
      className={`text-center text-slate-gray text-sm mt-5 font-medium ${className}`}
    >
      {children}
    </span>
  )
}

export default DescriptionPage;