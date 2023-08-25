import * as express from "express"
import { response } from "@infra/drivers/utils"
import { ApiController } from "@infra/drivers/api/ApiController"
import { ItemDTO } from "../dtos/item/item.dto"
import { PagamentoDTO } from "../dtos/pagamento/pagamento.dto"
const router = express.Router()

const apiController = ApiController.Instance

router.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  return response(apiController.pagamentoController.listar(req.query), res, next)
})

router.get("/:id", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  return response(apiController.pagamentoController.buscarUm(req.params.id), res, next)
})

router.post("/", PagamentoDTO.validate, (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const body = req.body
  return response(apiController.pagamentoController.processar(body), res, next)
})

export default router
