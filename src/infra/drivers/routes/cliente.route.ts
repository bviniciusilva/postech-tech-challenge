import * as express from "express"
import { response } from "../utils"
import { ApiController } from "../api/ApiController"
import { BuscarUmDTO } from "src/shared/dtos/buscarUm.dto"
import { CriarClienteDTO } from "../dtos/cliente/criarCliente.dto"
const router = express.Router()

const apiController = ApiController.Instance

router.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    return response(apiController.clienteController.listar(), res, next)
})

router.get("/:id?", BuscarUmDTO.validate, (req: express.Request, res: express.Response, next: express.NextFunction) => {
    return response(apiController.clienteController.buscarUm(req.params.id), res, next)
})

router.post(
    "/",
    CriarClienteDTO.validate,
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const body = req.body
        return response(
            apiController.clienteController.criar({
                cpf: body.cpf,
                email: body.email,
                nome: body.nome,
            }),
            res,
            next
        )
    }
)

export default router
