// Responsável por tratar erros na aplicação e retornar respostas apropriadas aos clientes
// Utiliza a classe AppError para erros personalizados

import { Request, Response, NextFunction } from "express"

import { AppError } from "@/utils/AppError"

import { ZodError } from "zod"

export function errorHandling(error: any, 
request: Request, 
response: Response, 
_: NextFunction
){
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            message: error.message
        })
    }

    if(error instanceof ZodError) {
        return response
        .status(400)
        .json({
            message: "Validation error",
            issues: error.format()
        })
    }

    return response.status(500).json({ message: error.message })
}