import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Investment } from 'src/app/shared/model/investment.model';
import { InvestmentsService } from 'src/app/shared/service/investments.service';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;

  columnsToDisplay: string[] = ['title', 'goalTerm', 'assetClass', 'assetType', 'liquidity', 'member', 'investedAmount', 'currentAmount', 'rateOfReturn', 'absoluteReturns', 'absoluteReturnsPercentage', 'edit', 'lastUpdated'];
  datasource: MatTableDataSource<Investment>;
  failure: boolean = false;
  filterText: string;

  private investmentsSubscription: Subscription;
  private errorSubscription: Subscription;
  private investmentList: Array<Investment>;

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

    this.datasource = new MatTableDataSource(this.investmentList);
    this.datasource.filterPredicate = this.filterPredicate;

    this.route.queryParams.subscribe(
      (param: Params) => {
        this.filterText = param['filter'];
        this.applyFilter();
      });
  }

  private filterPredicate(record: Investment, filter: string): boolean {
    return record.getTitle().includes(filter)
      || record.getAssetType().toLowerCase() === filter
      || record.getAssetClass().toLowerCase() === filter
      || record.getLiquidity().toLowerCase() === filter
      || record.getGoalTerm().toLowerCase() === filter
      || record.getMember().getName().toLowerCase() === filter;
  }

  ngAfterViewInit(): void {
    this.datasource.sort = this.sort;
    this.datasource.sortingDataAccessor = (item: Investment, property: string) => {
      switch (property) {
        case 'title': return item.getTitle();
        case 'goalTerm': return item.getGoalTerm();
        case 'assetClass': return item.getAssetClass();
        case 'assetType': return item.getAssetType();
        case 'liquidity': return item.getLiquidity();
        case 'member': return item.getMember().getName();
        case 'investedAmount': return item.getGrowth().getInvestmentAmount();
        case 'currentAmount': return item.getGrowth().getCurrentAmount();
        case 'rateOfReturn': return item.getGrowth().getRateOfReturn();
        case 'absoluteReturns': return item.getGrowth().getAbsoluteReturns();
        case 'absoluteReturnsPercentage': return item.getGrowth().getAbsoluteReturnsPercentage();
        default: return item.getId();
      }
    };
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

  applyFilter() {
    if (this.filterText !== undefined) {
      this.datasource.filter = this.filterText.trim().toLowerCase();
    }
  }

}
