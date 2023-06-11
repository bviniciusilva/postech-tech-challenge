import { Repository } from "@shared/ports/repository"
import { Item, ItemProps } from "@domain/item/entities/item"

export class ItemController {
  constructor(private readonly repository: Repository<Item>) {}

  async listar() {
    return this.repository.listar()
  }

  async buscarUm(_id: string) {
    return this.repository.buscarUm({
      query: {
        _id,
      },
    })
  }

  async criar(body: ItemProps) {
    const item = new Item(body)
    return this.repository.criar({ item })
  }

  async editar(_id: string, body: ItemProps) {
    const item = new Item(body)
    return this.repository.editar({ _id, item })
  }

  async deletar(_id: string) {
    return this.repository.deletar({ _id })
  }
}
