import * as Joi from "joi"
import { DTO } from "@shared/ports/dto"
import { formasPagamento, statusPagamento } from "src/domain/pagamento/entities/pagamento"

const pedidoSchema = Joi.object({
  _id: Joi.any().required(),
}).required()

export class PagamentoDTO {
  static schema = Joi.object({
    pedido: pedidoSchema,
    valor: Joi.number().min(0).required(),
    valorPago: Joi.number().min(0).optional(),
    formaPagamento: Joi.string()
      .optional()
      .valid(...formasPagamento),
    status: Joi.string()
      .required()
      .valid(...statusPagamento),
  })

  static validate(req: any, res: any, next: any): boolean {
    const dto = new DTO(PagamentoDTO.schema)
    return dto.validate(req, res, next)
  }
}
