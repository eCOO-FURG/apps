import { ReportButtonData } from "@shared/types/report/index";

export const reportButtonData: ReportButtonData = [
  {
    name: "Lista de ofertas",
    onClick: 'list-offers',
    disabled: true
  },
  {
    name: "Lista de sacolas",
    onClick: "list-bags",
    disabled: false
  },
  {
    name: "Fluxo de caixa",
    onClick: "cash-flow-cdd",
    disabled: true
  },
];