import { Repository } from "@shared/ports/repository"
import { Cliente, ClienteProps } from "@domain/cliente/entities/cliente"

export class ClienteController {
  constructor(private readonly repository: Repository<Cliente>) {}

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

  async criar(body: ClienteProps) {
    const cliente = new Cliente(body)
    return this.repository.criar({ item: cliente })
  }

  async editar(_id: string, body: ClienteProps) {
    const cliente = new Cliente(body)
    return this.repository.editar({ _id, item: cliente })
  }

  async deletar(_id: string) {
    return this.repository.deletar({ _id })
  }
}
