// Define as funcionalidades que o controller irá ter

import { NextFunction, Request, Response } from 'express'
import { knex } from "@/database/knex"
import { z } from "zod"

class ProductController {
    async index(request: Request, response: Response, next: NextFunction){
        try {
            const { name } = request.query

            const products = await knex<ProductRepository>("products")
            .select()
            .whereLike("name", `%${name ?? ""}%`)
            .orderBy("name")

            return response.json(products)
        } catch (error) {
            next(error)
        }
    } 

    async create(request: Request, response: Response, next: NextFunction){
        try {
            const bodySchema = z.object({
                name: z.string().trim().min(6),
                price: z.number().gt(0, { message: "Number must be greater than 0" })
            })

            const { name, price } = bodySchema.parse(request.body)

            await knex<ProductRepository>("products").insert({ name, price})

            return response.status(201).json()
        } catch (error) {
            next(error)
        }
    }

    async update(request: Request, response: Response, next: NextFunction){
        try {
            const id = z
            .string()
            .transform((value) => Number(value))
            .refine((value) => !isNaN(value), { message: "id must be a number" })
            .parse(request.params.id)

            const bodySchema = z.object({
                name: z.string().trim().min(6),
                price: z.number().gt(0),
            })

            const { name, price } = bodySchema.parse(request.body)

            await knex<ProductRepository>("products")
            .update({ name, price, updated_at: knex.fn.now() })
            .where({ id })

            return response.json()
        } catch (error) {
            next(error)
        }
    }
}

export { ProductController }