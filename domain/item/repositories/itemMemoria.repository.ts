import {
  BuscarUmProps,
  DeletarProps,
  IsUniqueProps,
  Repository,
} from "../../../shared/ports/repository";
import { RegistroExistenteException } from "../../../shared/exceptions/registroExistente.exception";
import { Item } from "../entities/item";
import { RegistroInexistenteException } from "../../../shared/exceptions/registroInexistente.exception";

export class ItemMemoriaRepository implements Repository<Item> {
  private static itens: Item[] = [];

  async listar(): Promise<Item[]> {
    return ItemMemoriaRepository.itens.filter(i => !i.deletedAt);
  }

  async deletar({ id }: DeletarProps): Promise<boolean> {
    const item = await this.buscarUm({ query: { id } });
    if (!item) throw new RegistroInexistenteException({ campo: "id" });
    item.deletedAt = new Date();
    return true;
  }

  async inserir(item: Item): Promise<Item> {
    if (
      item.id &&
      (await this.buscarUm({
        query: {
          id: item.id,
        },
      }))
    )
      throw new RegistroExistenteException({});
    item.createdAt = new Date();
    item.updatedAt = new Date();
    ItemMemoriaRepository.itens.push(item);
    return item;
  }

  async editar(item: Item): Promise<Item> {
    const itemIndex = ItemMemoriaRepository.itens.findIndex(
      (_item) => _item.id == item.id
    );
    if (itemIndex < 0) throw new RegistroInexistenteException({});
    let _item = ItemMemoriaRepository.itens[itemIndex];
    _item.updatedAt = new Date();
    Object.entries(item).forEach(([key, value]) => {
      _item[key] = value;
    });
    return ItemMemoriaRepository.itens[itemIndex];
  }

  async buscarUm(props: BuscarUmProps): Promise<Item | null> {
    return (
      ItemMemoriaRepository.itens.find((_item) => {
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
    for (let index = 0; index < ItemMemoriaRepository.itens.length; index++) {
      const item = ItemMemoriaRepository.itens[index];
      // @ts-ignore
      if (item[props.prop] == props.value && item.id != props.ignoreId)
        return false;
    }
    return true;
  }
}
