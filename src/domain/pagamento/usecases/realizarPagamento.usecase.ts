import { BaseRepository, Repository } from "@shared/ports/repository";
import { UseCase } from "@shared/ports/usecase";
import { Item, ItemProps } from "@domain/item/entities/item";
import { Pagamento, PagamentoProps } from "../entities/pagamento";

type InputProps = PagamentoProps;
type OutputProps = Item;

export class RealizarPagamentoUseCase
  implements UseCase<InputProps, OutputProps>
{
  constructor(private readonly repository: BaseRepository<Pagamento>) {}

  async execute(props: InputProps): Promise<OutputProps> {
    const pagamento = new Pagamento(props);
    pagamento.validar();

    return {} as any;
    // return await this.repository.criar({item});
  }
}
