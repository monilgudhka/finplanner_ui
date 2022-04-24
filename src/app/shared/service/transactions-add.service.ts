import { NewTransactionDto } from "../dto/new-transaction-dto.model";

export class TransactionsAddService {
    pendingQueue: NewTransactionDto[] = [];
    completedList: NewTransactionDto[] = [];

    pushPending(newTransactions: NewTransactionDto[]): void {
        newTransactions.forEach((trans) => this.pendingQueue.push(trans));
    }

    anyPending(): boolean {
        return this.pendingQueue.length > 0;
    }

    peekPending(): NewTransactionDto {
        return this.pendingQueue[0];
    }

    markComplete(): void {
        const transaction = this.pendingQueue.pop();
        if (transaction !== undefined) {
            this.completedList.push(transaction)
        }
    }

    getAllCompleted(): NewTransactionDto[] {
        return this.completedList.splice(0);
    }

    resetCompleted(): void {
        this.completedList = [];
    }

}