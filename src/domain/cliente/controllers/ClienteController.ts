import { Repository } from "@shared/ports/repository"
import { Cliente, ClienteProps } from "@domain/cliente/entities/cliente"
import { CadastrarClienteUseCase } from "@domain/cliente/usecases/cadastrarCliente.usecase"

export class ClienteController {
  private readonly cadastrarUseCase: CadastrarClienteUseCase;
  constructor(private readonly repository: Repository<Cliente>) {
    this.cadastrarUseCase = new CadastrarClienteUseCase(this.repository);
  }

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
    return this.cadastrarUseCase.execute(body);
  }

  async editar(_id: string, body: ClienteProps) {
    const cliente = new Cliente(body)
    return this.repository.editar({ _id, item: cliente })
  }

  async deletar(_id: string) {
    return this.repository.deletar({ _id })
  }
}
