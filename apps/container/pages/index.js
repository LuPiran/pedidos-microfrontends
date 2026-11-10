import dynamic from "next/dynamic";
import { FiLayers } from "react-icons/fi";

const Painel = dynamic(() => import("../components/Painel"), {
  ssr: false,
  loading: () => <p className="text-sm text-muted-foreground">Carregando os micros...</p>,
});

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8">
      <header className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-md border bg-card">
          <FiLayers aria-hidden="true" />
        </span>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Pedidos</h1>
          <p className="text-sm text-muted-foreground">
            Container na porta 3000. Cardápio e pedido chegam por Module Federation.
          </p>
        </div>
      </header>
      <Painel />
    </main>
  );
}
