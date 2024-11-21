import Button from "@shared/components/Button";

export default function ProducerTable({ name }: { name: string }) {

  return (
    <>
      <div className="w-full rounded-t-xl border-b border-gray-400 py-3">
        <div className="flex font-inter h-full font-semibold text-theme-primary">
          <div className="w-1/6 text-center">Foto</div>
          <div className="w-2/6 text-left">Nome</div>
          <div className="w-2/6 text-left">Agronegócio</div>
          <div className="w-1/6 text-left">Talão</div>
          <div className="w-1/6 text-left">Celular</div>
          <div className="w-1/6 text-left">Status</div>
        </div>
      </div>
      <div className="w-full bg-white py-5 rounded-b-xl">
        <div className="flex items-center font-inter h-full font-base text-theme-primary">
          <div className="w-1/6 text-center">Foto</div>
          <div className="w-2/6 text-left">Fulano da Silva</div>
          <div className="w-2/6 text-left">Sítio do Fulano</div>
          <div className="w-1/6 text-left">12345678</div>
          <div className="w-1/6 text-left">(00) 98765-4321</div>
          <div className="w-1/6">
            <Button className="flex text-white justify-center items-center bg-rain-forest w-25 h-9 text-sm font-semibold rounded-full">
              Aprovado
            </Button>
          </div>
        </div>
      </div>
      <hr className="border-gray-400"/>
      <div className="w-full bg-white py-5 rounded-b-xl">
        <div className="flex items-center font-inter h-full font-base text-theme-primary">
          <div className="w-1/6 text-center">Foto</div>
          <div className="w-2/6 text-left">Fulano da Silva</div>
          <div className="w-2/6 text-left">Sítio do Fulano</div>
          <div className="w-1/6 text-left">12345678</div>
          <div className="w-1/6 text-left">(00) 98765-4321</div>
          <div className="w-1/6">
            <Button className="flex text-white justify-center items-center bg-theme-primary w-25 h-9 text-sm font-semibold rounded-full">
              Pendente
            </Button>
          </div>
        </div>
      </div>
      <hr className="border-gray-400"/>
      <div className="w-full bg-white py-5 rounded-b-xl">
        <div className="flex items-center font-inter h-full font-base text-theme-primary">
          <div className="w-1/6 text-center">Foto</div>
          <div className="w-2/6 text-left">Fulano da Silva</div>
          <div className="w-2/6 text-left">Sítio do Fulano</div>
          <div className="w-1/6 text-left">12345678</div>
          <div className="w-1/6 text-left">(00) 98765-4321</div>
          <div className="w-1/6">
            <Button className="flex text-white justify-center items-center bg-error w-25 h-9 text-sm font-semibold rounded-full">
              Pendente
            </Button>
          </div>
        </div>
      </div>
    </>
    
  );
}