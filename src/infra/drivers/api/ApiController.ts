import { ClienteController } from "@domain/cliente/controllers/ClienteController"
import { ItemController } from "@domain/item/controllers/ItemController"
import { ClienteMongoRepository } from "@infra/database/mongodb/cliente/repositories/clientesMongo.repository"
import { ItemMongoRepository } from "@infra/database/mongodb/item/repositories/itensMongo.repository"
import { PedidoController } from "@domain/pedido/controllers/PedidoController"
import { PedidoMongoRepository } from "@infra/database/mongodb/pedido/repositories/pedidosMongo.repository"
import config from "@shared/config";
import { ClienteMemoriaRepository } from "src/infra/database/memory/cliente/repositories/clientesMemoria.repository"
import { ItemMemoriaRepository } from "src/infra/database/memory/item/repositories/itemMemoria.repository"
import { PedidoMemoriaRepository } from "src/infra/database/memory/pedido/repositories/pedidosMemoria.repository"
import { PagamentoMemoriaRepository } from "src/infra/database/memory/pagamento/repositories/pagamentosMemoria.repository"
import { PagamentosMongoRepository } from "src/infra/database/mongodb/pagamento/repositories/pagamentosMongo.repository"
import { PagamentoController } from "src/domain/pagamento/controllers/PagamentoController"

export class ApiController {
  private static instance: ApiController
  clienteController: ClienteController
  itemController: ItemController
  pedidoController: PedidoController
  pagamentoController: PagamentoController

  constructor() {
    let clienteRepo = new ClienteMemoriaRepository();
    let itemRepo = new ItemMemoriaRepository();
    let pedidoRepo = new PedidoMemoriaRepository()
    let pagamentosRepo = new PagamentoMemoriaRepository();
    if(config.NODE_ENV == 'production' || config.NODE_ENV == 'debug') {
      clienteRepo = new ClienteMongoRepository()
      // @ts-ignore
      itemRepo = new ItemMongoRepository()
      pedidoRepo = new PedidoMongoRepository(clienteRepo, itemRepo)
      pagamentosRepo = new PagamentosMongoRepository(pedidoRepo);
    }
    this.clienteController = new ClienteController(clienteRepo)
    this.itemController = new ItemController(itemRepo)
    this.pedidoController = new PedidoController(pedidoRepo)
    this.pagamentoController = new PagamentoController(pagamentosRepo)
  }

  public static get Instance() {
    return this.instance || (this.instance = new this())
  }
}
