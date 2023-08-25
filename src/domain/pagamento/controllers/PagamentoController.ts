import { BaseRepository, Repository } from "@shared/ports/repository"
import { Item, ItemProps } from "@domain/item/entities/item"
import { RealizarPagamentoUseCase } from "../usecases/realizarPagamento.usecase";
import { Pagamento, PagamentoProps } from "../entities/pagamento";
import { RealizarPagamentoDto } from "../dtos/pagamento.dto";

export class PagamentoController {
  private readonly realizarPagamentoUseCase: RealizarPagamentoUseCase;

  constructor(private readonly repository: BaseRepository<Pagamento>) {
    this.realizarPagamentoUseCase = new RealizarPagamentoUseCase(this.repository)
  }

  async listar(queryProps?: Object) {
    return this.repository.listar(queryProps)
  }

  async buscarUm(_id: string) {
    return this.repository.buscarUm({
      query: {
        _id,
      },
    })
  }

  async processar(body: RealizarPagamentoDto) {
    return this.realizarPagamentoUseCase.execute(body)
  }
}
