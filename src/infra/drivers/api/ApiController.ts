import { ClienteController } from "src/domain/cliente/controllers/ClienteController";
import { ClienteMongoRepository } from "src/infra/database/mongodb/cliente/repositories/clientesMongo.repository";

export class ApiController {
    private static instance: ApiController;
    clienteController: ClienteController;

    constructor() {
        const clienteRepo = new ClienteMongoRepository();
        this.clienteController = new ClienteController(clienteRepo);
    }

    public static get Instance() {
        return this.instance || (this.instance = new this());
    }
}