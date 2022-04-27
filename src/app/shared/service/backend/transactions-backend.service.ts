import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { NewTransactionDto } from "../../dto/new-transaction-dto.model";
import { TransactionDto } from "../../dto/transaction-dto.model";
import { Transaction } from "../../model/transaction.model";
import { ConverterService } from "../converter.service";

@Injectable()
export class TransactionsBackendService {
    constructor(private http: HttpClient) { }

    createTransactions(newInvestmentDtos: NewTransactionDto[]): Observable<Transaction[]> {
        return this.http.post<TransactionDto[]>(
            'http://localhost:8080/api/transaction',
            newInvestmentDtos
        ).pipe(map(transactionDtos => {
            return transactionDtos.map(ConverterService.toTransaction);
        }));
    }
}