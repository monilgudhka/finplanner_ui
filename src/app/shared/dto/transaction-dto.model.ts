export interface TransactionDto {
    id: number,
    timestamp: Date,
    amount: number,
    description: string,
    from_account?: number,
    to_account?: number,
    transaction_type: string
}