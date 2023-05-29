import {
  BuscarUmProps,
  IsUniqueProps,
  Repository,
} from "../../../shared/ports/repository";
import { RegistroExistenteException } from "../../../shared/exceptions/registroExistente.exception";
import { Cliente } from "../entities/cliente";
import { RegistroInexistenteException } from "../../../shared/exceptions/registroInexistente.exception";

export class ClienteMemoriaRepository implements Repository<Cliente> {
  private static clientes: Cliente[] = [];

  async listar(): Promise<Cliente[]> {
    return ClienteMemoriaRepository.clientes;
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
    const cliente = await this.buscarUm({
      query: {
        id: item.id,
      },
    });
    if (item.id && cliente) throw new RegistroExistenteException({});
    ClienteMemoriaRepository.clientes.push(item);
    return item;
  }

  async editar(item: Cliente): Promise<Cliente> {
    const itemIndex = ClienteMemoriaRepository.clientes.findIndex((_item) => _item.id == item.id);
    if (itemIndex < 0) throw new RegistroInexistenteException({});
    let cliente = ClienteMemoriaRepository.clientes[itemIndex];
    Object.entries(item).forEach(([key, value]) => {
      cliente[key] = value;
    })
    return ClienteMemoriaRepository.clientes[itemIndex];
  }

  async buscarUm(props: BuscarUmProps): Promise<Cliente | null> {
    return (
      ClienteMemoriaRepository.clientes.find((_item) => {
        let hasValue = true;
        Object.entries(props.query).forEach(([key, value]) => {
          // @ts-ignore
          if (_item[key] !== undefined && _item[key] != value) hasValue = false;
        });
        return hasValue;
      }) ?? null
    );
  }

  async isUnique(props: IsUniqueProps): Promise<boolean> {
    for (let index = 0; index < ClienteMemoriaRepository.clientes.length; index++) {
      const item = ClienteMemoriaRepository.clientes[index];
      if (
        // @ts-ignore
        item[props.prop] !== undefined &&
        // @ts-ignore
        item[props.prop] == props.value &&
        item.id != props.ignoreId
      )
        return false;
    }
    return true;
  }
}
