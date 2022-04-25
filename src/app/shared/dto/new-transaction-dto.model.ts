export interface NewTransactionDto {
    timestamp: Date,
    amount: number,
    description: string,
    isDebit: boolean,
    from_account?: number,
    to_account?: number,
    transaction_type?: string
}