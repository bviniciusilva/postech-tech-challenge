import * as Joi from "joi";

import { DTO } from "@shared/ports/dto";

export class CriarClienteDTO {
  static schema = Joi.object({
    nome: Joi.string().optional(),
    email: Joi.string().email().optional(),
    cpf: Joi.string().optional(),
  }).or('nome', 'email','cpf')

  static validate(req: any, res: any, next: any): boolean {
    const dto = new DTO(CriarClienteDTO.schema);
    return dto.validate(req, res, next);
  }
}
