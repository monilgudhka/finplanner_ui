import { Growth } from "../model/growth.model";

export interface NewTransactionDto {
    timestamp: Date,
    amount: number,
    description: string,
    fromAccount?: Growth,
    toAccount?: Growth,
    transactionType?: string
}