// rotas para criar a tabela de sessões das mesas no banco de dados

import { Router } from 'express'
import { TablesSessionsController } from '@/controllers/tables-sessions-controller'

const tablesSessionsRoutes = Router()
const tablesSessionsController = new TablesSessionsController()

tablesSessionsRoutes.post("/", tablesSessionsController.create)

export { tablesSessionsRoutes }