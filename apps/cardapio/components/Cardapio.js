import { FiCoffee, FiPlus } from "react-icons/fi";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Toaster } from "./ui/sonner";
import { adicionarAoPedido } from "../lib/eventos";
import { pratos } from "../lib/pratos";
import { formatarPreco } from "../lib/utils";

export default function Cardapio() {
  function adicionar(prato) {
    adicionarAoPedido(prato);
    toast.success("Adicionado ao pedido", { description: prato.nome });
  }

  return (
    <section className="flex flex-col gap-4">
      <header className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-md border bg-card">
          <FiCoffee aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Cardápio</h2>
          <p className="text-sm text-muted-foreground">Escolha um prato para o pedido.</p>
        </div>
      </header>

      <ul className="grid gap-3">
        {pratos.map((prato) => (
          <li key={prato.id}>
            <Card>
              <CardHeader className="p-4 pb-2">
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-base">{prato.nome}</CardTitle>
                  <span className="text-sm font-medium">{formatarPreco(prato.preco)}</span>
                </div>
                <CardDescription>{prato.descricao}</CardDescription>
              </CardHeader>
              <CardFooter className="p-4 pt-2">
                <Button className="w-full sm:w-auto" onClick={() => adicionar(prato)}>
                  <FiPlus aria-hidden="true" />
                  Adicionar ao pedido
                </Button>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
      <Toaster />
    </section>
  );
}
