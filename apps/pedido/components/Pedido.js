import { useEffect, useState } from "react";
import { FiClipboard, FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Toaster } from "./ui/sonner";
import { EVENTO_ADICIONAR } from "../lib/eventos";
import { formatarPreco } from "../lib/utils";

export default function Pedido() {
  const [itens, setItens] = useState([]);

  useEffect(() => {
    function aoAdicionar(evento) {
      const prato = evento.detail;
      setItens((atual) => {
        const existente = atual.find((item) => item.id === prato.id);
        if (!existente) return [...atual, { ...prato, quantidade: 1 }];
        return atual.map((item) =>
          item.id === prato.id ? { ...item, quantidade: item.quantidade + 1 } : item,
        );
      });
    }

    window.addEventListener(EVENTO_ADICIONAR, aoAdicionar);
    return () => window.removeEventListener(EVENTO_ADICIONAR, aoAdicionar);
  }, []);

  function remover(id) {
    const item = itens.find((atual) => atual.id === id);
    setItens((atual) => atual.filter((entrada) => entrada.id !== id));
    if (item) toast("Item removido", { description: item.nome });
  }

  function limpar() {
    setItens([]);
    toast("Pedido limpo");
  }

  const quantidade = itens.reduce((soma, item) => soma + item.quantidade, 0);
  const total = itens.reduce((soma, item) => soma + item.preco * item.quantidade, 0);

  return (
    <section className="flex flex-col gap-4">
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-md border bg-card">
            <FiClipboard aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Pedido</h2>
            <p className="text-sm text-muted-foreground">
              {quantidade === 0 ? "Nenhum item ainda" : `${quantidade} ${quantidade === 1 ? "item" : "itens"}`}
            </p>
          </div>
        </div>
        {itens.length > 0 && (
          <Button variant="outline" size="sm" onClick={limpar}>
            Limpar
          </Button>
        )}
      </header>

      {itens.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-sm text-muted-foreground">
            Nenhum item no pedido. No container, o cardápio envia os pratos para esta lista.
          </CardContent>
        </Card>
      ) : (
        <ul className="grid gap-3">
          {itens.map((item) => (
            <li key={item.id}>
              <Card>
                <CardContent className="flex items-center justify-between gap-3 p-4">
                  <div className="min-w-0">
                    <p className="truncate font-medium">
                      {item.nome}
                      <span className="ml-2 text-sm font-normal text-muted-foreground">× {item.quantidade}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">{formatarPreco(item.preco * item.quantidade)}</p>
                  </div>
                  <Button variant="outline" size="icon" aria-label={`Remover ${item.nome}`} onClick={() => remover(item.id)}>
                    <FiTrash2 aria-hidden="true" />
                  </Button>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center justify-between rounded-lg border bg-card px-4 py-3">
        <span className="text-sm text-muted-foreground">Total</span>
        <span className="text-lg font-semibold">{formatarPreco(total)}</span>
      </div>
      <Toaster position="bottom-left" />
    </section>
  );
}
