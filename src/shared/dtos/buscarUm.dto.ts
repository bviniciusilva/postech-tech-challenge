import * as Joi from "joi";
import { DTO } from "../ports/dto";

export class BuscarUmDTO {
  static schema: any = Joi.object({
    _id: Joi.string().required(),
  });

  static validate(req: any, res: any, next: any): boolean {
    const dto = new DTO(BuscarUmDTO.schema);
    return dto.validate(req, res, next);
  }
}
