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
    const raw: any[][] = this.ngxCsvParser.csvStringToArray(text.trim(), ",");
    const newTransactions: NewTransactionDto[] = [];
    for (const record of raw) {
      const isDebit = record[8] === 'DR';
      newTransactions.push({
        timestamp: this.formatDate(record[1]),
        amount: this.formatAmount(isDebit ? record[5] : record[6]),
        isDebit: isDebit,
        description: record[3].trim()
      });
    }
    return newTransactions;
  }

  private formatDate(timestamp: string): Date {
    // '04/04/2020 04:59 PM'
    const data: string[] = timestamp.split(/[\/ :]/g);
    const date: Date = new Date();
    date.setUTCFullYear(parseInt(data[2]), parseInt(data[1]) - 1, parseInt(data[0]));
    date.setUTCHours(parseInt(data[3]) + (data[5] === 'PM' ? 12 : 0), parseInt(data[4]), 0, 0);
    return date;
  }

  private formatAmount(amount: string): number {
    return parseInt(amount.replace(/,/g, ''));
  }

}
