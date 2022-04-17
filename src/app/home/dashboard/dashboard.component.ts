import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Growth } from 'src/app/shared/model/growth.model';
import { Investment } from 'src/app/shared/model/investment.model';
import { Member } from 'src/app/shared/model/member.model';
import { FamilyService } from 'src/app/shared/service/family.service';
import { GrowthHistoryService } from 'src/app/shared/service/growth-history.service';
import { InvestmentsService } from 'src/app/shared/service/investments.service';
import { MembersService } from 'src/app/shared/service/members.service';
import { InsightDetails } from './insights/insight-details.interface';
import { HistoricStatsConfig } from './summary/historic-stats-summary/historic-stats-summary.component';
import { TrendDetails } from './trend/trend-details.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {

  growthHistoryStats: HistoricStatsConfig[];
  memberInsights: InsightDetails<Member>[];
  investmentInsights: InsightDetails<Investment>[];
  growthHistoryTrends: TrendDetails<Growth>[];

  familyGrowth: Growth;
  investments: Array<Investment>;
  members: Array<Member>;
  history: Array<Growth>;

  private familySubscription: Subscription;
  private membersSubscription: Subscription;
  private investmentsSubscription: Subscription;
  private historySubscription: Subscription;

  constructor(
    private familyService: FamilyService,
    private membersService: MembersService,
    private investmentsService: InvestmentsService,
    private growthHistoryService: GrowthHistoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.familySubscription = this.familyService.subscribeFamily(family => this.familyGrowth = family.getGrowth());
    this.membersSubscription = this.membersService.subscribeMembers(members => this.members = members);
    this.investmentsSubscription = this.investmentsService.subscribeInvestments(investments => this.investments = investments);
    this.historySubscription = this.growthHistoryService.subscribeGrowthHistory(history => {
      this.history = history;
      this.initGrowthHistoryStats();
      this.initGrowthHistoryTrends();
    });

    const family = this.familyService.getFamily();
    if (family) {
      this.familyGrowth = family.getGrowth();
      this.members = this.membersService.getMembers();
      this.investments = this.investmentsService.getInvestments();
      this.history = this.growthHistoryService.getGrowthHistory();
    }


    this.initGrowthHistoryStats();
    this.initMembersInsights();
    this.initInvestmentInsights();
    this.initGrowthHistoryTrends();
  }

  private initGrowthHistoryStats(): void {
    if (this.history === undefined) {
      return;
    }

    this.growthHistoryStats = [
      {
        data: this.history,
        title: 'Monthly',
        subtitle: 'MoM',
        groupingFunc: (date: Date) => date.getFullYear() + '-' + date.getMonth()
      },
      {
        data: this.history,
        title: 'Yearly',
        subtitle: 'YoY',
        groupingFunc: (date: Date) => '' + date.getFullYear()
      }
    ]
  }

  private initMembersInsights(): void {
    this.memberInsights = [
      {
        title: 'Members',
        elements: this.members,
        categoryFunc: (m) => m.getName(),
        valueFunc: this.getMemberValue
      }
    ];
  }

  private initInvestmentInsights(): void {
    this.investmentInsights = [
      {
        title: 'Asset Class',
        elements: this.investments,
        categoryFunc: (inv) => inv.getAssetClass(),
        valueFunc: this.getInvestmentValue
      },
      {
        title: 'Goal Terms',
        elements: this.investments,
        categoryFunc: (inv) => inv.getGoalTerm(),
        valueFunc: this.getInvestmentValue
      },
      {
        title: 'Liquidity',
        elements: this.investments,
        categoryFunc: (inv) => inv.getLiquidity(),
        valueFunc: this.getInvestmentValue
      },
      {
        title: 'Equity Investments',
        elements: this.investments,
        filterFunc: (inv) => inv.getAssetClass() === 'EQUITY',
        categoryFunc: (inv) => inv.getAssetType(),
        valueFunc: this.getInvestmentValue
      },
      {
        title: 'Gold Investments',
        elements: this.investments,
        filterFunc: (inv) => inv.getAssetClass() === 'GOLD',
        categoryFunc: (inv) => inv.getAssetType(),
        valueFunc: this.getInvestmentValue
      },
      {
        title: 'Infrastructure Investments',
        elements: this.investments,
        filterFunc: (inv) => inv.getAssetClass() === 'INFRASTRUCTURE',
        categoryFunc: (inv) => inv.getAssetType(),
        valueFunc: this.getInvestmentValue
      },
      {
        title: 'Debt Investments',
        elements: this.investments,
        filterFunc: (inv) => inv.getAssetClass() === 'DEBT',
        categoryFunc: (inv) => inv.getAssetType(),
        valueFunc: this.getInvestmentValue
      }
    ];
  }

  private initGrowthHistoryTrends(): void {
    if (this.history === undefined) {
      return;
    }

    this.growthHistoryTrends = [
      {
        dataset: this.history,
        labelFunc: (growth) => {
          const date = growth.getLastUpdatedDate();
          return date.getFullYear() + '-' + date.getMonth();
        },
        seriesDetails: [
          {
            series: 'Net Worth',
            valueFunc: (growth) => growth.getCurrentAmount()
          },
          {
            series: 'Returns',
            valueFunc: (growth) => growth.getAbsoluteReturns()
          }
        ]
      }
    ];
  }

  ngOnDestroy(): void {
    this.familySubscription.unsubscribe();
    this.membersSubscription.unsubscribe();
    this.investmentsSubscription.unsubscribe();
    this.historySubscription.unsubscribe();
  }

  onCheckDetails(label: string) {
    this.router.navigate(
      ['investments'],
      {
        relativeTo: this.route,
        queryParams: {
          filter: label
        }
      }
    );
  }

  private getInvestmentValue(investment: Investment): number {
    return investment.getGrowth().getCurrentAmount();
  }

  private getMemberValue(member: Member): number {
    return member.getGrowth().getCurrentAmount();
  }

}
