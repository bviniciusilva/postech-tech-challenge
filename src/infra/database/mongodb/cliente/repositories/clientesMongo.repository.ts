import {
  BuscarUmProps,
  DeletarProps,
  IsUniqueProps,
  Repository,
} from "@shared/ports/repository";
import { RegistroExistenteException } from "@shared/exceptions/registroExistente.exception";
import { Cliente } from "@domain/cliente/entities/cliente";
import { RegistroInexistenteException } from "@shared/exceptions/registroInexistente.exception";
import { ClienteModel } from "@infra/database/mongodb/cliente/models/cliente.mongo";
import mongoose from "mongoose";

export class ClienteMongoRepository implements Repository<Cliente> {
  constructor() {}

  async listar(): Promise<Cliente[]> {
    return ClienteModel.find();
    //   return ClienteMemoriaRepository.clientes.filter(i => !i.deletedAt);
  }

  async deletar({ id }: DeletarProps): Promise<boolean> {
    const item = await this.buscarUm({ query: { id } });
    if (!item) throw new RegistroInexistenteException({ campo: "id" });
    item.deletedAt = new Date();
    return true;
  }

  async inserir(item: Cliente): Promise<Cliente> {
    const isEmailUnique =
      item.email &&
      (await this.isUnique({
        prop: "email",
        value: item.email,
      }));
    if (isEmailUnique === false)
      throw new RegistroExistenteException({
        mensagem: `Já existe um registro com email ${item.email}`,
      });
    const isCpfUnique =
      item.cpf &&
      (await this.isUnique({
        prop: "cpf",
        value: item.cpf,
      }));
    if (isCpfUnique === false)
      throw new RegistroExistenteException({
        mensagem: `Já existe um registro com cpf ${item.cpf}`,
      });
    const isNomeUnique =
      item.nome &&
      (await this.isUnique({
        prop: "nome",
        value: item.nome,
      }));
    if (isNomeUnique === false)
      throw new RegistroExistenteException({
        mensagem: `Já existe um registro com nome ${item.nome}`,
      });

    const query = item._id && {
      query: {
        _id: new mongoose.Types.ObjectId(item._id),
      },
    };
    const cliente = await this.buscarUm({ query });
    if (item._id && cliente) throw new RegistroExistenteException({});
    item._id = new mongoose.Types.ObjectId();
    const _item = await ClienteModel.create(item);
    // @ts-ignore
    return _item;
  }

  async editar(item: Cliente): Promise<Cliente> {
    // const itemIndex = ClienteMemoriaRepository.clientes.findIndex(
    //   (_item) => _item.id == item.id
    // );
    // if (itemIndex < 0) throw new RegistroInexistenteException({});
    // let cliente = ClienteMemoriaRepository.clientes[itemIndex];
    // Object.entries(item).forEach(([key, value]) => {
    //   cliente[key] = value;
    // });
    // return ClienteMemoriaRepository.clientes[itemIndex];
    return new Cliente({});
  }

  async buscarUm(props: BuscarUmProps): Promise<Cliente | null> {
    return ClienteModel.findOne(props.query);
  }

  async isUnique(props: IsUniqueProps): Promise<boolean> {
    let query: BuscarUmProps = {
      query: {
        [props.prop]: props.value,
      },
    };
    const item = await this.buscarUm(query);
    return item === null;
  }
}
