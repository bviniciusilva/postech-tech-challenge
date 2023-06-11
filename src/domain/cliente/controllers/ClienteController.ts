import { Repository } from "@shared/ports/repository"
import { Cliente, ClienteProps } from "@domain/cliente/entities/cliente"
import { RegistroInexistenteException } from "src/shared/exceptions/registroInexistente.exception"

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
    console.log("🚀 ~ file: ClienteController.ts:31 ~ ClienteController ~ deletar ~ _id:", _id)
    return this.repository.deletar({ _id })
  }
}
