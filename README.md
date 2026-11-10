# Pedidos — micro frontends

Sistema de pedidos dividido em três aplicações Next.js. O container importa o cardápio e o pedido com Webpack Module Federation. Os dois micros não se importam: o cardápio avisa o pedido por um evento no `window`.

Next.js **14.2.35**, **Pages Router**. O Module Federation desta biblioteca não funciona com Next.js 16 nem com App Router.

## Aplicações

| Pasta | Porta | Papel |
|---|---:|---|
| `apps/container` | 3000 | Página principal. Carrega os dois micros com `React.lazy` e `Suspense`. |
| `apps/cardapio` | 3001 | Lista de pratos e o botão "Adicionar ao pedido". |
| `apps/pedido` | 3002 | Itens escolhidos, quantidade, total e remoção. |

## Como rodar

Na raiz do repositório:

```bash
npm install
npm run dev
```

Os três sobem juntos.

- Container: http://localhost:3000
- Cardápio sozinho: http://localhost:3001
- Pedido sozinho: http://localhost:3002

Para subir um de cada vez:

```bash
npm run dev:cardapio
npm run dev:pedido
npm run dev:container
```

O container precisa dos outros dois no ar. Sem eles, a tela mostra que o micro não carregou.

Cada micro abre sozinho. O cardápio lista os pratos e mostra o toast ao adicionar. O pedido, sozinho, começa vazio: o evento só cruza os dois quando eles estão na mesma página, que é o container.

## Comunicação

O cardápio dispara `pedido:adicionar` com `window.dispatchEvent`. O detalhe leva `id`, `nome` e `preco`. O pedido escuta esse nome e soma a quantidade se o prato já está na lista.

Não há import entre os dois projetos. O nome do evento é o contrato, repetido em `apps/cardapio/lib/eventos.js` e `apps/pedido/lib/eventos.js`. O container não traduz nada.

O aviso de "adicionado" sai no cardápio. O de "removido" e o de "pedido limpo" saem no pedido. Os toasts são do Sonner, no padrão do shadcn/ui. Os ícones são do react-icons.

## Module Federation

Cada micro publica `remoteEntry.js` e expõe um componente:

- `cardapio/Cardapio`
- `pedido/Pedido`

O container consome os dois no navegador. O `React.lazy` fica em `apps/container/components/Painel.js`, dentro de `Suspense`. A página usa `next/dynamic` com `ssr: false` só para o Next não pedir o remote durante o SSR. A integração em si é o `lazy`.

React e React DOM são singleton no bundle do navegador, para os hooks dos micros funcionarem dentro do container.

O plugin pede o webpack instalado no projeto e a variável `NEXT_PRIVATE_LOCAL_WEBPACK=true`. Os scripts de `dev` já exportam essa variável. O `enhanced-resolve` fica preso em 5.18.1 porque a versão nova quebra o compilador do Next 14.

## Interface

shadcn/ui (botão, card e toaster), Tailwind e react-icons. No celular o cardápio fica acima do pedido. A partir de `lg`, os dois ficam lado a lado.
