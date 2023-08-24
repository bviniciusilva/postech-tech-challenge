import { DefaultClass } from "src/shared/types/defaultClass";

export type StatusPagamento = "pendente" | "pago" | "cancelado";
export type FormasPagamento = "dinheiro" | "cartao" | "pix" | "mercadoPago";

export interface PagamentoProps {
    _id?: any;
    pedidoId: any;
    valor: number;
    valorPago?: number;
    status: StatusPagamento;
    formaPagamento?: FormasPagamento;
}

export class Pagamento extends DefaultClass implements PagamentoProps {
    _id?: any;
    pedidoId: any;
    valor: number;
    valorPago?: number;
    status: StatusPagamento;
    formaPagamento?: FormasPagamento;

    constructor(props: PagamentoProps) {
        super()
        Object.assign(this, props)
    }

}