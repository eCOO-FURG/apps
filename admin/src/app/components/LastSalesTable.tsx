export default function LastSalesTable() {
  return (
    <div className="flex bg-white rounded-2xl pt-4 pl-4 gap-1">
      <div className="w-full max-h-[415px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="text-left border-b border-gray-300">
              <th className="pb-2 text-sm font-semibold text-theme-primary">Produtor</th>
              <th className="pb-2 text-sm font-semibold text-theme-primary">Valor</th>
              <th className="pb-2 text-sm font-semibold text-theme-primary">Data da venda</th>
              <th className="pb-2 text-sm font-semibold text-theme-primary">Pagamento</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: "José da Silva", value: "R$ 30,45", date: "15/08/2023", payment: "Pix" },
              { name: "Ruan Dias Zannotta", value: "R$ 15,20", date: "15/08/2023", payment: "Pix" },
              { name: "Jefferson Duarte", value: "R$ 10,00", date: "15/08/2023", payment: "Maquininha" },
              { name: "Joana Fonseca", value: "R$ 56,30", date: "15/08/2023", payment: "Pix" },
              { name: "Manuel Oliveira", value: "R$ 5,50", date: "15/08/2023", payment: "Pix" },
              { name: "Mateus de Jesus", value: "R$ 34,10", date: "15/08/2023", payment: "Fiado" },
              { name: "Ricardo Vieira", value: "R$ 14,30", date: "15/08/2023", payment: "Pix" },
              { name: "Estevão Amorim", value: "R$ 11,00", date: "15/08/2023", payment: "Pix" },
            ].map((row, index) => (
              <tr
                key={index}
                className="border-b last:border-b-0 border-gray-300 text-sm text-theme-primary"
              >
                <td className="py-4">{row.name}</td>
                <td>{row.value}</td>
                <td>{row.date}</td>
                <td>{row.payment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
