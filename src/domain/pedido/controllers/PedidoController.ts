import { Repository } from "@shared/ports/repository"
import { CadastrarPedidoUseCase } from "@domain/pedido/usecases/cadastrarPedido.usecase"
import { Pedido, PedidoProps } from "@domain/pedido/entities/pedido"

export class PedidoController {
  private readonly cadastrarUseCase: CadastrarPedidoUseCase
  constructor(private readonly repository: Repository<Pedido>) {
    this.cadastrarUseCase = new CadastrarPedidoUseCase(this.repository)
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

  async criar(body: PedidoProps) {
    return this.cadastrarUseCase.execute(body);
  }
}
