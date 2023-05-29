import { DataReader } from "../../../shared/ports/dataReader";
import { Repository } from "../../../shared/ports/repository";
import { Seeder } from "../../../shared/ports/seeder";
import { Item, ItemProps } from "../entities/item";
import { CadastrarItemUseCase } from "../usecases/cadastrarItem.usecase";

export class ItemSeeder implements Seeder {
  private cadastrarItemUseCase: CadastrarItemUseCase;
  constructor(
    private readonly repository: Repository<Item>,
    private readonly itensDataReader: DataReader<ItemProps[]>
  ) {
    this.cadastrarItemUseCase = new CadastrarItemUseCase(repository);
  }

  async seed(): Promise<number> {
    try {
      const data = await this.itensDataReader.read({
        path: "./domain/pedido/data/itens.json",
      });
      await Promise.all(
        data.map(async (item) => {
          await this.cadastrarItemUseCase.execute(item);
        })
      );

      console.log(
        `ITENS SEEDER SEEDED ${(await this.repository.listar()).length} records`
      );
      return data.length;
    } catch (error) {}
  }
}
