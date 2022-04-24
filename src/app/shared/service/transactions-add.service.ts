import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { NewTransactionDto } from "../dto/new-transaction-dto.model";
import { Transaction } from "../model/transaction.model";
import { TransactionsBackendService } from "./backend/transactions-backend.service";

@Injectable()
export class TransactionsAddService {
    private pendingQueue: NewTransactionDto[] = [];
    private completedList: NewTransactionDto[] = [];

    constructor(private transactionBackend: TransactionsBackendService) { }

    pushPending(newTransactions: NewTransactionDto[]): void {
        newTransactions.forEach((trans) => this.pendingQueue.push(trans));
    }

    anyPending(): boolean {
        return this.pendingQueue.length > 0;
    }

    peekPending(): NewTransactionDto {
        return this.pendingQueue[this.pendingQueue.length - 1];
    }

    markComplete(): void {
        const transaction = this.pendingQueue.pop();
        if (transaction !== undefined) {
            this.completedList.push(transaction)
        }
    }

    pushToBackend(): Observable<Transaction[]> {
        return this.transactionBackend
            .createTransactions(this.completedList)
            .pipe(tap(transactions => {
                this.completedList = [];
            }));
    }

}