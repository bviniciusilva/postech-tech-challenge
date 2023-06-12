import { Repository } from "@shared/ports/repository"
import { Cliente, ClienteProps } from "@domain/cliente/entities/cliente"
import { CadastrarClienteUseCase } from "@domain/cliente/usecases/cadastrarCliente.usecase"
import { isCPFValido, sanitizar } from "src/shared/utils"
import { DtoValidationException } from "src/shared/exceptions/dtoValidationError.exception"
import { CPFInvalidoException } from "src/shared/exceptions/cpfInvalido.exception"
import { EditarClienteUseCase } from "../usecases/editarCliente.usecase"

export class ClienteController {
  private readonly cadastrarUseCase: CadastrarClienteUseCase
  private readonly editarUseCase: EditarClienteUseCase

  constructor(private readonly repository: Repository<Cliente>) {
    this.cadastrarUseCase = new CadastrarClienteUseCase(this.repository)
  }

  async listar() {
    return this.repository.listar()
  }

  async buscarUm(_id: string) {
    return this.repository.buscarUm({
      query: {
        _id,
      },
    })
  }

  async buscarCPF(cpf: string) {
    if (!isCPFValido(cpf)) throw new CPFInvalidoException()
    return this.repository.buscarUm({
      query: {
        cpf: sanitizar(cpf),
      },
    })
  }

  async criar(body: ClienteProps) {
    return this.cadastrarUseCase.execute(body)
  }

  async editar(_id: string, body: ClienteProps) {
    return this.editarUseCase.execute({ _id, props: body })
  }

  async deletar(_id: string) {
    return this.repository.deletar({ _id })
  }
}
