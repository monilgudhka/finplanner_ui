import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NewTransactionDto } from 'src/app/shared/dto/new-transaction-dto.model';
import { TransactionsAddService } from 'src/app/shared/service/transactions-add.service';

@Component({
  selector: 'app-transactions-add',
  templateUrl: './transactions-add.component.html'
})
export class TransactionsAddComponent implements OnInit {
  newTransactionsForm: FormGroup;

  constructor(
    private ngxCsvParser: NgxCsvParser,
    private transactionAddService: TransactionsAddService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.newTransactionsForm = new FormGroup({
      transactions: new FormControl(null, [Validators.required, Validators.minLength(10)])
    });
  }

  onSubmit(): void {
    const newTransactions: NewTransactionDto[] = this.parse(this.newTransactionsForm.value.transactions);
    this.transactionAddService.pushPending(newTransactions);
    if (this.transactionAddService.anyPending()) {
      this.router.navigate(['add', 'details'], { relativeTo: this.route });
    }
  }

  private parse(text: string): NewTransactionDto[] {
    const raw: any[][] = this.ngxCsvParser.csvStringToArray(text, ",");
    const newTransactions: NewTransactionDto[] = [];
    for (const record of raw) {
      const isDebit = record[8] === 'DR';
      newTransactions.push({
        timestamp: record[1],
        amount: isDebit ? record[5] : record[6],
        isDebit: isDebit,
        description: record[3]
      });
    }
    return newTransactions;
  }

}
