import { Repository } from "@shared/ports/repository";
import { Cliente, ClienteProps } from "@domain/cliente/entities/cliente";

export class ClienteController {
  constructor(private readonly repository: Repository<Cliente>) {}

  async listar() {
    return this.repository.listar();
  }

  async buscarUm(_id: string) {
    return this.repository.buscarUm({
      query: {
        _id,
      },
    });
  }

  async criar(body: ClienteProps) {
    const cliente = new Cliente(body);
    return this.repository.inserir(cliente);
  }
}
