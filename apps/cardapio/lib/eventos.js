// Nome do evento que o micro pedido escuta. Os dois projetos combinam essa string;
// não há import de um para o outro.
export const EVENTO_ADICIONAR = "pedido:adicionar";

export function adicionarAoPedido(prato) {
  window.dispatchEvent(
    new CustomEvent(EVENTO_ADICIONAR, {
      detail: { id: prato.id, nome: prato.nome, preco: prato.preco },
    }),
  );
}
