import * as express from "express";
import { response } from "../utils";
import { ApiController } from "../api/ApiController";
const router = express.Router();

const endpoint = "/clientes";
const apiController = ApiController.Instance;

router.get(`${endpoint}/`, (req: express.Request, res: express.Response, next: express.NextFunction) => {
    return response(apiController.clienteController.listar(), res, next);
});

export default router