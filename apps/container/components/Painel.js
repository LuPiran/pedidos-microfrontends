import { Component, lazy, Suspense } from "react";

// Consumo dos micros. O import só roda no navegador: a página usa next/dynamic
// com ssr: false para o Next não tentar resolver o remote durante o SSR.
const Cardapio = lazy(() => import("cardapio/Cardapio"));
const Pedido = lazy(() => import("pedido/Pedido"));

class Limite extends Component {
  constructor(props) {
    super(props);
    this.state = { falhou: false };
  }

  static getDerivedStateFromError() {
    return { falhou: true };
  }

  render() {
    if (this.state.falhou) {
      return (
        <p className="rounded-lg border bg-card p-4 text-sm text-muted-foreground">
          Não foi possível carregar este micro. Confira se o servidor dele está no ar.
        </p>
      );
    }
    return this.props.children;
  }
}

function Carregando({ nome }) {
  return <p className="text-sm text-muted-foreground">Carregando {nome}...</p>;
}

export default function Painel() {
  return (
    <div className="grid items-start gap-6 lg:grid-cols-2">
      <Limite>
        <Suspense fallback={<Carregando nome="o cardápio" />}>
          <Cardapio />
        </Suspense>
      </Limite>
      <Limite>
        <Suspense fallback={<Carregando nome="o pedido" />}>
          <Pedido />
        </Suspense>
      </Limite>
    </div>
  );
}
