import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Growth } from 'src/app/shared/model/growth.model';
import { Investment } from 'src/app/shared/model/investment.model';
import { FamilyService } from 'src/app/shared/service/family.service';
import { InvestmentsService } from 'src/app/shared/service/investments.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  growth: Growth;
  investments: Array<Investment>;

  private familySubscription: Subscription;
  private investmentsSubscription: Subscription;

  constructor(
    private familyService: FamilyService,
    private investmentsService: InvestmentsService
  ) { }

  ngOnInit(): void {
    this.familySubscription = this.familyService.subscribeFamily(family => {
      this.growth = family.getGrowth();
    });
    this.investmentsSubscription = this.investmentsService.subscribeInvestments(investments => this.investments = investments);

    const family = this.familyService.getFamily();
    if (family) {
      this.growth = family.getGrowth();
      this.investments = this.investmentsService.getInvestments();
    }
  }

  ngOnDestroy(): void {
    this.familySubscription.unsubscribe();
    this.investmentsSubscription.unsubscribe();
  }

  getInvestmentValue(investment: Investment): number {
    return investment.getGrowth().getCurrentAmount();
  }

  categoryByAssetClass(investment: Investment): string {
    return investment.getAssetClass();
  }
}
