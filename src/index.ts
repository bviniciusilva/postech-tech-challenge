import { ClienteProps } from "@domain/cliente/entities/cliente";
import { ClienteMemoriaRepository } from "@infra/database/memory/cliente/repositories/clientesMemoria.repository";
import { ClienteSeeder } from "@infra/database/memory/cliente/seeders/cliente.seeder";
import { ItemProps } from "@domain/item/entities/item";
import { ItemMemoriaRepository } from "@domain/item/repositories/itemMemoria.repository";
import { ItemSeeder } from "@domain/item/seeders/item.seeder";
import { JsonDataReader } from "@shared/adapters/jsonDataReader";
import MongoConnection from "src/infra/database/mongodb/adapters/MongoConnection";
import { ClienteMongoRepository } from "./infra/database/mongodb/cliente/repositories/clientesMongo.repository";

// CLIENTES ===============================================
const clientesRepository = new ClienteMemoriaRepository();
const clientesMongoRepository = new ClienteMongoRepository();
const clientesDataReader = new JsonDataReader<ClienteProps[]>();
const clientesSeeder = new ClienteSeeder(
  clientesMongoRepository,
  clientesDataReader
);

// ITENS ===============================================
const itensDataReader = new JsonDataReader<ItemProps[]>();
const itensRepository = new ItemMemoriaRepository();
const itensSeeder = new ItemSeeder(itensRepository, itensDataReader);

async function bootstrap() {
  try {
    const client = new MongoConnection({
      database: "projetos",
    });
    await client.connect();
    console.time('seeding');
    console.log("SEEDING STARTED...");
    await clientesSeeder.seed();
    // await itensSeeder.seed();
    // console.log(`SEEDING FINISHED...`);
    console.timeEnd('seeding');
  } catch (error) {
    console.log("🚀 ~ file: index.ts:25 ~ bootstrap ~ error:", error);
  }
}

bootstrap();
