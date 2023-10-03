"use client";
import { PureComponent } from "react";
import { HiOutlinePencil, HiOutlineFilter } from "react-icons/hi";

export class Table extends PureComponent {
  render() {
    return (
      <div>
        <div className="relative ml-auto flex items-center">
          <input
            className="border border-primary rounded-md h-12 p-4 pr-10 text-base ml-auto -mb-4"
            type="text"
            placeholder="Procurar"
          />
          <div className="absolute right-3 top-3">
            <HiOutlineFilter className="text-primary text-2xl" />
          </div>
        </div>
        <div className="flex flex-row ">
          <span className="text-base font-semibold mb-2 ">Últimas vendas</span>
        </div>
        <div className="flex">
          <table className="bg-white text-primary text-left leading-7 font-inter w-full table-fixed rounded-lg">
            <thead>
              <tr>
                <th className="border-b border-primary p-2">ID da venda</th>
                <th className="border-b border-primary p-2">Valor</th>
                <th className="border-b border-primary p-2">Data da venda</th>
                <th className="w-96 border-b border-primary p-2">Descrição</th>
                <th className="border-b border-primary p-2">Situação</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b border-primary p-2 md-mobile:bg-primary md-mobile:text-white">
                  4985278501
                </td>
                <td className="border-b border-primary p-2">R$ 30,45</td>
                <td className="border-b border-primary p-2">15/08/2023</td>
                <td className="border-b border-primary p-2">
                  2kg tomate, 1kg batata branca, 1kg cenoura
                </td>
                <td className="border-b border-primary p-2 flex items-center">
                  <button className="rounded-3xl bg-primary text-white text-sm h-9 w-24 font-semibold">
                    Pendente
                  </button>
                  <button className="ml-auto mr-2  text-xl">
                    <HiOutlinePencil />
                  </button>
                </td>
              </tr>
              <tr>
                <td className="border-b border-primary p-2 md-mobile:bg-primary md-mobile:text-white">
                  4985278501
                </td>
                <td className="border-b border-primary p-2">R$ 30,45</td>
                <td className="border-b border-primary p-2">15/08/2023</td>
                <td className="border-b border-primary p-2">
                  2kg tomate, 1kg batata branca, 1kg cenoura
                </td>
                <td className="border-b border-primary p-2 flex items-center">
                  <button className="rounded-3xl bg-primary text-white text-sm h-9 w-24 font-semibold">
                    Pendente
                  </button>
                  <button className="ml-auto mr-2  text-xl">
                    <HiOutlinePencil />
                  </button>
                </td>
              </tr>
              <tr>
                <td className="border-b border-primary p-2 md-mobile:bg-primary md-mobile:text-white">
                  4985278501
                </td>
                <td className="border-b border-primary p-2">R$ 30,45</td>
                <td className="border-b border-primary p-2">15/08/2023</td>
                <td className="border-b border-primary p-2">
                  2kg tomate, 1kg batata branca, 1kg cenoura
                </td>
                <td className="border-b border-primary p-2 flex items-center">
                  <button className="rounded-3xl bg-primary text-white text-sm h-9 w-24 font-semibold">
                    Pendente
                  </button>
                  <button className="ml-auto mr-2  text-xl">
                    <HiOutlinePencil />
                  </button>
                </td>
              </tr>
              <tr>
                <td className="border-b border-primary p-2 md-mobile:bg-primary md-mobile:text-white">
                  4985278501
                </td>
                <td className="border-b border-primary p-2">R$ 30,45</td>
                <td className="border-b border-primary p-2">15/08/2023</td>
                <td className="border-b border-primary p-2">
                  2kg tomate, 1kg batata branca, 1kg cenoura
                </td>
                <td className="border-b border-primary p-2 flex items-center">
                  <button className="rounded-3xl bg-primary text-white text-sm h-9 w-24 font-semibold">
                    Pendente
                  </button>
                  <button className="ml-auto mr-2  text-xl">
                    <HiOutlinePencil />
                  </button>
                </td>
              </tr>
              <tr>
                <td className="border-b border-primary p-2 md-mobile:bg-secondary md-mobile:text-primary">
                  4985278501
                </td>
                <td className="border-b border-primary p-2">R$ 30,45</td>
                <td className="border-b border-primary p-2">15/08/2023</td>
                <td className="border-b border-primary p-2">
                  2kg tomate, 1kg batata branca, 1kg cenoura
                </td>
                <td className="border-b border-primary p-2 flex items-center">
                  <button className="rounded-3xl bg-secondary text-primary text-sm h-9 w-24 font-semibold">
                    Concluído
                  </button>
                  <button className="ml-auto mr-2  text-xl">
                    <HiOutlinePencil />
                  </button>
                </td>
              </tr>
              <tr>
                <td className="border-b border-primary p-2 md-mobile:bg-secondary md-mobile:text-primary">
                  4985278501
                </td>
                <td className="border-b border-primary p-2">R$ 30,45</td>
                <td className="border-b border-primary p-2">15/08/2023</td>
                <td className="border-b border-primary p-2">
                  2kg tomate, 1kg batata branca, 1kg cenoura
                </td>
                <td className="border-b border-primary p-2 flex items-center">
                  <button className="rounded-3xl bg-secondary text-primary text-sm h-9 w-24 font-semibold">
                    Concluído
                  </button>
                  <button className="ml-auto mr-2  text-xl">
                    <HiOutlinePencil />
                  </button>
                </td>
              </tr>
              <tr>
                <td className="border-b border-primary p-2 md-mobile:bg-secondary md-mobile:text-primary">
                  4985278501
                </td>
                <td className="border-b border-primary p-2">R$ 30,45</td>
                <td className="border-b border-primary p-2">15/08/2023</td>
                <td className="border-b border-primary p-2">
                  2kg tomate, 1kg batata branca, 1kg cenoura
                </td>
                <td className="border-b border-primary p-2 flex items-center">
                  <button className="rounded-3xl bg-secondary text-primary text-sm h-9 w-24 font-semibold">
                    Concluído
                  </button>
                  <button className="ml-auto mr-2  text-xl">
                    <HiOutlinePencil />
                  </button>
                </td>
              </tr>
              <tr className="border-none">
                <td className="p-2 md-mobile:bg-secondary md-mobile:text-primary">
                  4985278501
                </td>
                <td className="p-2">R$ 30,45</td>
                <td className="p-2">15/08/2023</td>
                <td className="p-2">
                  2kg tomate, 1kg batata branca, 1kg cenoura
                </td>
                <td className="p-2 flex items-center">
                  <button className="rounded-3xl bg-secondary text-primary text-sm h-9 w-24 font-semibold">
                    Concluído
                  </button>
                  <button className="ml-auto mr-2  text-xl">
                    <HiOutlinePencil />
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
export default Table;
