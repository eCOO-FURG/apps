import { ACTIONS } from "@shared/_actions";

export async function UserGreeting() {
  const { name } = await ACTIONS["get-account"].execute({});

  return (
    <span className="text-lg text-slate-gray">
      Olá, <strong className="font-semibold">{name}</strong>
    </span>
  );
}
