interface HeaderDetailProps {
  id: string | undefined;
  name: string | undefined;
  status: string;
  time: string;
}

const styles = {
  containerDetail:
    "flex items-start text-theme-primary border-b-[1px] border-theme-background p-3",
};

function HeaderDetail({ id, name, time, status }: HeaderDetailProps) {
  return (
    <div className="w-full mx-auto bg-white rounded-lg">
      {[
        { label: "Pedido:", value: id },
        { label: "Status:", value: status },
        { label: "Produtor:", value: name },
        { label: "Prazo:", value: time },
      ].map((item, index) => (
        <div key={index} className={styles.containerDetail}>
          <span className="w-1/5">{item.label}</span>
          <span className="w-4/5 pl-10">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

export default HeaderDetail;
