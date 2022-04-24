import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewTransactionDto } from 'src/app/shared/dto/new-transaction-dto.model';
import { TransactionsAddService } from 'src/app/shared/service/transactions-add.service';

@Component({
  selector: 'app-transactions-add-details',
  templateUrl: './transactions-add-details.component.html',
  styleUrls: ['./transactions-add-details.component.css']
})
export class TransactionsAddDetailsComponent implements OnInit {
  transaction: NewTransactionDto;
  transactionType: string;

  constructor(
    private transactionAddService: TransactionsAddService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.init();
  }

  private init(): void {
    if (!this.transactionAddService.anyPending()) {
      this.router.navigate(['home', 'transactions']);
    } else {
      this.transaction = this.transactionAddService.peekPending();
      this.transactionType = this.transaction.isDebit ? 'EXPENSE' : 'ACTIVE_INCOME';
    }
  }

}
