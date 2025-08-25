// Responsável por definir as rotas relacionadas a produtos

import { Router } from 'express'
import { ProductController } from "@/controllers/products-controller"

const productsRoutes = Router()
const productsController = new ProductController()



productsRoutes.get("/", productsController.index)
productsRoutes.post("/", productsController.create)

export { productsRoutes }