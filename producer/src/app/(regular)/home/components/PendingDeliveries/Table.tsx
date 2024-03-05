import React from "react";

import fakedata from "./fakedata";

interface PendingDeliveriesTableProps {
  numberOfItems: number;
}

export function PendingDeliveriesTable({
  numberOfItems,
}: PendingDeliveriesTableProps) {
  const itemsToShow = fakedata.slice(0, numberOfItems);

  const rowStyle = {
    height: "42px",
  };

  return (
    <table className="text-primary mb-[30px] font-inter">
      <tbody className="text-center">
        {/* {itemsToShow.map((item, index) => (
          <tr key={index} style={rowStyle} className="border-b">
            <td className="">{item.quantidade}</td>
            <td className="">{item.produto}</td>
            <td className="text-right">{item.dataVenda}</td>
          </tr>
        ))} */}
        {/* <span className="text-default">Você não possui nenhuma entrega pendente.</span> */}
      </tbody>
    </table>
  );
}
