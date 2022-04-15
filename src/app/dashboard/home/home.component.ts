import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Growth } from 'src/app/shared/model/growth.model';
import { Investment } from 'src/app/shared/model/investment.model';
import { Member } from 'src/app/shared/model/member.model';
import { FamilyService } from 'src/app/shared/service/family.service';
import { InvestmentsService } from 'src/app/shared/service/investments.service';
import { MembersService } from 'src/app/shared/service/members.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  growth: Growth;
  investments: Array<Investment>;
  members: Array<Member>;

  private familySubscription: Subscription;
  private membersSubscription: Subscription;
  private investmentsSubscription: Subscription;

  constructor(
    private familyService: FamilyService,
    private membersService: MembersService,
    private investmentsService: InvestmentsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.familySubscription = this.familyService.subscribeFamily(family => this.growth = family.getGrowth());
    this.membersSubscription = this.membersService.subscribeMembers(members => this.members = members);
    this.investmentsSubscription = this.investmentsService.subscribeInvestments(investments => this.investments = investments);

    const family = this.familyService.getFamily();
    if (family) {
      this.growth = family.getGrowth();
      this.members = this.membersService.getMembers();
      this.investments = this.investmentsService.getInvestments();
    }
  }

  ngOnDestroy(): void {
    this.familySubscription.unsubscribe();
    this.membersSubscription.unsubscribe();
    this.investmentsSubscription.unsubscribe();
  }

  onCheckDetails(label: string) {
    console.log(label, 'clicked');
    this.router.navigate(['investments'], { relativeTo: this.route });
  }

  getInvestmentValue(investment: Investment): number {
    return investment.getGrowth().getCurrentAmount();
  }

  getMemberValue(member: Member): number {
    return member.getGrowth().getCurrentAmount();
  }

  categoryByAssetClass(investment: Investment): string {
    return investment.getAssetClass();
  }

  categoryByMemberName(member: Member): string {
    return member.getName();
  }

  categoryByLiquidity(investment: Investment): string {
    return investment.getLiquidity();
  }

  categoryByGoalTerm(investment: Investment): string {
    return investment.getGoalTerm();
  }
}
