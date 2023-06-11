import { ClienteController } from "@domain/cliente/controllers/ClienteController"
import { ItemController } from "@domain/item/controllers/ItemController"
import { ClienteMongoRepository } from "@infra/database/mongodb/cliente/repositories/clientesMongo.repository"
import { ItemMongoRepository } from "@infra/database/mongodb/item/repositories/itensMongo.repository"
import { PedidoController } from "@domain/pedido/controllers/PedidoController"
import { PedidoMongoRepository } from "@infra/database/mongodb/pedido/repositories/pedidosMongo.repository"

export class ApiController {
  private static instance: ApiController
  clienteController: ClienteController
  itemController: ItemController
  pedidoController: PedidoController

  constructor() {
    const clienteRepo = new ClienteMongoRepository()
    const itemRepo = new ItemMongoRepository()
    const pedidoRepo = new PedidoMongoRepository(clienteRepo, itemRepo)
    this.clienteController = new ClienteController(clienteRepo)
    this.itemController = new ItemController(itemRepo)
    this.pedidoController = new PedidoController(pedidoRepo)
  }

  public static get Instance() {
    return this.instance || (this.instance = new this())
  }
}
