export interface NewTransactionDto {
    timestamp: string,
    amount: number,
    description: string,
    isDebit: boolean,
    from_account?: number,
    to_account?: number,
    transaction_type?: string
}