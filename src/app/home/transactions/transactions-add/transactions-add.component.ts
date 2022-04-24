import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NewTransactionDto } from 'src/app/shared/dto/new-transaction-dto.model';

@Component({
  selector: 'app-transactions-add',
  templateUrl: './transactions-add.component.html'
})
export class TransactionsAddComponent implements OnInit {
  newTransactionsForm: FormGroup;

  constructor(private ngxCsvParser: NgxCsvParser) { }

  ngOnInit(): void {
    this.newTransactionsForm = new FormGroup({
      transactions: new FormControl(null, [Validators.required, Validators.minLength(10)])
    });
  }

  onSubmit(formDirective: FormGroupDirective): void {
    const processed = this.processText(this.newTransactionsForm.value.transactions);
    if (processed) {
      formDirective.resetForm();
    }
  }

  private processText(text: string): boolean {
    const newTransactions: NewTransactionDto[] = this.parseTransactions(text);
    console.log(newTransactions);
    return true;
  }

  private parseTransactions(text: string): NewTransactionDto[] {
    const rawTransactions: any[][] = this.ngxCsvParser.csvStringToArray(text, ",");
    const newTransactions: NewTransactionDto[] = [];
    for (const record of rawTransactions) {
      const amount = record[8] === 'CR' ? record[6] : record[5];
      newTransactions.push({
        timestamp: record[1],
        amount: amount,
        description: record[3]
      });
    }
    return newTransactions;
  }

}
