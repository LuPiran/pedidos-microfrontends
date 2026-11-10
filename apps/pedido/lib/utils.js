import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...entradas) {
  return twMerge(clsx(entradas));
}

export function formatarPreco(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}
