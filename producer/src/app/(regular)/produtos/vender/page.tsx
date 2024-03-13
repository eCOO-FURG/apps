import RenderProducts from "./components/RenderProducts";

export default async function Home() {
  return (
    <div className="flex flex-col items-center p-4 bg-background text-slate-gray">
      <div className="w-full flex flex-col items-center">
        <span className="mt-14 text-[30px] leading-[34px] text-center font-medium">
          Escolha um <br />
          produto
        </span>
        <span className="mt-4 max-w-[270px] text-sm font-medium text-center">
          Este produto será disponibilizado para a venda através da plataforma
        </span>
      </div>
      <RenderProducts />
    </div>
  );
}
