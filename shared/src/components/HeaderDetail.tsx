import React, { ReactNode } from "react";

interface HeaderDetailProps {
  id: string | undefined;
  name: string | undefined;
  status?: string;
  selectStatus?: ReactNode;
  time: string;
  content?: ReactNode;
}

const styles = {
  containerDetail: "flex items-start text-theme-primary border-b p-3",
};

function HeaderDetail({
  id,
  name,
  time,
  status,
  selectStatus,
  content,
}: HeaderDetailProps) {

  const getClassname = (status: any) => {
    if (status === selectStatus) {
      return (["w-1/5 mt-1", "w-4/5 pl-10 mb-2"]);
    }
    return (["w-1/5", "w-4/5 pl-10"]);
  }

  return (
    <div className="w-full mx-auto bg-white rounded-lg">
      {[
      { label: "Pedido:", value: id },
      { label: "Status:", value: selectStatus || status },
      { label: "Produtor:", value: name },
      { label: "Prazo:", value: time },
      { label: "Conteúdo:", value: content },
      ].map((item, index) => (
      <div key={index} className={styles.containerDetail}>
        <span className={getClassname(item.value)[0]}>{item.label}</span>
        <span className={getClassname(item.value)[1]}>{item.value}</span>
      </div>
      ))}
    </div>
  );
}

export default HeaderDetail;
