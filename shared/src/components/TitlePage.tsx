import { ReactNode } from 'react';

interface ITitleProps {
  children: ReactNode;
}

const TitlePage = ({ children }: ITitleProps) => {
  return (
    <h1 className="text-3xl text-slate-gray font-medium">
      {children}
    </h1>
  )
}

export default TitlePage;