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
  months: Map<string, number>;

  constructor(
    private ngxCsvParser: NgxCsvParser,
    private transactionAddService: TransactionsAddService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.months = new Map();
    this.months.set('jan', 0);
    this.months.set('feb', 1);
    this.months.set('mar', 2);
    this.months.set('apr', 3);
    this.months.set('may', 4);
    this.months.set('jun', 5);
    this.months.set('jul', 6);
    this.months.set('aug', 7);
    this.months.set('sept', 8);
    this.months.set('oct', 9);
    this.months.set('nov', 10);
    this.months.set('dec', 11);

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
      if (record.length === 9) {
        newTransactions.push(this.parseWithFormat1(record));
      } else {
        newTransactions.push(this.parseWithFormat2(record));
      }
    }
    return newTransactions;
  }

  private parseWithFormat1(record: any[]): NewTransactionDto {
    // Sl. No.,Transaction Date,Value Date,Description,Chq / Ref No.,Amount,Dr / Cr,Balance,Dr / Cr
    return {
      timestamp: this.formatDateFormat1(record[1]),
      amount: this.formatAmount(record[5]),
      isDebit: record[6] === 'DR',
      description: record[3].trim()
    }
  }

  private formatDateFormat1(timestamp: string): Date {
    // 05-04-2022
    const data: string[] = timestamp.split(/-/g);
    const date: Date = new Date();
    date.setUTCFullYear(parseInt(data[2]), parseInt(data[1]) - 1, parseInt(data[0]));
    date.setUTCHours(0, 0, 0, 0);
    return date;
  }

  private parseWithFormat2(record: any[]): NewTransactionDto {
    // Transaction Date,	Value Date,	Cheque No/Reference No,	Description,	Withdrawals,	Deposits,	Running Balance
    const isDebit = record[5] === '';
    return {
      timestamp: this.formatDateFormat2(record[0]),
      amount: this.formatAmount(isDebit ? record[4] : record[5]),
      isDebit: isDebit,
      description: record[3].trim()
    }
  }

  private formatDateFormat2(timestamp: string): Date {
    // '01 Jul 2022'
    const data: string[] = timestamp.split(/\s/g);
    const date: Date = new Date();
    date.setUTCFullYear(parseInt(data[2]), this.months.get(data[1].toLowerCase()), parseInt(data[0]));
    date.setUTCHours(0, 0, 0, 0);
    return date;
  }

  private formatAmount(amount: string): number {
    return parseFloat(amount.replace(/,/g, ''));
  }

}
