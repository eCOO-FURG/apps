"use client";
import React, { PureComponent } from "react";

export class LastSalesTable extends PureComponent {
  render() {
    const divStyle = {
      width: "28rem",
    };
    return (
      <div
        style={divStyle}
        className="mt-5 hidden md:block row-span-2 items-end md:mx-auto lg:ml-28"
      >
        <h3 className="text-base font-poppins font-semibold ml-2 mb-2 ">
          Últimas vendas
        </h3>
        <div className="h-auto flex justify-center">
          <table className="bg-white text-primary text-left leading-9 font-inter w-full rounded-lg overflow-hidden mx-auto">
            <thead>
              <tr>
                <th className="border-b border-primary p-2">ID da venda</th>
                <th className="border-b border-primary p-2">Valor</th>
                <th className="border-b border-primary p-2">Data da venda</th>
                <th className="border-b border-primary p-2">Situação</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b border-primary p-2">4985278501</td>
                <td className="border-b border-primary p-2">R$ 30,45</td>
                <td className="border-b border-primary p-2">15/08/2023</td>
                <td className="border-b border-primary p-2">
                  <button className="rounded-3xl bg-primary text-white text-sm h-9 w-24 font-semibold">
                    Pendente
                  </button>
                </td>
              </tr>
              <tr>
                <td className="border-b border-primary p-2">4985278501</td>
                <td className="border-b border-primary p-2">R$ 30,45</td>
                <td className="border-b border-primary p-2">15/08/2023</td>
                <td className="border-b border-primary p-2">
                  <button className="rounded-3xl bg-primary text-white text-sm h-9 w-24 font-semibold">
                    Pendente
                  </button>
                </td>
              </tr>
              <tr>
                <td className="border-b border-primary p-2">4985278501</td>
                <td className="border-b border-primary p-2">R$ 30,45</td>
                <td className="border-b border-primary p-2">15/08/2023</td>
                <td className="border-b border-primary p-2">
                  <button className="rounded-3xl bg-primary text-white text-sm h-9 w-24 font-semibold">
                    Pendente
                  </button>
                </td>
              </tr>
              <tr>
                <td className="border-b border-primary p-2">4985278501</td>
                <td className="border-b border-primary p-2">R$ 30,45</td>
                <td className="border-b border-primary p-2">15/08/2023</td>
                <td className="border-b border-primary p-2">
                  <button className="rounded-3xl bg-primary text-white text-sm h-9 w-24 font-semibold">
                    Pendente
                  </button>
                </td>
              </tr>
              <tr>
                <td className="border-b border-primary p-2">4985278501</td>
                <td className="border-b border-primary p-2">R$ 30,45</td>
                <td className="border-b border-primary p-2">15/08/2023</td>
                <td className="border-b border-primary p-2">
                  <button className="rounded-3xl bg-secondary text-primary text-sm h-9 w-24 font-semibold">
                    Concluído
                  </button>
                </td>
              </tr>
              <tr>
                <td className="border-b border-primary p-2">4985278501</td>
                <td className="border-b border-primary p-2">R$ 30,45</td>
                <td className="border-b border-primary p-2">15/08/2023</td>
                <td className="border-b border-primary p-2">
                  <button className="rounded-3xl bg-secondary text-primary text-sm h-9 w-24 font-semibold">
                    Concluído
                  </button>
                </td>
              </tr>
              <tr>
                <td className="border-b border-primary p-2">4985278501</td>
                <td className="border-b border-primary p-2">R$ 30,45</td>
                <td className="border-b border-primary p-2">15/08/2023</td>
                <td className="border-b border-primary p-2">
                  <button className="rounded-3xl bg-secondary text-primary text-sm h-9 w-24 font-semibold">
                    Concluído
                  </button>
                </td>
              </tr>
              <tr className="border-none">
                <td className="p-2">4985278501</td>
                <td className="p-2">R$ 30,45</td>
                <td className="p-2">15/08/2023</td>
                <td className="p-2">
                  <button className="rounded-3xl bg-secondary text-primary text-sm h-9 w-24 font-semibold">
                    Concluído
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default LastSalesTable;