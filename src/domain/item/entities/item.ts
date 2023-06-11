import { NotNullException } from "@shared/exceptions/notNull.exception";
import { IsNotNaturalNumberException } from "@shared/exceptions/isNotNaturalNumber.exception";
import { v4 as uuid } from "uuid";
import { DefaultClass } from "@shared/types/defaultClass";

export type TiposItem = "bebida" | "lanche" | "opcional" | "sobremesa";
export type MedidaItem = "porcao" | "litro" | "unidade";

export interface ItemProps {
  id?: string;
  tipo: TiposItem;
  medida: MedidaItem;
  nome: string;
  descricao: string;
  aceitaOpcional: boolean;
  preco: number;
}

export class Item extends DefaultClass {
  private props: ItemProps;

  constructor(props: ItemProps) {
    super();
    if (!props.id) {
      props.id = uuid();
    }
    this.props = props;
    // Object.assign(this.props, props);
  }

  get id() {
    return this.props.id ?? "";
  }
  get tipo() {
    return this.props.tipo;
  }
  get medida() {
    return this.props.medida;
  }
  get nome() {
    return this.props.nome;
  }
  get descricao() {
    return this.props.descricao;
  }
  get aceitaOpcional() {
    return this.props.aceitaOpcional;
  }
  get preco() {
    return this.props.preco;
  }
  set id(_id: string) {
    if (!_id) throw new NotNullException({ campo: "id" });
    this.props.id = _id;
  }
  set tipo(tipo: TiposItem) {
    if (!tipo) throw new NotNullException({ campo: "tipo" });
    this.props.tipo = tipo;
  }
  set medida(medida: MedidaItem) {
    if (!medida) throw new NotNullException({ campo: "medida" });
    this.props.medida = medida;
  }
  set nome(nome: string) {
    if (!nome) throw new NotNullException({ campo: "nome" });
    this.props.nome = nome;
  }
  set descricao(descricao: string) {
    if (!descricao) throw new NotNullException({ campo: "descricao" });
    this.props.descricao = descricao;
  }
  set aceitaOpcional(aceitaOpcional: boolean) {
    this.props.aceitaOpcional = aceitaOpcional;
  }
  set preco(preco: number) {
    if (!preco) throw new NotNullException({ campo: "descricao" });
    if (preco < 0) throw new IsNotNaturalNumberException();
    this.props.preco = preco;
  }
}
