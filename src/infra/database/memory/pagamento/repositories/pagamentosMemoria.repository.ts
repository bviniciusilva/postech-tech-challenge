import { BaseRepository, BuscarUmProps, CriarProps } from "@shared/ports/repository"
import { DtoValidationException } from "src/shared/exceptions/dtoValidationError.exception"
import { Pagamento } from "src/domain/pagamento/entities/pagamento"

export class PagamentoMemoriaRepository implements BaseRepository<Pagamento> {
  private static instance: PagamentoMemoriaRepository
  private static pagamentos: Pagamento[] = []

  public static get Instance() {
    return this.instance || (this.instance = new this())
  }

  async listar(): Promise<Pagamento[]> {
    return PagamentoMemoriaRepository.pagamentos.filter((i) => !i.deletedAt)
  }

  async criar({ item }: CriarProps<Pagamento>): Promise<Pagamento> {
    if (!item._id) item.generateId()
    item.validar()
    PagamentoMemoriaRepository.pagamentos.push(item)
    return item
  }

  async buscarUm(props: BuscarUmProps): Promise<Pagamento | null> {
    return (
      PagamentoMemoriaRepository.pagamentos.find((_item) => {
        let hasValue = true
        Object.entries(props.query).forEach(([key, value]) => {
          // @ts-ignore
          if (_item[key] !== undefined && _item[key] != value) hasValue = false
        })
        return hasValue
      }) ?? null
    )
  }
}
