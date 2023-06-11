import {Schema, model} from "mongoose";
import { Cliente } from "@domain/cliente/entities/cliente";

const ClienteSchema = new Schema<Cliente>(
  {
    id: { type: Schema.Types.ObjectId },
    nome: { type: String, required: false },
    email: { type: String, required: false },
    cpf: { type: String, required: false },
  },
  { timestamps: true }
);

export const ClienteModel = model<Cliente>("Cliente", ClienteSchema);
