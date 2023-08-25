import { Pedido, PedidoProps } from "src/domain/pedido/entities/pedido";
import { DefaultClass } from "src/shared/types/defaultClass";

export const statusPagamento = ["pendente","pago","cancelado"]
export type StatusPagamento = typeof statusPagamento[number];
export const formasPagamento = ["dinheiro","cartao","pix","mercadoPago"]
export type FormasPagamento = typeof formasPagamento[number];

export interface PagamentoProps {
    _id?: any;
    pedido: PedidoProps;
    valor: number;
    valorPago?: number;
    status: StatusPagamento;
    formaPagamento?: FormasPagamento;
}

export class Pagamento extends DefaultClass implements PagamentoProps {
    _id?: any;
    pedido: Pedido;
    valor: number;
    valorPago?: number;
    status: StatusPagamento;
    formaPagamento?: FormasPagamento;

    constructor(props: PagamentoProps) {
        super()
        Object.assign(this, props)
    }

    validar() {
        this.validarCampos();
        if(!this.status) this.status = "pendente"
        if(this.valorPago > this.valor) throw new Error("Valor pago não pode ser maior que o valor do pagamento")
        return;
    }
    
    private validarCampos() {
        if(!this.pedido) throw new Error("Pedido não informado")
        if(!this.valor) throw new Error("Valor não informado")
        if(!this.formaPagamento) throw new Error("Forma de pagamento não informada")
    }
}