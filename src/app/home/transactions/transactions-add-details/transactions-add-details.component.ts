import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NewTransactionDto } from 'src/app/shared/dto/new-transaction-dto.model';
import { Investment } from 'src/app/shared/model/investment.model';
import { InvestmentsService } from 'src/app/shared/service/investments.service';
import { TransactionsAddService } from 'src/app/shared/service/transactions-add.service';

export interface TransactionTypeAccountConfig {
  enable: boolean,
  filter?: (investment: Investment) => boolean
}

export interface TransactionTypeConfig {
  name: string,
  title: string,
  displayOnDebit: boolean,
  displayOnCredit: boolean
  from: TransactionTypeAccountConfig,
  to: TransactionTypeAccountConfig,
}

@Component({
  selector: 'app-transactions-add-details',
  templateUrl: './transactions-add-details.component.html',
  styleUrls: ['./transactions-add-details.component.css']
})
export class TransactionsAddDetailsComponent implements OnInit, OnDestroy {
  transaction: NewTransactionDto;
  transactionTypeConfigList: TransactionTypeConfig[];
  selectedConfig: TransactionTypeConfig;
  investments: Investment[];

  private investmentSubscription: Subscription;

  constructor(
    private transactionAddService: TransactionsAddService,
    private router: Router,
    private investmentService: InvestmentsService
  ) { }

  ngOnInit(): void {
    this.investmentSubscription = this.investmentService.subscribeInvestments(investments => this.investments = investments);
    this.investments = this.investmentService.getInvestments();

    this.transactionTypeConfigList = [
      {
        name: 'ACTIVE_INCOME',
        title: 'Income',
        displayOnCredit: true,
        displayOnDebit: false,
        from: {
          enable: false
        },
        to: {
          enable: true,
          filter: this.isBankAccounts
        }
      },
      {
        name: 'PASSIVE_INCOME',
        title: 'Interest/Dividend/Rent',
        displayOnCredit: true,
        displayOnDebit: false,
        from: {
          enable: true,
          filter: this.isNonBankAccounts
        },
        to: {
          enable: true,
          filter: this.isBankAccounts
        }
      },
      {
        name: 'EXPENSE',
        title: 'Expense',
        displayOnCredit: false,
        displayOnDebit: true,
        from: {
          enable: false
        },
        to: {
          enable: true,
          filter: this.isBankAccounts
        }
      },
      {
        name: 'INVESTMENT',
        title: 'Investment',
        displayOnCredit: false,
        displayOnDebit: true,
        from: {
          enable: true
        },
        to: {
          enable: true,
          filter: this.isNonBankAccounts
        }
      },
      {
        name: 'TRANSFER',
        title: 'Transfer',
        displayOnCredit: true,
        displayOnDebit: true,
        from: {
          enable: true,
          filter: this.isBankAccounts
        },
        to: {
          enable: true,
          filter: this.isBankAccounts
        }
      },
      {
        name: 'CASHBACK',
        title: 'Cashback',
        displayOnCredit: true,
        displayOnDebit: false,
        from: {
          enable: false
        },
        to: {
          enable: true,
          filter: this.isBankAccounts
        }
      }
    ]

    this.init();
  }

  ngOnDestroy(): void {
    this.investmentSubscription.unsubscribe();
  }

  private init(): void {
    if (!this.transactionAddService.anyPending()) {
      this.router.navigate(['home', 'transactions']);
    } else {
      this.transaction = this.transactionAddService.peekPending();
      this.selectedConfig = this.filterTransactionTypeConfig()[0];
    }
  }

  private isBankAccounts(investment: Investment) {
    return investment.getAssetClass() === 'BANK';
  }

  private isNonBankAccounts(investment: Investment) {
    return investment.getAssetClass() !== 'BANK';
  }

  filterTransactionTypeConfig() {
    return this.transactionTypeConfigList
      .filter(t => this.transaction.isDebit ? t.displayOnDebit : t.displayOnCredit);
  }

  filterInvestments(filterFunc?: (inv: Investment) => boolean) {
    if (filterFunc !== undefined) {
      return this.investments.filter(filterFunc);
    }
    return this.investments;
  }

}
