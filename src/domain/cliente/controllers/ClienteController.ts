import { Repository } from "@shared/ports/repository";
import { Cliente } from "@domain/cliente/entities/cliente";

export class ClienteController {
    constructor(
        private readonly repository: Repository<Cliente>
    ) {}

    async listar() {
        console.log("🚀 ~ file: ClienteController.ts:10 ~ ClienteController ~ listar ~ listar:")
        return this.repository.listar();
    }
}