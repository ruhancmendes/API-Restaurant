// Conexão com o banco de dados usando Knex.js

import { knex as knexConfig } from 'knex'

import config from "../../knexfile"

export const knex = knexConfig(config)