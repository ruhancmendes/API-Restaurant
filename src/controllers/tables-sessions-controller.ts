// Controller para criar a tabela de sessões das mesas

import { Request, Response, NextFunction } from 'express'
import { AppError } from '@/utils/AppError'
import { knex } from '@/database/knex'
import { z } from 'zod'

class TablesSessionsController {
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            // Lógica para criar a tabela de sessões das mesas

            const bodySchema = z.object({
                // Defina os campos necessários para a criação da tabela
                table_id: z.number(),
            })

            const { table_id } = bodySchema.parse(request.body)

            const session = await knex<TablesSessionsRepository>("tables_sessions")
            .where({ table_id})
            .orderBy("opened_at", "desc")
            .first()

            if(session && !session.closed_at) {
                throw new AppError("There is already an open session for this table.")
            }
            
            await knex<TablesSessionsRepository>("tables_sessions").insert({
                table_id,
                opened_at: knex.fn.now(),
            })

            return response.status(201).json()
        } catch (error) {
            next(error)
        }
    }

    async index(request: Request, response: Response, next: NextFunction) {
        try {
            // Lógica para listar todas as sessões das mesas
            const sessions = await knex<TablesSessionsRepository>("tables_sessions")
            .orderBy("closed_at")

            return response.status(200).json(sessions)

        } catch (error) {
            next(error)
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            // Lógica para atualizar uma sessão específica
            const id = z.string()
            .transform((value) => Number(value))
            .refine((value) => !isNaN(value), { message: "ID must be a valid number" })
            .parse(request.params.id)

            const session = await knex<TablesSessionsRepository>("tables_sessions")
            .where({ id })
            .first()

            if(!session) {
                throw new AppError("Session not found", 404)
            }

            if(session.closed_at) {
                throw new AppError("Session is already closed")
            }

            await knex<TablesSessionsRepository>("tables_sessions")
            .update({ closed_at: knex.fn.now() })
            .where({ id })

            return response.json()
        } catch (error) {
            next(error)
        }
    }
}

export { TablesSessionsController }