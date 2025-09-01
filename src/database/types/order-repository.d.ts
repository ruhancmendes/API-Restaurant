//definir a tipagem do repositório de pedidos

type OrderRepository = {
    id: number
    table_session_id: number
    product_id: number
    quantity: number
    price: number
    created_at: number
    updated_at: number
}