import { ClienteController } from "@domain/cliente/controllers/ClienteController";
import { ItemController } from "@domain/item/controllers/ItemController";
import { ClienteMongoRepository } from "@infra/database/mongodb/cliente/repositories/clientesMongo.repository";
import { ItemMongoRepository } from "@infra/database/mongodb/item/repositories/itensMongo.repository";

export class ApiController {
    private static instance: ApiController;
    clienteController: ClienteController;
    itemController: ItemController;

    constructor() {
        const clienteRepo = new ClienteMongoRepository();
        const itemRepo = new ItemMongoRepository();
        this.clienteController = new ClienteController(clienteRepo);
        this.itemController = new ItemController(itemRepo);
    }

    public static get Instance() {
        return this.instance || (this.instance = new this());
    }
}