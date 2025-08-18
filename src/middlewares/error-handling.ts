// Responsável por tratar erros na aplicação e retornar respostas apropriadas aos clientes
// Utiliza a classe AppError para erros personalizados

import { Request, Response, NextFunction } from "express"

import { AppError } from "@/utils/AppError"

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

    return response.status(500).json({ message: error.message })
}