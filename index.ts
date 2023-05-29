import { ClienteProps } from "./domain/cliente/entities/cliente";
import { ClienteMemoriaRepository } from "./domain/cliente/repositories/clientesMemoria.repository";
import { ClienteSeeder } from "./domain/cliente/seeders/cliente.seeder";
import { CadastrarClienteUseCase } from "./domain/cliente/usecases/cadastrarCliente.usecase";
import { Item, ItemProps } from "./domain/pedido/entities/item";
import { ItemMemoriaRepository } from "./domain/pedido/repositories/itemMemoria.repository";
import { ItemSeeder } from "./domain/pedido/seeders/item.seeder";
import { CadastrarItemUseCase } from "./domain/pedido/usecases/cadastrarItem.usecase";
import { JsonDataReader } from "./shared/adapters/jsonDataReader";

// CLIENTES ===============================================
const clientesRepository = new ClienteMemoriaRepository();
const clientesDataReader = new JsonDataReader<ClienteProps[]>();
const clientesSeeder = new ClienteSeeder(clientesRepository,clientesDataReader);

// ITENS ===============================================
const itensDataReader = new JsonDataReader<ItemProps[]>();
const itensRepository = new ItemMemoriaRepository();
const itensSeeder = new ItemSeeder(itensRepository, itensDataReader);

async function bootstrap() {
  try {
    console.time('seeding');
    console.log("SEEDING STARTED...");
    await clientesSeeder.seed();
    await itensSeeder.seed();
    console.log(`SEEDING FINISHED...`);
    console.timeEnd('seeding');
  } catch (error) {
    console.log("🚀 ~ file: index.ts:25 ~ bootstrap ~ error:", error);
  }
}

bootstrap();
