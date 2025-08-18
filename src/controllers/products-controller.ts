// Define as funcionalidades que o controller irá ter

import { NextFunction, Request, Response } from 'express'

class ProductController {
    async index(request: Request, response: Response, next: NextFunction){
        try {

            return response.json({ message: "Ok" })
        } catch (error) {
            next(error)
        }
    } 
}

export { ProductController }