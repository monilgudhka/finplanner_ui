import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Investment } from 'src/app/shared/model/investment.model';
import { InvestmentsService } from 'src/app/shared/service/investments.service';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent implements OnInit, OnDestroy {
  columnsToDisplay: string[] = ['title', 'goalTerm', 'assetClass', 'assetType', 'liquidity', 'member', 'investedAmount', 'currentAmount', 'rateOfReturn', 'absoluteReturns', 'absoluteReturnsPercentage', 'edit', 'lastUpdated'];
  investmentList: Array<Investment>;
  failure: boolean = false;

  private investmentsSubscription: Subscription;
  private errorSubscription: Subscription;

  constructor(
    private investmentsService: InvestmentsService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.errorSubscription = this.investmentsService.subscribeError(error => this.onFailure(error));
    this.investmentsSubscription = this.investmentsService.subscribeInvestments(investments => {
      this.investmentList = investments;
    });
    this.investmentList = this.investmentsService.getInvestments();
  }

  ngOnDestroy(): void {
    this.investmentsSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }

  private onFailure(error: HttpErrorResponse) {
    this.snackBar.open(error.error, 'Dismiss', {
      duration: 5000
    });
    this.failure = true;
  }

  onEdit(investment: Investment) {
    this.router.navigate([investment.getId(), 'edit'], { relativeTo: this.route });
  }

}
