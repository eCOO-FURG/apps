"use client";

import ModalV2 from "@shared/components/ModalV2";
import { useState } from "react";

import ButtonV2 from "@shared/components/ButtonV2";
import CustomInput from "@shared/components/CustomInput";
import OrderTable from "@shared/components/OrderTable";

import { useForm } from "react-hook-form";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { HiOutlineEye } from "react-icons/hi";

const styles = {
  containerDetail: "flex gap-10 items-start text-theme-primary border-b p-3",
};

function Pedidos() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    initialDate: string;
    endDate: string;
    search: string;
  }>();

  const handleModal = () => {
    setIsOpen((prevState) => !prevState);
  };

  const farmsFiltered = [
    {
      id: "1",
      catalog: {
        farm: {
          name: "José da Silva",
        },
      },
      status: "PENDING",
    },
    {
      id: "2",
      catalog: {
        farm: {
          name: "Ruan Dias Zannotta",
        },
      },
      status: "PENDING",
    },
    {
      id: "3",
      catalog: {
        farm: {
          name: "Jefferson Duarte",
        },
      },
      status: "VERIFIED",
    },
  ];

  const info =
    farmsFiltered.length > 0
      ? farmsFiltered?.map((farm) => ({
          id: farm.id,
          data: [
            { detail: "15/08/2023 | 08:41" },
            { detail: farm.catalog.farm.name },
            { detail: "R$ 30,45" },
            { detail: "R$ 6,09" },
            { detail: "R$ 10,00" },
            { detail: "Pix" },
            { detail: "Preparação" },
            {
              detail: (
                <button onClick={handleModal}>
                  <HiOutlineEye className="w-6 h-6 text-primary-500" />
                </button>
              ),
            },
          ],
        }))
      : [];

  const headers = [
    { label: "Produtor" },
    { label: "Cliente" },
    { label: "Preço" },
    { label: "Taxas" },
    { label: "Entrega" },
    { label: "Pagamento" },
    { label: "Status" },
  ];

  return (
    <section>
      <form className="mb-6 flex gap-2.5">
        <CustomInput
          label="Data Inicial"
          register={register("initialDate")}
          type="date"
          errorMessage={errors.initialDate?.message}
        />
        <CustomInput
          label="Data Final"
          register={register("endDate")}
          type="date"
          errorMessage={errors.initialDate?.message}
        />
        <div className="min-w-96">
          <CustomInput
            label="Procurar"
            register={register("search")}
            placeholder="Buscar por nome, produto, data ou valor"
            errorMessage={errors.initialDate?.message}
          />
        </div>
        <ButtonV2 variant="default" className="bg-theme-highlight">
          Filtrar
        </ButtonV2>
      </form>
      <OrderTable type="admin" info={info} headers={headers} />

      <ModalV2
        title="Informações do pedido"
        isOpen={isOpen}
        closeModal={handleModal}
      >
        <div className="w-full grid grid-cols-2 mx-auto bg-white rounded-lg">
          <div>
            <div className={styles.containerDetail}>
              <span className="w-1/5">Pedido:</span>
              <span className="w-4/5">123456789</span>
            </div>
            <div className={styles.containerDetail}>
              <span className="w-1/5">Status:</span>
              <span className="w-4/5">Preparação</span>
            </div>
            <div className={styles.containerDetail}>
              <span className="w-1/5">Cliente:</span>
              <span className="w-4/5">José da Silva</span>
            </div>
            <div className={styles.containerDetail}>
              <span className="w-1/5">Data:</span>
              <span className="w-4/5">15/08/2023</span>
            </div>
            <div className={styles.containerDetail}>
              <span className="w-1/5">Hora:</span>
              <span className="w-4/5">08:41:27</span>
            </div>
          </div>
          <div>
            <div className={styles.containerDetail}>
              <span className="w-1/5">Pedido:</span>
              <span className="w-4/5">123456789</span>
            </div>
            <div className={styles.containerDetail}>
              <span className="w-1/5">Status:</span>
              <span className="w-4/5">Preparação</span>
            </div>
            <div className={styles.containerDetail}>
              <span className="w-1/5">Cliente:</span>
              <span className="w-4/5">José da Silva</span>
            </div>
            <div className={styles.containerDetail}>
              <span className="w-1/5">Data:</span>
              <span className="w-4/5">15/08/2023</span>
            </div>
            <div className={styles.containerDetail}>
              <span className="w-1/5">Hora:</span>
              <span className="w-4/5">08:41:27</span>
            </div>
          </div>
        </div>
        <div className="w-full mx-auto bg-white rounded-lg mt-5">
          <div className="flex gap-10 items-start text-theme-primary p-3">
            <span className="w-1/5">Conteúdo da sacola:</span>
            <span className="w-4/5">
              <p>2kg - Cebola Roxa</p>
              <p>1un - Alface crespa</p>
              <p>3kg - Abóbora Cabotiá</p>
              <p>500g - Pimentão vermelho</p>
              <p>800g - Cenoura</p>
              <p>1un - Salsinha</p>
              <p>1un - Espinafre</p>
            </span>
          </div>
        </div>
        <div className="flex-1 flex gap-2.5">
          <ButtonV2 variant="default" className="bg-error font-medium">
            Estornar
          </ButtonV2>
          <ButtonV2 variant="default" className="bg-theme-primary font-medium">
            Alterar Pagamento
          </ButtonV2>
          <ButtonV2 variant="default" className="w-auto px-4 bg-theme-primary">
            <FiArrowLeft size={18} />
          </ButtonV2>
          <ButtonV2 variant="default" className="w-auto px-4 bg-theme-primary">
            <FiArrowRight size={18} />
          </ButtonV2>
        </div>
      </ModalV2>
    </section>
  );
}

export default Pedidos;
